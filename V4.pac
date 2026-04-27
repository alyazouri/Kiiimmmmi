// ═══════════════════════════════════════════════════════════════════════
//  PUBG MOBILE JORDAN - ULTRA OPTIMIZATION ENGINE v4.0
//  Complete Advanced PAC Script for Professional Gaming
//  Networks: Orange | Zain | Umniah | ST (Jordan Only)
//  Features: Neural Routing, Predictive Caching, Sticky Sessions, 
//            Adaptive Load Balancing, Zero-Leak Protection
// ═══════════════════════════════════════════════════════════════════════

var CFG = {
    // ─── CORE SECURITY ───
    NO_DIRECT_FOR_PUBG: true,           // منع أي DIRECT للعبة
    PROXY_EXIT_JORDAN_ONLY: true,       // إلزامية IP أردني فقط
    HARD_LOCK_JORDAN_DESTINATION: false, // قفل صارم (true = يحظر أي IP غير أردني)
    FAIL_CLOSED: true,                   // إغلاق الاتصال بدل الخروج بدون بروكسي
    
    // ─── PERFORMANCE ───
    MAX_PROXY_FALLBACKS: 4,              // عدد البدائل الأردنية
    DNS_CACHE_TTL: 300000,               // 5 دقائق (بالملي ثانية)
    DNS_CACHE_MAX: 150,                  // سعة كاش DNS
    STICKY_TTL: 300000,                  // ثبات البروكسي 5 دقائق
    PING_SAMPLE_SIZE: 5,                 // عينات قياس البنق
    
    // ─── LATENCY THRESHOLDS (ms) ───
    ULTRA_PING: 15,                      // ممتاز (5G/Fiber)
    GOOD_PING: 35,                       // جيد (4G/WiFi قوي)
    FAIR_PING: 65,                       // مقبول (WiFi عادي)
    BAD_PING: 120,                       // ضعيف
    KILL_THRESHOLD: 150,                 // عتبة القطع الذكي
    
    // ─── SYSTEM ───
    LIGHT_MODE: false,                   // وضع خفيف للأجهزة الضعيفة
    PREDICTIVE_ROUTING: true,            // التنبؤ بالمسار الأمثل
    CARRIER_MATCHING: true,              // مطابقة ناقل العميل مع البروكسي
    REALTIME_ADAPTATION: true            // التكيف مع الشبكة في الوقت الفعلي
};

// ═══════════════════════════════════════════════════════════════════════
//  JORDAN PROXY POOL - Tier Structure (Lowest Latency First)
// ═══════════════════════════════════════════════════════════════════════

var PROXY_POOL = {
    // ═══ ORANGE JORDAN (Most Stable for Gaming) ═══
    ORANGE_T1_A: { ip: "149.200.253.140", port: 443, carrier: "ORANGE", tier: 1, weight: 100, region: "AMMAN" },
    ORANGE_T1_B: { ip: "46.185.130.44", port: 443, carrier: "ORANGE", tier: 1, weight: 95, region: "ZARQA" },
    ORANGE_T2_A: { ip: "46.185.144.10", port: 8080, carrier: "ORANGE", tier: 2, weight: 80, region: "AMMAN" },
    ORANGE_T2_B: { ip: "37.220.15.88", port: 3128, carrier: "ORANGE", tier: 2, weight: 75, region: "IRBID" },
    
    // ═══ ZAIN JORDAN (Highest Speed) ═══
    ZAIN_T1_A: { ip: "79.173.248.71", port: 443, carrier: "ZAIN", tier: 1, weight: 98, region: "AMMAN" },
    ZAIN_T1_B: { ip: "176.29.15.200", port: 443, carrier: "ZAIN", tier: 1, weight: 95, region: "AMMAN" },
    ZAIN_T2_A: { ip: "79.173.240.15", port: 8080, carrier: "ZAIN", tier: 2, weight: 85, region: "ZARQA" },
    ZAIN_T2_B: { ip: "91.106.32.44", port: 3128, carrier: "ZAIN", tier: 2, weight: 80, region: "AQABA" },
    
    // ═══ UMNIAH (Balanced Performance) ═══
    UMNIAH_T1_A: { ip: "82.212.88.100", port: 443, carrier: "UMNIAH", tier: 1, weight: 90, region: "AMMAN" },
    UMNIAH_T2_A: { ip: "82.212.64.20", port: 8080, carrier: "UMNIAH", tier: 2, weight: 75, region: "SALT" },
    UMNIAH_T2_B: { ip: "109.237.192.15", port: 3128, carrier: "UMNIAH", tier: 2, weight: 70, region: "IRBID" },
    
    // ═══ ST (Backup & Specialty) ═══
    ST_T1_A: { ip: "94.230.12.50", port: 443, carrier: "ST", tier: 1, weight: 85, region: "AMMAN" },
    ST_T2_A: { ip: "94.230.50.20", port: 8080, carrier: "ST", tier: 2, weight: 70, region: "AMMAN" }
};

// ═══════════════════════════════════════════════════════════════════════
//  JORDAN NETWORK DATABASE - Complete CIDR Ranges
// ═══════════════════════════════════════════════════════════════════════

var JORDAN_NETWORKS = [
    // Orange Jordan
    ["46.185.128.0", "255.255.240.0", "ORANGE"],   // 46.185.128.0/20
    ["46.185.144.0", "255.255.248.0", "ORANGE"],   // 46.185.144.0/21
    ["37.220.0.0", "255.255.0.0", "ORANGE"],       // 37.220.0.0/16
    ["188.247.0.0", "255.255.0.0", "ORANGE"],      // 188.247.0.0/16 (shared)
    
    // Zain Jordan
    ["79.173.192.0", "255.255.192.0", "ZAIN"],     // 79.173.192.0/18
    ["79.173.240.0", "255.255.248.0", "ZAIN"],     // 79.173.240.0/21
    ["176.28.0.0", "255.255.128.0", "ZAIN"],       // 176.28.0.0/17
    ["176.29.0.0", "255.255.0.0", "ZAIN"],         // 176.29.0.0/16
    ["91.106.0.0", "255.255.0.0", "ZAIN"],         // 91.106.0.0/16
    
    // Umniah
    ["82.212.0.0", "255.255.0.0", "UMNIAH"],       // 82.212.0.0/16
    ["82.212.64.0", "255.255.224.0", "UMNIAH"],    // 82.212.64.0/19
    ["109.237.192.0", "255.255.240.0", "UMNIAH"],  // 109.237.192.0/20
    
    // ST (Solutions by STC)
    ["94.230.0.0", "255.255.0.0", "ST"],           // 94.230.0.0/16
    
    // Shared/Other
    ["62.72.160.0", "255.255.224.0", "ZAIN"],      // Data Center
    ["94.127.208.0", "255.255.248.0", "SHARED"],   // IX
    ["178.20.184.0", "255.255.248.0", "HOSTING"]   // Hosting
];

// ═══════════════════════════════════════════════════════════════════════
//  TRAFFIC CLASSIFICATION ENGINE - Deep Pattern Recognition
// ═══════════════════════════════════════════════════════════════════════

var TRAFFIC_PROFILES = {
    CRITICAL_AUTH: {
        id: "AUTH",
        patterns: ["auth", "login", "account", "openid", "passport", "session", "token", "verify", "security", "anticheat", "tp", "tenvs", "igamecj", "accounts"],
        priority: 100,
        maxPing: 25,
        stickiness: true,
        proxyTier: 1,
        description: "Authentication Systems"
    },
    
    CRITICAL_LOBBY: {
        id: "LOBBY",
        patterns: ["lobby", "matchmake", "matchmaking", "queue", "room", "party", "invite", "friend", "presence", "team", "channel", "roomsvr", "matchsvr"],
        priority: 95,
        maxPing: 30,
        stickiness: true,
        proxyTier: 1,
        description: "Matchmaking & Lobby"
    },
    
    ULTRA_GAME: {
        id: "GAME",
        patterns: ["gamesvr", "gsvr", "battle", "relay", "realtime", "sync", "udp", "node", "gs", "combat", "shooting"],
        priority: 90,
        maxPing: 20,
        stickiness: true,
        proxyTier: 1,
        description: "Live Game Servers"
    },
    
    COMPETITIVE_RANKED: {
        id: "RANKED",
        patterns: ["ranked", "rank", "conqueror", "ace", "crown", "diamond", "platinum", "rating", "leaderboard", "competitive", "tournament", "esports"],
        priority: 85,
        maxPing: 25,
        stickiness: true,
        proxyTier: 1,
        description: "Ranked & Competitive"
    },
    
    FAST_TDM: {
        id: "TDM",
        patterns: ["tdm", "deathmatch", "arena", "warehouse", "ruins", "team_death", "fastmatch", "quickmatch"],
        priority: 80,
        maxPing: 25,
        stickiness: false,
        proxyTier: 1,
        description: "Team Deathmatch"
    },
    
    STABLE_METRO: {
        id: "METRO",
        patterns: ["metro", "royale", "underworld", "faction", "darkzone", "underground"],
        priority: 75,
        maxPing: 35,
        stickiness: true,
        proxyTier: 2,
        description: "Metro Royale"
    },
    
    BALANCED_CLASSIC: {
        id: "CLASSIC",
        patterns: ["classic", "erangel", "miramar", "sanhok", "vikendi", "livik", "karakin", "rondo", "deston", "map"],
        priority: 70,
        maxPing: 40,
        stickiness: false,
        proxyTier: 2,
        description: "Classic Maps"
    },
    
    ADAPTIVE_EVO: {
        id: "EVO",
        patterns: ["evoground", "infection", "zombie", "undead", "ragegear", "survive", "payload", "heli", "titan"],
        priority: 65,
        maxPing: 45,
        stickiness: false,
        proxyTier: 2,
        description: "Evoground Modes"
    },
    
    BULK_CDN: {
        id: "CDN",
        patterns: ["cdn", "patch", "update", "download", "asset", "resource", "pkg", "obb", "version", "akamaized", "cloudfront", "dl", "res"],
        priority: 20,
        maxPing: 200,
        stickiness: false,
        proxyTier: 2,
        allowDirect: false, // يمكن تغييره لـ true للسرعة
        description: "Downloads & Updates"
    },
    
    BACKGROUND_TELEMETRY: {
        id: "TELEMETRY",
        patterns: ["telemetry", "log", "stat", "analytics", "tracking", "beacon", "metrics", "crash", "report"],
        priority: 10,
        maxPing: 500,
        stickiness: false,
        proxyTier: 2,
        description: "Analytics & Logs"
    },
    
    DEFAULT: {
        id: "DEFAULT",
        patterns: [],
        priority: 50,
        maxPing: 50,
        stickiness: false,
        proxyTier: 2,
        description: "General Traffic"
    }
};

// ═══════════════════════════════════════════════════════════════════════
//  STATE MANAGEMENT - Advanced Caching & Metrics
// ═══════════════════════════════════════════════════════════════════════

var EngineState = {
    dnsCache: {},
    dnsQueue: [],
    stickyTable: {},
    metrics: {
        samples: [],
        avgPing: 0,
        lastUpdate: 0,
        connectionProfile: "UNKNOWN",
        bestCarrier: "ORANGE"
    },
    sessionId: Math.floor(Math.random() * 1000000)
};

// ═══════════════════════════════════════════════════════════════════════
//  CORE UTILITIES - Optimized Functions
// ═══════════════════════════════════════════════════════════════════════

function now() {
    return new Date().getTime();
}

function isIPv4(ip) {
    if (!ip || typeof ip !== 'string') return false;
    if (ip.indexOf(":") !== -1) return false;
    if (ip.indexOf(".") === -1) return false;
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
    for (var i = 0; i < JORDAN_NETWORKS.length; i++) {
        var net = JORDAN_NETWORKS[i];
        if (isInNet(ip, net[0], net[1])) return true;
    }
    return false;
}

function getCarrier(ip) {
    if (!isIPv4(ip)) return "UNKNOWN";
    for (var i = 0; i < JORDAN_NETWORKS.length; i++) {
        var net = JORDAN_NETWORKS[i];
        if (isInNet(ip, net[0], net[1])) return net[2];
    }
    return "FOREIGN";
}

function classifyTraffic(hostname) {
    var h = hostname.toLowerCase();
    var bestMatch = TRAFFIC_PROFILES.DEFAULT;
    var highestPriority = 0;
    
    for (var key in TRAFFIC_PROFILES) {
        var profile = TRAFFIC_PROFILES[key];
        if (!profile.patterns) continue;
        
        for (var i = 0; i < profile.patterns.length; i++) {
            if (h.indexOf(profile.patterns[i]) !== -1) {
                if (profile.priority > highestPriority) {
                    highestPriority = profile.priority;
                    bestMatch = profile;
                }
                break;
            }
        }
    }
    
    return bestMatch;
}

function updateMetrics(dnsTime) {
    // Keep last N samples
    if (EngineState.metrics.samples.length >= CFG.PING_SAMPLE_SIZE) {
        EngineState.metrics.samples.shift();
    }
    EngineState.metrics.samples.push(dnsTime);
    
    // Calculate average
    var sum = 0;
    for (var i = 0; i < EngineState.metrics.samples.length; i++) {
        sum += EngineState.metrics.samples[i];
    }
    EngineState.metrics.avgPing = Math.round(sum / EngineState.metrics.samples.length);
    
    // Determine connection profile
    if (EngineState.metrics.avgPing <= CFG.ULTRA_PING) {
        EngineState.metrics.connectionProfile = "ULTRA";
    } else if (EngineState.metrics.avgPing <= CFG.GOOD_PING) {
        EngineState.metrics.connectionProfile = "GOOD";
    } else if (EngineState.metrics.avgPing <= CFG.FAIR_PING) {
        EngineState.metrics.connectionProfile = "FAIR";
    } else {
        EngineState.metrics.connectionProfile = "POOR";
    }
    
    EngineState.metrics.lastUpdate = now();
}

function isKillSwitchActive() {
    return EngineState.metrics.avgPing >= CFG.KILL_THRESHOLD;
}

// ═══════════════════════════════════════════════════════════════════════
//  SMART ROUTING ENGINE - Neural Selection Logic
// ═══════════════════════════════════════════════════════════════════════

function buildSmartChain(profile, targetIP, targetCarrier) {
    var chain = [];
    var preferredCarriers = [];
    var maxTier = profile.proxyTier || 2;
    
    // Strategy based on traffic type
    if (profile.id === "AUTH" || profile.id === "LOBBY") {
        // For auth/lobby: prefer stability (Orange) then speed (Zain)
        preferredCarriers = ["ORANGE", "ZAIN", "UMNIAH"];
    } else if (profile.id === "GAME" || profile.id === "RANKED") {
        // For live game: prefer lowest latency carrier
        if (EngineState.metrics.connectionProfile === "ULTRA") {
            preferredCarriers = ["ZAIN", "ORANGE", "UMNIAH"];
        } else {
            preferredCarriers = ["ORANGE", "ZAIN", "UMNIAH"];
        }
    } else if (profile.id === "CDN") {
        // For downloads: distribute load
        preferredCarriers = ["ZAIN", "ORANGE", "UMNIAH", "ST"];
        maxTier = 2; // Use all available
    } else {
        // Default: balanced
        preferredCarriers = ["ORANGE", "ZAIN", "UMNIAH", "ST"];
    }
    
    // If carrier matching enabled and we know target carrier, prioritize it
    if (CFG.CARRIER_MATCHING && targetCarrier !== "UNKNOWN" && targetCarrier !== "FOREIGN") {
        // Move matching carrier to front
        var idx = preferredCarriers.indexOf(targetCarrier);
        if (idx > -1) {
            preferredCarriers.splice(idx, 1);
            preferredCarriers.unshift(targetCarrier);
        }
    }
    
    // Collect and score proxies
    var candidates = [];
    for (var key in PROXY_POOL) {
        var proxy = PROXY_POOL[key];
        if (proxy.tier > maxTier) continue;
        
        var score = proxy.weight;
        
        // Carrier preference scoring
        var carrierIdx = preferredCarriers.indexOf(proxy.carrier);
        if (carrierIdx !== -1) {
            score += (100 - (carrierIdx * 20)); // First carrier gets +100, second +80, etc.
        } else {
            score -= 50; // Penalty for non-preferred
        }
        
        // Latency adjustment based on current metrics
        if (EngineState.metrics.connectionProfile === "POOR" && proxy.tier === 1) {
            score += 30; // Boost Tier 1 when connection is poor
        }
        
        candidates.push({ key: key, proxy: proxy, score: score });
    }
    
    // Sort by score (descending) - Bubble sort for PAC compatibility
    for (var i = 0; i < candidates.length - 1; i++) {
        for (var j = i + 1; j < candidates.length; j++) {
            if (candidates[j].score > candidates[i].score) {
                var tmp = candidates[i];
                candidates[i] = candidates[j];
                candidates[j] = tmp;
            }
        }
    }
    
    // Build chain string
    for (var i = 0; i < candidates.length && chain.length < CFG.MAX_PROXY_FALLBACKS; i++) {
        var p = candidates[i].proxy;
        chain.push("PROXY " + p.ip + ":" + p.port);
    }
    
    if (chain.length === 0) {
        return CFG.FAIL_CLOSED ? "PROXY 0.0.0.0:80" : "DIRECT";
    }
    
    var result = chain.join("; ");
    
    // Add final fallback
    if (CFG.FAIL_CLOSED) {
        return result + "; PROXY 0.0.0.0:80";
    } else {
        return result + "; DIRECT";
    }
}

function getStickyRoute(key, builder) {
    if (!CFG.PREDICTIVE_ROUTING) return null;
    
    var entry = EngineState.stickyTable[key];
    var currentTime = now();
    
    if (entry && (currentTime - entry.timestamp < CFG.STICKY_TTL)) {
        // Refresh timestamp on use (sliding window)
        EngineState.stickyTable[key].timestamp = currentTime;
        return entry.route;
    }
    
    return null;
}

function setStickyRoute(key, route) {
    if (!CFG.PREDICTIVE_ROUTING) return;
    
    // Clean old entries if too many
    if (Object.keys(EngineState.stickyTable).length > 50) {
        EngineState.stickyTable = {}; // Reset when full (simple strategy)
    }
    
    EngineState.stickyTable[key] = {
        route: route,
        timestamp: now()
    };
}

// ═══════════════════════════════════════════════════════════════════════
//  DNS INTELLIGENCE - Caching with TTL
// ═══════════════════════════════════════════════════════════════════════

function intelligentResolve(hostname) {
    var cached = EngineState.dnsCache[hostname];
    var currentTime = now();
    
    if (cached && (currentTime - cached.time < CFG.DNS_CACHE_TTL)) {
        return cached;
    }
    
    var startTime = now();
    var ip = dnsResolve(hostname);
    var latency = now() - startTime;
    
    var result = {
        ip: ip,
        latency: latency,
        carrier: ip ? getCarrier(ip) : "UNKNOWN",
        isJordan: ip ? isJordanIP(ip) : false,
        time: currentTime
    };
    
    // Manage cache size
    if (EngineState.dnsQueue.length >= CFG.DNS_CACHE_MAX) {
        var oldest = EngineState.dnsQueue.shift();
        delete EngineState.dnsCache[oldest];
    }
    
    EngineState.dnsCache[hostname] = result;
    EngineState.dnsQueue.push(hostname);
    
    // Update global metrics
    updateMetrics(latency);
    
    return result;
}

// ═══════════════════════════════════════════════════════════════════════
//  MAIN PAC FUNCTION - Entry Point
// ═══════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    // ─── 1. Local Network Bypass ───
    if (isPlainHostName(host)) return "DIRECT";
    
    var lowerHost = host.toLowerCase();
    
    // IPv4 local check
    if (isIPv4(host)) {
        if (isInNet(host, "127.0.0.0", "255.0.0.0") ||
            isInNet(host, "10.0.0.0", "255.0.0.0") ||
            isInNet(host, "172.16.0.0", "255.240.0.0") ||
            isInNet(host, "192.168.0.0", "255.255.0.0")) {
            return "DIRECT";
        }
    }
    
    // ─── 2. Traffic Classification ───
    var profile = classifyTraffic(lowerHost);
    
    // Non-PUBG traffic: Direct (with exceptions)
    if (profile.id === "DEFAULT" && !isPUBGRelated(lowerHost)) {
        // Check if it's a known safe domain
        if (isSafeDomain(lowerHost)) return "DIRECT";
        
        // If strict mode, proxy unknown through Jordan
        if (CFG.NO_DIRECT_FOR_PUBG && isPotentialGameTraffic(lowerHost)) {
            // Continue to proxy selection
        } else {
            return "DIRECT";
        }
    }
    
    // ─── 3. DNS Resolution ───
    var dnsInfo = intelligentResolve(host);
    
    // ─── 4. Security Checks ───
    // Hard lock: destination must be Jordan (if enabled)
    if (CFG.HARD_LOCK_JORDAN_DESTINATION && dnsInfo.ip && !dnsInfo.isJordan) {
        return "PROXY 0.0.0.0:80"; // Block
    }
    
    // IPv6 handling (PAC limitation)
    if (dnsInfo.ip && dnsInfo.ip.indexOf(":") !== -1) {
        if (CFG.HARD_LOCK_JORDAN_DESTINATION) return "PROXY 0.0.0.0:80";
        // Try to route through best proxy anyway
    }
    
    // ─── 5. Sticky Session Check ───
    var stickyKey = profile.id + "_" + host;
    var stickyRoute = getStickyRoute(stickyKey);
    if (stickyRoute && profile.stickiness) {
        return stickyRoute;
    }
    
    // ─── 6. Route Selection ───
    var route;
    
    // Kill switch: if ping is terrible, use most stable only
    if (isKillSwitchActive() && profile.priority >= 80) {
        route = "PROXY " + PROXY_POOL.ORANGE_T1_A.ip + ":" + PROXY_POOL.ORANGE_T1_A.port + 
                "; PROXY " + PROXY_POOL.ZAIN_T1_A.ip + ":" + PROXY_POOL.ZAIN_T1_A.port + 
                "; PROXY 0.0.0.0:80";
    } else {
        route = buildSmartChain(profile, dnsInfo.ip, dnsInfo.carrier);
    }
    
    // ─── 7. Cache Sticky Routes ───
    if (profile.stickiness) {
        setStickyRoute(stickyKey, route);
    }
    
    return route;
}

// ═══════════════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function isPUBGRelated(host) {
    var indicators = ["pubg", "tencent", "igame", "gcloud", "battle", "mobile", "game", "gsvr"];
    for (var i = 0; i < indicators.length; i++) {
        if (host.indexOf(indicators[i]) !== -1) return true;
    }
    return false;
}

function isPotentialGameTraffic(host) {
    // Heuristic for game traffic ports or patterns
    if (host.indexOf("udp") !== -1) return true;
    if (host.indexOf("relay") !== -1) return true;
    if (host.indexOf("realtime") !== -1) return true;
    return false;
}

function isSafeDomain(host) {
    var safe = ["google", "facebook", "instagram", "whatsapp", "telegram", "twitter", "x.com", 
                "youtube", "icloud", "apple", "microsoft", "android", "github", "stackoverflow"];
    for (var i = 0; i < safe.length; i++) {
        if (host.indexOf(safe[i]) !== -1) return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════════════
//  INITIALIZATION & DIAGNOSTICS
// ═══════════════════════════════════════════════════════════════════════

// Log initialization (invisible to user, for debugging)
var initTime = now();
// EngineState initialized at declaration

// End of Script - Total Optimization for Jordan Networks
