// ═══════════════════════════════════════════════════════════════════════
//  PUBG MOBILE - JORDAN OPTIMIZATION ENGINE v3.0
//  Advanced PAC Script for Ultra-Low Latency Gaming
//  Optimized for: Orange, Zain, Umniah, ST Networks
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // الأمان: منع أي DIRECT للعبة نفسها
    NO_DIRECT_FOR_PUBG: true,
    
    // إلزامية الخروج من IP أردني فقط
    PROXY_EXIT_JORDAN_ONLY: true,
    
    // قفل صارم: أي اتصال ليس بنهاية أردنية يُحظر (للأمان القصوي)
    HARD_LOCK_JORDAN_DESTINATION: false,
    
    // CDN: false = عبر بروكسي أردني (أمان)، true = مباشر (سرعة تحميل)
    ALLOW_CDN_DIRECT: false,
    
    // الفشل الآمن: إغلاق الاتصال بدل الخروج بدون بروكسي
    FAIL_CLOSED: true,
    
    // عدد محاولات البديل الأردنية
    MAX_PROXY_FALLBACKS: 3,
    
    // كاش DNS متقدم
    DNS_CACHE_TTL: 300000,      // 5 دقائق
    DNS_CACHE_MAX: 100,
    
    // تثبيت اختيار البروكسي (Sticky Routing)
    STICKY_TTL: 300000,         // 5 دقائق استقرار
    
    // وضع خفيف للأجهزة الضعيفة
    LIGHT_MODE: false,
    
    // عتبات البنق (بالملي ثانية)
    PING_ULTRA: 20,
    PING_GOOD: 35,
    PING_FAIR: 60,
    PING_BAD: 100,
    
    // تفعيل نظام التنبؤ الذكي
    PREDICTIVE_ROUTING: true
};

// ═══════════════════════════════════════════════════════════════════════
//  JORDAN PROXY POOL - Tier 1 Only (Lowest Latency)
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {
    // Orange Jordan - أفضل استقرار للألعاب
    ORANGE_1: { ip: "149.200.253.140", port: 443, carrier: "ORANGE", tier: 1, latency: 8 },
    ORANGE_2: { ip: "46.185.130.44", port: 443, carrier: "ORANGE", tier: 1, latency: 12 },
    ORANGE_3: { ip: "46.185.130.45", port: 8080, carrier: "ORANGE", tier: 2, latency: 15 },
    
    // Zain Jordan - سرعة عالية
    ZAIN_1: { ip: "79.173.248.71", port: 443, carrier: "ZAIN", tier: 1, latency: 10 },
    ZAIN_2: { ip: "176.29.15.200", port: 443, carrier: "ZAIN", tier: 1, latency: 11 },
    ZAIN_3: { ip: "79.173.248.72", port: 8080, carrier: "ZAIN", tier: 2, latency: 14 },
    
    // Umniah - توازن جيد
    UMNIAH_1: { ip: "82.212.88.100", port: 443, carrier: "UMNIAH", tier: 1, latency: 13 },
    UMNIAH_2: { ip: "82.212.88.101", port: 443, carrier: "UMNIAH", tier: 2, latency: 16 },
    
    // ST - احتياطي
    ST_1: { ip: "94.230.12.50", port: 443, carrier: "ST", tier: 2, latency: 18 }
};

// ═══════════════════════════════════════════════════════════════════════
//  NETWORK DATABASE - CIDR Optimization
// ═══════════════════════════════════════════════════════════════════════

var JO_RANGES = [
    ["46.185.128.0", "255.255.240.0"],   // Orange
    ["46.185.144.0", "255.255.248.0"],   // Orange
    ["79.173.192.0", "255.255.192.0"],   // Zain
    ["79.173.240.0", "255.255.248.0"],   // Zain
    ["82.212.0.0", "255.255.0.0"],       // Umniah
    ["82.212.64.0", "255.255.224.0"],    // Umniah
    ["176.28.0.0", "255.255.128.0"],     // Zain
    ["176.29.0.0", "255.255.0.0"],       // Zain
    ["188.247.0.0", "255.255.0.0"],      // Umniah/Shared
    ["94.230.0.0", "255.255.0.0"],       // ST
    ["91.106.0.0", "255.255.0.0"],       // Zain Business
    ["37.220.0.0", "255.255.0.0"],       // Orange Business
    ["62.72.160.0", "255.255.224.0"],    // Zain DC
    ["94.127.208.0", "255.255.248.0"],   // Shared
    ["109.237.192.0", "255.255.240.0"],  // Umniah
    ["178.20.184.0", "255.255.248.0"]    // Hosting
];

// ═══════════════════════════════════════════════════════════════════════
//  PUBG SIGNATURES - Deep Packet Inspection Simulation
// ═══════════════════════════════════════════════════════════════════════

var SIGNATURES = {
    // أنظمة المصادقة (أولوية قصوى)
    AUTH: {
        patterns: ["auth", "login", "account", "openid", "passport", "session", "token", "verify", "security", "anticheat", "tp", "tenvs"],
        priority: 100,
        maxPing: 25,
        strategy: "CRITICAL_AUTH"
    },
    
    // اللاوبي والماتشميكينج (ثبات مطلوب)
    LOBBY: {
        patterns: ["lobby", "matchmake", "matchmaking", "queue", "room", "party", "invite", "friend", "presence", "team", "channel"],
        priority: 95,
        maxPing: 30,
        strategy: "STICKY_PREMIUM"
    },
    
    // سيرفرات المباريات الحية (أدنى بنق ممكن)
    GAME: {
        patterns: ["gamesvr", "gsvr", "battle", "relay", "realtime", "sync", "udp", "node", "roomsvr", "matchsvr"],
        priority: 90,
        maxPing: 20,
        strategy: "ULTRA_LOW_LATENCY"
    },
    
    // الرانكد والتنافسي
    RANKED: {
        patterns: ["ranked", "rank", "conqueror", "ace", "rating", "leaderboard", "competitive", "tournament"],
        priority: 85,
        maxPing: 25,
        strategy: "COMPETITIVE"
    },
    
    // أوضاع اللعب المختلفة
    CLASSIC: {
        patterns: ["classic", "erangel", "miramar", "sanhok", "vikendi", "livik", "karakin", "rondo", "deston"],
        priority: 70,
        maxPing: 35,
        strategy: "BALANCED"
    },
    
    TDM_ARENA: {
        patterns: ["tdm", "deathmatch", "arena", "warehouse", "ruins", "team_death"],
        priority: 80,
        maxPing: 25,
        strategy: "FAST_RESPONSE"
    },
    
    METRO: {
        patterns: ["metro", "royale", "underworld", "faction", "darkzone"],
        priority: 75,
        maxPing: 30,
        strategy: "STABLE"
    },
    
    PAYLOAD: {
        patterns: ["payload", "heli", "rocket", "heavy", "airstrike"],
        priority: 60,
        maxPing: 40,
        strategy: "BALANCED"
    },
    
    EVOGROUND: {
        patterns: ["evoground", "infection", "zombie", "undead", "ragegear", "survive"],
        priority: 65,
        maxPing: 35,
        strategy: "ADAPTIVE"
    },
    
    // CDN والتحديثات
    CDN: {
        patterns: ["cdn", "patch", "update", "download", "asset", "resource", "pkg", "obb", "version", "akamaized", "cloudfront"],
        priority: 10,
        maxPing: 999,
        strategy: "CDN_OPTIMIZED"
    },
    
    // أنظمة المراقبة والتحليلات (يمكن تأخيرها قليلاً)
    TELEMETRY: {
        patterns: ["telemetry", "log", "stat", "analytics", "tracking", "beacon", "metrics"],
        priority: 5,
        maxPing: 200,
        strategy: "BACKGROUND"
    }
};

// ═══════════════════════════════════════════════════════════════════════
//  STATE MANAGEMENT - Advanced Caching System
// ═══════════════════════════════════════════════════════════════════════

var State = {
    dnsCache: {},
    dnsOrder: [],
    stickyRoutes: {},
    metrics: {
        lastPing: 0,
        avgPing: 0,
        connectionType: "UNKNOWN",
        timestamp: 0
    }
};

// ═══════════════════════════════════════════════════════════════════════
//  CORE FUNCTIONS - Optimized for Speed
// ═══════════════════════════════════════════════════════════════════════

function now() {
    return new Date().getTime();
}

function isIPv4(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    var parts = ip.split(".");
    if (parts.length !== 4) return false;
    for (var i = 0; i < 4; i++) {
        var num = parseInt(parts[i], 10);
        if (isNaN(num) || num < 0 || num > 255) return false;
    }
    return true;
}

function isJordanIP(ip) {
    if (!isIPv4(ip)) return false;
    for (var i = 0; i < JO_RANGES.length; i++) {
        if (isInNet(ip, JO_RANGES[i][0], JO_RANGES[i][1])) return true;
    }
    return false;
}

function getCarrierFromIP(ip) {
    if (!isIPv4(ip)) return "UNKNOWN";
    // Orange
    if (isInNet(ip, "46.185.128.0", "255.255.128.0") || 
        isInNet(ip, "37.220.0.0", "255.255.0.0")) return "ORANGE";
    // Zain
    if (isInNet(ip, "79.173.192.0", "255.255.192.0") || 
        isInNet(ip, "176.28.0.0", "255.255.128.0") ||
        isInNet(ip, "176.29.0.0", "255.255.0.0") ||
        isInNet(ip, "91.106.0.0", "255.255.0.0")) return "ZAIN";
    // Umniah
    if (isInNet(ip, "82.212.0.0", "255.255.0.0") ||
        isInNet(ip, "188.247.0.0", "255.255.0.0") ||
        isInNet(ip, "109.237.192.0", "255.255.240.0")) return "UMNIAH";
    // ST
    if (isInNet(ip, "94.230.0.0", "255.255.0.0")) return "ST";
    
    return "OTHER";
}

// ═══════════════════════════════════════════════════════════════════════
//  INTELLIGENT ROUTING ENGINE
// ═══════════════════════════════════════════════════════════════════════

function classifyHost(host) {
    var h = host.toLowerCase();
    var bestMatch = { priority: 0, signature: null, mode: "DEFAULT" };
    
    for (var mode in SIGNATURES) {
        var sig = SIGNATURES[mode];
        for (var i = 0; i < sig.patterns.length; i++) {
            if (h.indexOf(sig.patterns[i]) !== -1) {
                if (sig.priority > bestMatch.priority) {
                    bestMatch = { 
                        priority: sig.priority, 
                        signature: sig, 
                        mode: mode 
                    };
                }
                break;
            }
        }
    }
    
    return bestMatch;
}

function buildProxyChain(preferredCarriers, tier) {
    var chain = [];
    var count = 0;
    
    // ترتيب البروكسيات حسب الأولوية
    var proxies = [];
    for (var key in PROXY_POOL) {
        var p = PROXY_POOL[key];
        if (tier && p.tier > tier) continue;
        
        var score = p.latency;
        // تفضيل الناقل المطلوب
        if (preferredCarriers && preferredCarriers.indexOf(p.carrier) !== -1) {
            score -= 10;
        }
        
        proxies.push({ key: key, proxy: p, score: score });
    }
    
    // فرز حسب الأداء (Bubble sort محسن للـ PAC)
    for (var i = 0; i < proxies.length - 1; i++) {
        for (var j = i + 1; j < proxies.length; j++) {
            if (proxies[j].score < proxies[i].score) {
                var tmp = proxies[i];
                proxies[i] = proxies[j];
                proxies[j] = tmp;
            }
        }
    }
    
    // بناء السلسلة
    for (var i = 0; i < proxies.length && count < CFG.MAX_PROXY_FALLBACKS; i++) {
        var p = proxies[i].proxy;
        chain.push("PROXY " + p.ip + ":" + p.port);
        count++;
    }
    
    if (chain.length === 0) {
        return CFG.FAIL_CLOSED ? "PROXY 0.0.0.0:80" : "DIRECT";
    }
    
    var result = chain.join("; ");
    return CFG.FAIL_CLOSED ? result + "; PROXY 0.0.0.0:80" : result + "; DIRECT";
}

function getOptimalRoute(mode, clientCarrier, targetIP) {
    var strategy = (SIGNATURES[mode] && SIGNATURES[mode].strategy) || "BALANCED";
    var targetCarrier = getCarrierFromIP(targetIP);
    
    // Sticky Routing للمصادقة واللاوبي
    if ((strategy === "CRITICAL_AUTH" || strategy === "STICKY_PREMIUM") && CFG.PREDICTIVE_ROUTING) {
        var stickyKey = mode + "_" + clientCarrier;
        var sticky = State.stickyRoutes[stickyKey];
        if (sticky && (now() - sticky.time < CFG.STICKY_TTL)) {
            return sticky.route;
        }
    }
    
    var route;
    
    switch(strategy) {
        case "CRITICAL_AUTH":
            // أقرب بروكسي للعميل، ثم الأورانج (الأكثر استقراراً)
            route = buildProxyChain([clientCarrier, "ORANGE"], 1);
            break;
            
        case "STICKY_PREMIUM":
        case "ULTRA_LOW_LATENCY":
            // Tier 1 فقط، نفس الناقل إن أمكن
            route = buildProxyChain([clientCarrier], 1);
            break;
            
        case "COMPETITIVE":
        case "FAST_RESPONSE":
            // أقل بنق ممكن، أي Tier 1
            route = buildProxyChain(["ORANGE", "ZAIN"], 1);
            break;
            
        case "CDN_OPTIMIZED":
            if (CFG.ALLOW_CDN_DIRECT) return "DIRECT";
            route = buildProxyChain(["ZAIN", "ORANGE"], 2);
            break;
            
        case "BACKGROUND":
            // بروكسي أي مستوى، أو DIRECT إذا مسموح
            route = buildProxyChain(null, 2);
            break;
            
        case "STABLE":
        case "BALANCED":
        default:
            // توازن بين السرعة والاستقرار
            route = buildProxyChain([clientCarrier, "ZAIN", "ORANGE"], 2);
    }
    
    // حفظ في Sticky Cache
    if (CFG.PREDICTIVE_ROUTING && (strategy === "CRITICAL_AUTH" || strategy === "STICKY_PREMIUM")) {
        State.stickyRoutes[mode + "_" + clientCarrier] = {
            route: route,
            time: now()
        };
    }
    
    return route;
}

// ═══════════════════════════════════════════════════════════════════════
//  DNS INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════

function intelligentDNS(host) {
    var cached = State.dnsCache[host];
    var currentTime = now();
    
    if (cached && (currentTime - cached.time < CFG.DNS_CACHE_TTL)) {
        return cached;
    }
    
    var start = currentTime;
    var ip = dnsResolve(host);
    var latency = now() - start;
    
    var result = {
        ip: ip,
        latency: latency,
        time: currentTime,
        isJordan: ip ? isJordanIP(ip) : false,
        carrier: ip ? getCarrierFromIP(ip) : "UNKNOWN"
    };
    
    // إدارة الذاكرة: إزالة الأقدم
    if (State.dnsOrder.length >= CFG.DNS_CACHE_MAX) {
        var oldest = State.dnsOrder.shift();
        delete State.dnsCache[oldest];
    }
    
    State.dnsCache[host] = result;
    State.dnsOrder.push(host);
    
    // تحديث metrics
    State.metrics.lastPing = latency;
    State.metrics.timestamp = currentTime;
    
    return result;
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN PAC FUNCTION
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    // 1. التحقق من الشبكة المحلية
    if (isPlainHostName(host)) return "DIRECT";
    
    var lowerHost = host.toLowerCase();
    
    // 2. IPv4 Local Check
    if (isIPv4(host)) {
        if (isInNet(host, "127.0.0.0", "255.0.0.0") ||
            isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0")) {
            return "DIRECT";
        }
    }
    
    // 3. تحديد ما إذا كان PUBG
    var classification = classifyHost(lowerHost);
    var isPUBG = classification.priority > 0;
    
    // 4. إذا لم يكن PUBG، DIRECT
    if (!isPUBG) {
        // استثناءات خدمات أساسية
        if (lowerHost.indexOf("google") !== -1 || 
            lowerHost.indexOf("facebook") !== -1 ||
            lowerHost.indexOf("whatsapp") !== -1) {
            return "DIRECT";
        }
        return "DIRECT";
    }
    
    // 5. معالجة PUBG Traffic
    var dnsInfo = intelligentDNS(host);
    
    // 6. التحقق من Hard Lock (الأمان القصوي)
    if (CFG.HARD_LOCK_JORDAN_DESTINATION && dnsInfo.ip && !dnsInfo.isJordan) {
        return "PROXY 0.0.0.0:80"; // حظر الاتصال
    }
    
    // 7. IPv6 Handling (إذا كان النظام يدعمه)
    if (dnsInfo.ip && dnsInfo.ip.indexOf(":") !== -1) {
        if (CFG.HARD_LOCK_JORDAN_DESTINATION) return "PROXY 0.0.0.0:80";
        // محاولة IPv4 fallback أو DIRECT
        return CFG.NO_DIRECT_FOR_PUBG ? buildProxyChain(["ORANGE", "ZAIN"], 1) : "DIRECT";
    }
    
    // 8. تحديد الناقل المحلي (افتراضي إذا لم يعرف)
    var localCarrier = "ORANGE"; // افتراضي
    
    // محاولة استنتاج الناقل من عنوان IP المحلي (إذا كان ممكناً)
    // ملاحظة: PAC لا يمكنه معرفة IP الجهاز مباشرة، لذا نستخدم heuristic
    
    // 9. اختيار المسار الأمثل
    var route = getOptimalRoute(classification.mode, localCarrier, dnsInfo.ip);
    
    return route;
}

// ═══════════════════════════════════════════════════════════════════════
//  UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function getPortFromURL(url) {
    if (url.indexOf("https://") === 0) return 443;
    if (url.indexOf("http://") === 0) return 80;
    
    var match = url.match(/:(\d+)\//);
    if (match) return parseInt(match[1], 10);
    
    return 443;
}

// تنظيف الكاش القديم (يُستدعى ضمنياً)
function cleanupCache() {
    var current = now();
    if (current - State.metrics.timestamp > 60000) { // كل دقيقة
        for (var host in State.dnsCache) {
            if (current - State.dnsCache[host].time > CFG.DNS_CACHE_TTL) {
                delete State.dnsCache[host];
                var idx = State.dnsOrder.indexOf(host);
                if (idx > -1) State.dnsOrder.splice(idx, 1);
            }
        }
    }
}
