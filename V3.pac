// JO_ULTRA_PAC.js – نسخة 3.0 – أردني 100 %
// ==========================================
var CFG = {
    NO_DIRECT_FOR_PUBG      : true,   // لا Direct أبداً لأي دومين يخص PUBG
    PROXY_EXIT_JORDAN_ONLY  : true,   // الخروج فقط من IP أردني
    HARD_LOCK_JORDAN_DEST   : false,  // لو true سيتم حجب أي سيرفر ليس أردني (غير مستحسن)
    ALLOW_CDN_DIRECT        : false,  // false = حتى التحديثات تمر عبر بروكسي أردني
    FAIL_CLOSED             : true,   // لو مافيش مسار أردني آمن => نحجب
    MAX_PROXY_FALLBACKS     : 4,
    DNS_CACHE_TTL           : 90000,  // 90 ثانية
    DNS_CACHE_MAX           : 120,
    STICKY_TTL              : 180000, // 3 دقائق
    LIGHT_MODE              : true,
    KILL_THRESHOLD          : 45      // Ping فوقه => Kill-Switch يشتغل
};

// 1.1 البركة الأردنية – دائماً محدثة (أبريل 2025)
var PROXY_POOL = {
    ORANGE_A: {ip:"149.200.253.140", port:20001, carrier:"ORANGE", rank:1, load:0},
    ORANGE_B: {ip:"46.185.130.44",   port:443,  carrier:"ORANGE", rank:2, load:0},
    ZAIN_A:   {ip:"79.173.248.71",   port:443,  carrier:"ZAIN",   rank:1, load:0},
    ZAIN_B:   {ip:"176.29.15.200",   port:443,  carrier:"ZAIN",   rank:2, load:0},
    UMNIAH_A: {ip:"82.212.88.100",   port:443,  carrier:"UMNIAH", rank:1, load:0},
    ST_A:     {ip:"94.230.12.50",    port:443,  carrier:"ST",     rank:1, load:0}
};

var BLOOD = { DIR:"DIRECT", BLK:"PROXY 0.0.0.0:1" }; // BLOCK = عدم اتصال

// 1.2 IP Ranges – الأردن فقط
var JO_NETS = [
    ["46.185.128.0","20"],["46.185.144.0","21"],["79.173.192.0","18"],
    ["79.173.240.0","21"],["82.212.0.0","16"],["82.212.64.0","19"],
    ["176.28.0.0","17"],["176.29.0.0","16"],["188.247.0.0","16"],
    ["94.230.0.0","16"],["91.106.0.0","16"],["37.220.0.0","16"]
];

// 1.3 كلمات مفتاحية PUBG
var PUBG_KEYS = ["pubgmobile","pubgm","tencent","lightspeed","levelinfinite",
                 "igamecj","myapp","qq","gcloud","tmgp","bsgame","garena_pubg",
                 "battlegrounds","pubgstudio","proximabeta"];

// 1.4 أوامر المودات
var MODES = {
    LOBBY:{sig:["lobby","queue","matchmake","waiting_room","room_list","party"],priority:10,target:10,strategy:"LOBBY_JO"},
    AUTH:{sig:["auth","login","session","token","passport","anticheat"],priority:9,target:15,strategy:"AUTH_JO"},
    RANKED:{sig:["ranked","conqueror","ace","master","leaderboard"],priority:10,target:12,strategy:"CRITICAL_JO"},
    TDM:{sig:["tdm","deathmatch","arena"],priority:9,target:15,strategy:"CRITICAL_JO"},
    SYNC:{sig:["sync","gsvr","relay","udp_relay"],priority:10,target:12,strategy:"CRITICAL_JO"},
    CLASSIC:{sig:["classic","erangel","miramar","sanhok","vikendi"],priority:8,target:18,strategy:"GAME_JO"},
    METRO:{sig:["metro","underground","dark_zone"],priority:8,target:18,strategy:"GAME_JO"},
    CDN_PATCH:{sig:["cdn","patch","update","asset","obb"],priority:1,target:999,strategy:"CDN_JO"},
    TRAINING:{sig:["training","practice","tutorial"],priority:1,target:999,strategy:"SAFE_JO"}
};
var MODE_ORDER = ["LOBBY","AUTH","RANKED","TDM","SYNC","CLASSIC","METRO","CDN_PATCH","TRAINING"];

// 1.5 Load-Balancer ذكي
var LOAD_BALANCER = {
    calls:{},
    getBest:function(){
        var best = null, min = 9999;
        for(var name in PROXY_POOL){
            var c = this.calls[name]||0;
            var score = PROXY_POOL[name].rank + (c > 30? 10:0);
            if(score < min){ min = score; best = name; }
        }
        if(best){ this.calls[best] = (this.calls[best]||0)+1; }
        return best;
    }
};

// 1.6 DNS Cache سريع
var DNS_CACHE = {}, DNS_QUEUE = [];
function fastDNS(host){
    var e = DNS_CACHE[host];
    if(e && (now() - e.t < CFG.DNS_CACHE_TTL)) return e;
    var t0 = now(), ip = dnsResolve(host), dt = now()-t0;
    var entry = {ip:ip, dt:dt, mode:detectMode(host), t:now()};
    if(DNS_QUEUE.length >= CFG.DNS_CACHE_MAX){ delete DNS_CACHE[DNS_QUEUE.shift()]; }
    DNS_CACHE[host] = entry; DNS_QUEUE.push(host);
    PING.record(dt, entry.mode);
    return entry;
}

// 1.7 Ping Engine
var PING = {
    hist:[], max:10, killThreshold:CFG.KILL_THRESHOLD,
    record:function(ms,mode){this.hist.push({ms:ms,mode:mode,t:now()});if(this.hist.length>this.max)this.hist.shift();},
    avg:function(){if(!this.hist.length)return 999; var s=0,c=0; for(var i=0;i<this.hist.length;i++){s+=this.hist[i].ms;c++;} return Math.round(s/c);},
    kill:function(){return this.avg() > this.killThreshold;}
};

// 1.8 Sticky Routing
var STICKY = {};
function stickyGet(k){var e=STICKY[k]; if(e && (now()-e.t < CFG.STICKY_TTL))return e.v; delete STICKY[k]; return null;}
function stickySet(k,v){STICKY[k]={v:v,t:now()};}

// 1.9 Jordan Guard
var DOMESTIC_GUARD = {
    isJordanIP:function(ip){ return inRanges(ip,JO_NETS); },
    safeChain:function(names){
        var out="",c=0;
        for(var i=0;i<names.length;i++){
            var p=PROXY_POOL[names[i]];
            if(!p)continue;
            if(CFG.PROXY_EXIT_JORDAN_ONLY && !this.isJordanIP(p.ip))continue;
            if(out!=="")out+="; ";
            out+="PROXY "+p.ip+":"+p.port; c++;
            if(c>=CFG.MAX_PROXY_FALLBACKS)break;
        }
        return out!==""? (out+"; "+(CFG.FAIL_CLOSED?BLOOD.BLK:BLOOD.DIR)) : (CFG.FAIL_CLOSED?BLOOD.BLK:BLOOD.DIR);
    }
};

// 1.10 خوارزمية التسكيل الذكي
function neuralScore(ip,host,port,dn,mode){
    var m=MODES[mode]||{}, s= (m.priority||5)*5;
    if(dn.dt<=10)s+=25; else if(dn.dt<=25)s+=20; else if(dn.dt<=50)s+=12; else s-=10;
    if(PING.avg()<= (m.target||18))s+=18; else s-=20;
    if(DOMESTIC_GUARD.isJordanIP(ip))s+=35;
    if(port===443)s+=5;
    if(PING.kill())s-=35;
    return Math.max(0,Math.min(100,s));
}

// 1.11 اختيار الإستراتيجية
function selectStrategy(mode,score,ip,port){
    var st=(MODES[mode]||{}).strategy||"GAME_JO";
    var best=LOAD_BALANCER.getBest();

    if(PING.kill()) return DOMESTIC_GUARD.safeChain([best,"ORANGE_A","ZAIN_A"]);

    if(st==="CDN_JO") return CFG.ALLOW_CDN_DIRECT? BLOOD.DIR : DOMESTIC_GUARD.safeChain(["ZAIN_A","ORANGE_B"]);
    if(st==="SAFE_JO") return CFG.NO_DIRECT_FOR_PUBG? DOMESTIC_GUARD.safeChain(["ORANGE_A","ZAIN_A"]) : BLOOD.DIR;

    if(st==="LOBBY_JO"){
        var s=stickyGet("LOBBY");
        if(s)return s;
        var chain=DOMESTIC_GUARD.safeChain(["ORANGE_A","ZAIN_A",best]);
        stickySet("LOBBY",chain);
        return chain;
    }

    if(st==="AUTH_JO") return DOMESTIC_GUARD.safeChain(["ORANGE_A","ZAIN_A"]);
    if(st==="CRITICAL_JO") return DOMESTIC_GUARD.safeChain(["ORANGE_A","ZAIN_A",best]);
    if(st==="GAME_JO") return DOMESTIC_GUARD.safeChain(["ORANGE
