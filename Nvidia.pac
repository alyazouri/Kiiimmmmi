/**
 *  Jordan‑Boost‑v2.pac
 *  -------------------
 *  نسخة محدثة مخصَّصة للاعبين من الأردن.
 *  • نطاق IP أردني موسّع (IPv4 + IPv6)
 *  • قائمة “لوبّي” أضخم لتشمل كل dute‑services
 *  • DIRECT / SOCKS5 قابل‑التبديل
 *  • Fallback Proxy عالمي للخرائط/الـ “match”
 *
 *  طريقة الاستعمال:
 *   1. احفظ النص هذا في ملف (مثلاً  Jordan‑Boost‑v2.pac)
 *   2. في إعدادات الواي‑فاي → Advanced → Proxy → Manual
 *      ضع رابط الملف (مثلاً file:///sdcard/Android/data/…/Jordan‑Boost‑v2.pac)
 *   3. عدِّل رقم المنفذ إذا أردت تشغيل SOCKS5 على Port 20003
 *
 *  ملاحظة: المتصفحات التي لا تدعم PAC (مثلاً بعض الألعاب)؛
 *          يمكنك تجربة إضافة توسٍّ (مثل “PAC‑Manager”) على Android.
 */

///////////////
//  إعدادات //
///////////////

// ---------- 1‑ سطر الـ SOCKS5 الأساسي ----------
var SOCKS5_HOST = "91.106.109.50";   // خوادم الـ SOCKS5 المتوفرة في الأردن
var SOCKS5_PORT = "20003";          // المنفذ الخاص باللّوبّي
var SOCKS5_LOB  = "SOCKS5 " + SOCKS5_HOST + ":" + SOCKS5_PORT;

// ---------- 2‑ منافذ المباريات ----------
var MATCH_PORT = "20001";            // من port الخاص بالمباريات
var MATCH_PROXY = "SOCKS5 " + SOCKS5_HOST + ":" + MATCH_PORT;

// ---------- 3‑ بروتوكول DIRECT ----------
var DIRECT = "DIRECT";

///////////////
//  نطاقات الأردن //
///////////////// --------- IPv4 (أكثر من 30 شبكة) ----------
var JO4 = [
    // Zain Jordan
    "37.208.0.0/13", "78.100.0.0/15", "212.34.64.0/18", "212.34.96.0/19",
    // Umniah
    "46.32.0.0/16", "78.42.0.0/16", "94.24.0.0/16",
    // ITGate
    "42.136.0.0/16", "185.84.100.0/22",
    // Neotel
    "45.9.220.0/22", "185.112.24.0/22", "185.120.36.0/22",
    // Albab
    "185.229.28.0/22",
    // Orange Jordan
    "212.34.0.0/19", "37.35.0.0/16", "78.40.0.0/16", "78.158.0.0/15",
    "82.212.0.0/14", "86.111.0.0/16", "91.141.0.0/16", "176.29.0.0/16",
    // إضافات أخرى
    "185.18.108.0/22", "185.18.109.0/24", "185.18.110.0/24", "185.18.111.0/24",
    "188.228.0.0/17", "185.58.204.0/22", "185.100.52.0/22",
    "195.191.100.0/22", "41.184.0.0/16", "41.234.0.0/16",
    "95.141.240.0/21", "185.51.24.0/22", "185.103.92.0/22"
];

// --------- IPv6 ----------
var JO6 = [
    "2a00:8c00::/32", "2a02:f040::/32", "2a01:100::/32", "2a05:580::/32",
    "2a02:f60::/32", "2a0d:4800::/32", "2001:67c:1d8::/48",
    "2a02:c10::/32"
];

// --------- IP‑Servers المباريات ----------
var MS4 = [
    "49.51.0.0/16", "43.154.0.0/15", "43.134.0.0/16", "101.32.0.0/14",
    "101.36.0.0/14", "101.33.0.0/16", "119.28.0.0/16", "119.29.0.0/16",
    "150.109.0.0/16", "129.226.0.0/16", "129.204.0.0/16", "203.205.0.0/16",
    "118.89.0.0/16", "118.126.0.0/16", "81.68.0.0/16", "13.248.0.0/14",
    "15.177.0.0/16", "99.82.0.0/16", "15.230.0.0/16", "52.95.0.0/16"
];

var MS6 = [
    "2402:4e00::/32", "2406:da00::/32", "2406:d200::/32", "2600:1f00::/24"
];

//// --------- نطاقات DIRECT (بدون بروكسي) ----------
var D_DIR = [
    // صوت & ريت신ج
    "*.voice.pubgmobile.com", "*.voip.pubgmobile.com", "*.rtc.pubgmobile.com",
    "*.audio.pubgmobile.com", "*.media.pubgmobile.com",
    // حماية    "*.security.pubgmobile.com", "*.anticheat.pubgmobile.com",
    "*.integrity.pubgmobile.com", "*.scan.pubgmobile.com",
    // إشعارات ومستندات
    "*.fcm.googleapis.com", "*.push.pubgmobile.com", "*.notification.pubgmobile.com",
    // توثيق أساسي
    "pubgmobile.com", "www.pubgmobile.com"
];

// --------- Domains الفئة “مجموعة اللوبّي” ----------
var D_LOBBY = [
    // ج.Domain الأساسية للعبة
    "*.pubgmobile.com", "pubgmobile.com",
    // تسجيل الدخول / أوتافيك
    "*.auth.pubgmobile.com", "*.login.pubgmobile.com", "*.account.pubgmobile.com",
    // بروفايل / رتبة / موسم
    "*.profile.pubgmobile.com", "*.rank.pubgmobile.com", "*.season.pubgmobile.com",
    // متجر / دفع
    "*.shop.pubgmobile.com", "*.store.pubgmobile.com", "*.pay.pubgmobile.com",
    "*.uc.pubgmobile.com", "*.coin.pubgmobile.com", "*.diamond.pubgmobile.com",
    // رويال‑باس / Battle‑Pass
    "*.royalepass.pubgmobile.com", "*.prime.pubgmobile.com",
    // فعاليات وهدايا
    "*.event.pubgmobile.com", "*.gift.pubgmobile.com", "*.crate.pubgmobile.com",
    // ديكورات ومنزل
    "*.home.pubgmobile.com", "*.house.pubgmobile.com", "*.decoration.pubgmobile.com",
    // تجميع فريق/غ Ninja
    "*.recruit.pubgmobile.com", "*.matchmaking.pubgmobile.com",
    "*.team.pubgmobile.com", "*.squad.pubgmobile.com", "*.invite.pubgmobile.com",
    "*.friend.pubgmobile.com", "*.friends.pubgmobile.com", "*.clan.pubgmobile.com",
    "*.guild.pubgmobile.com", "*.crew.pubgmobile.com", "*.group.pubgmobile.com",
    // دردشة وإشعارات
    "*.chat.pubgmobile.com", "*.share.pubgmobile.com",
    // وسائط stream / replay
    "*.stream.pubgmobile.com", "*.replay.pubgmobile.com",
    // others (أمان، اختبار)
    "*.safe.pubgmobile.com", "*.protect.pubgmobile.com"
];

// --------- Domains الخاصة بالمباريات (Port 20005‑20001) ----------
var D_MATCH = [
    // خوادم المباراة العامة
    "*.match.pubgmobile.com", "*.game.pubgmobile.com",
    "*.gameserver.pubgmobile.com", "*.gs.pubgmobile.com",
    "*.gslb.pubgmobile.com", "*.dispatch.pubgmobile.com",
    "*.entry.pubgmobile.com", "*.connect.pubgmobile.com",
    "*.gateway.pubgmobile.com", "*.relay.pubgmobile.com",
    "*.session.pubgmobile.com", "*.region.pubgmobile.com",
    "*.netcode.pubgmobile.com", "*.tcp.pubgmobile.com",
    // أنواع اللعبة
    "*.room.pubgmobile.com", "*.custom.pubgmobile.com",
    "*.arena.pubgmobile.com", "*.tdm.pubgmobile.com",
    "*.war.pubgmobile.com", "*.payload.pubgmobile.com",
    "*.evoground.pubgmobile.com", "*.zombie.pubgmobile.com",
    "*.metro.pubgmobile.com", "*.infection.pubgmobile.com",
    "*.erangel.pubgmobile.com", "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com", "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com", "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com",
    // spectate/watch
    "*.spectate.pubgmobile.com", "*.watch.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    // بطولات وإيسبورت    "*.tournament.pubgmobile.com", "*.esports.pubgmobile.com",
    "*.competitive.pubgmobile.com", "*.leaderboard.pubgmobile.com",
    // تحميل/بصاقة/باك أب...
    "*.download.pubgmobile.com", "*.patch.pubgmobile.com",
    "*.update.pubgmobile.com", "*.resource.pubgmobile.com",
    "*.asset.pubgmobile.com", "*.bundle.pubgmobile.com",
    "*.package.pubgmobile.com", "*.asset.pubgmobile.com",
    // Tencent Cloud و CDN
    "*.qcloud.com", "*.tencentcloud.com", "*.cos.myqcloud.com",
    "*.fastly.net", "*.akamai.net", "*.cloudfront.net"
];

// --------- Fallback Proxy (عالمية) ----------
var FALLBACK_SOCKS5 = "SOCKS5 1.1.1.1:1080";   // غير ضروري، يمكنك replacement بمخدمك الخاص

///////////////
//  مساعدات //
///////////////

function isIPv4(ip){return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);}
function isIPv6(ip){return /^[0-9a-f:]+$/i.test(ip);}

/* تحويل CIDR إلى بت‑ماسک (IPv4) */
function maskIPv4(ip, cidr){
    var parts = ip.split('.');
    var num = parseInt(parts[0])<<24 | parseInt(parts[1])<<16 |
              parseInt(parts[2])<<8 | parseInt(parts[3]);
    var mask = (~0 >>> (32 - parseInt(cidr))) >>> 0;
    return (num & mask) == (num & mask);
}

/* اختبار whether IP belongs to a CIDR (both v4 & v6) */
function ipInCidr(ip, cidr){
    if (isIPv6(ip) && cidr.indexOf(":")!=-1) {
        // IPv6 CIDR        var parts = cidr.split('/');
        var ipv6 = parts[0], masklen = parseInt(parts[1],10);
        return ipv6Match(ip, ipv6, masklen);
    } else {
        // IPv4 CIDR
        var p = cidr.split('/');
        return ipInCidr4(ip, p[0], p[1]);
    }
}

/* IPv4 mask test */
function ipInCidr4(ip, network, cidr){
    var mask = (~0 >>> (32 - parseInt(cidr))) >>> 0;
    var n = ipToInt(ip), net = ipToInt(network);
    return (n & mask) == (net & mask);
}

/* IPv6 mask test */
function ipv6Match(ip, base, masklen){
    var a = ip.split(':').map(function(s){return s.padStart(4,'0');});
    var b = base.split(':').map(function(s){return s.padStart(4,'0');});
    for(var i=0;i<masklen/16;i++){
        if (a[i]!=b[i]) return false;
    }
    return true;
}

/* تحويل IP → integer (IPv4) */
function ipToInt(ip){
    if (isIPv6(ip)) return null;
    var parts = ip.split('.').map(Number);
    return (parts[0]<<24)|(parts[1]<<16)|(parts[2]<<8)|parts[3];
}

/* تحويل integer → IP (IPv4) */
function intToIp(i){
    return ((i>>>24)&255)+'.'+((i>>>16)&255)+'.'+((i>>>8)&255)+'.'+(i&255);
}

/* هل العنوان انتمي إلى قائمة CIDR؟ */
function inList(ip, list){
    for(var i=0;i<list.length;i++){
        if (ipInCidr(ip, list[i])) return true;
    }
    return false;
}

/* هل العنوان اردني (IPv4 أو IPv6)؟ */
function isJordanian(ip){
    if (!isIPv4(ip) && !isIPv6(ip)) return false;
    return inList(ip, JO4.concat(JO6));
}

/* اختبار إذا كان хост يطابق نمطًا من القائمة (wildcard) */
function hostMatches(host, patterns){
    host = host.toLowerCase();
    for(var i=0;i<patterns.length;i++){
        var pat = patterns[i].toLowerCase();
        if (pat.charAt(0)==='*'){
            var suffix = pat.substring(1);
            if (host===suffix) return true;
            if (host.length>suffix.length+1 && host.endsWith('.'+suffix))
                return true;
        }else if (host===pat) return true;
    }
    return false;
}

/* Helper to test if a host matches any entry in an array (wildcard aware) */
function dM(host, arr){
    return hostMatches(host, arr);
}

/* décident le proxy à retourner */
function FindProxyForURL(url, host){
    host = host.toLowerCase();

    // 1️⃣ DIRECT (الصوت، الحماية، الإشعارات …)
    if (dM(host, D_DIR)) return DIRECT;

    // 2️⃣ لوبيّ (تجنيد + البحث) – نستخدم الـ SOCKS5jord
    if (dM(host, D_LOBBY) || isJordanian(host)) return SOCKS5_LOB;

    // 3️⃣ مباريات – لماذا تطبيق الـ SOCKS5 للمطابقينjord؟
    if (dM(host, D_MATCH) || ipInCidr(host, MS4.concat(MS6))) return MATCH_PROXY;

    // 4️⃣ إذا فشل Any‑Jordan → fallback إلى Proxy عالمي
    //    (يمكن تعديل هذا المنفـذ إلى أي سرفـر SOCKS5 محلي آخر)
    return FALLBACK_SOCKS5;
}
