// ============================================================
// PUBG ULTIMATE JORDAN LOCK v5.0
// ============================================================
// ✅ Jordan Players Boost (More JO IPs)
// ✅ Multi-Segment Lock (Lobby=3, Match=4)
// ✅ ISP Lock + Forced Retry
// ✅ Global Country Blocks
// ✅ Low Ping Optimization
// ✅ Advanced Detection Engine
// ✅ Session Memory + Auto Reset
// ✅ IPv4 + IPv6 Dual Stack
// ============================================================

// ========== PROXY CONFIGURATION ==========
var PROXY_PRIMARY   = "PROXY 46.185.131.218:20001";
var PROXY_SECONDARY = "PROXY 46.185.131.218:20002";
var PROXY_TERTIARY  = "PROXY 46.185.131.218:20003";
var DIRECT          = "DIRECT";
var BLOCK           = "PROXY 0.0.0.0:0";

// ========== JORDAN ISP PROXY POOL ==========
// مزودي خدمة الإنترنت الأردنيين الرئيسيين
var PROXY_ZAIN     = "PROXY 46.185.131.218:20001"; // زين الأردن
var PROXY_ORANGE   = "PROXY 46.185.131.218:20002"; // أورنج الأردن
var PROXY_UMNIAH   = "PROXY 46.185.131.218:20003"; // أمنية الأردن
var PROXY_BATELCO  = "PROXY 46.185.131.218:20004"; // باتلكو
var PROXY_DAMAMAX  = "PROXY 46.185.131.218:20005"; // داماكس

// ========== SESSION STATE ==========
var SESSION = {
  ispNet:       null,
  lobbyNet:     null,
  matchNet:     null,
  inMatch:      false,
  playerCount:  0,
  retryCount:   0,
  lastISP:      null,
  sessionStart: 0,
  pingOptLevel: 0,
  jordanBoost:  true
};

// ============================================================
// ========== IPv6 UTILITIES ==========
// ============================================================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

function isIPv4(ip) {
  return ip && /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip);
}

function expandIPv6(address) {
  if (!address) return "";
  if (address.indexOf(":") === -1) return address;

  // إزالة المنطقة scope إن وجدت
  if (address.indexOf("%") !== -1) {
    address = address.split("%")[0];
  }

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);
    full = left;
    for (var i = 0; i < missing; i++) full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4) full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ============================================================
// ========== JORDAN IP DETECTION - COMPREHENSIVE ==========
// ============================================================

function isJordanIPv6(ip) {
  ip = expandIPv6(ip);
  return (
    // ===== ZAIN JORDAN (زين) =====
    ip.startsWith("2a01:9700:3f00:") ||
    ip.startsWith("2a01:9700:4000:") ||
    ip.startsWith("2a01:9700:4100:") ||
    ip.startsWith("2a01:9700:4200:") ||
    ip.startsWith("2a01:9700:4300:") ||
    ip.startsWith("2a01:9700:4400:") ||
    ip.startsWith("2a01:9700:4500:") ||
    ip.startsWith("2a01:9700:4600:") ||
    ip.startsWith("2a01:9700:4700:") ||
    ip.startsWith("2a01:9700:4800:") ||
    ip.startsWith("2a01:9700:4900:") ||
    ip.startsWith("2a01:9700:5000:") ||
    ip.startsWith("2a01:9700:5100:") ||
    ip.startsWith("2a01:9700:5200:") ||
    ip.startsWith("2a01:9700:6000:") ||
    ip.startsWith("2a01:9700:6100:") ||
    ip.startsWith("2a01:9700:7000:") ||
    ip.startsWith("2a01:9700:7100:") ||
    ip.startsWith("2a01:9700:8000:") ||

    // ===== ORANGE JORDAN (أورنج) =====
    ip.startsWith("2a04:4e42:200:") ||
    ip.startsWith("2a04:4e42:400:") ||
    ip.startsWith("2a04:4e42:600:") ||
    ip.startsWith("2a04:4e42:800:") ||
    ip.startsWith("2001:df0:268:")  ||
    ip.startsWith("2001:df0:270:")  ||
    ip.startsWith("2001:df0:278:")  ||
    ip.startsWith("2001:df0:280:")  ||
    ip.startsWith("2001:df0:288:")  ||
    ip.startsWith("2001:df0:290:")  ||
    ip.startsWith("2001:4d20:")     ||
    ip.startsWith("2001:4d28:")     ||

    // ===== UMNIAH JORDAN (أمنية) =====
    ip.startsWith("2a02:ed0:")      ||
    ip.startsWith("2a02:ed8:")      ||
    ip.startsWith("2a02:ee0:")      ||
    ip.startsWith("2a02:ee8:")      ||
    ip.startsWith("2a02:ef0:")      ||
    ip.startsWith("2a02:ef8:")      ||
    ip.startsWith("2a06:e881:7300:")||
    ip.startsWith("2a06:e881:7400:")||
    ip.startsWith("2a06:e881:7500:")||
    ip.startsWith("2a06:e881:7600:")||

    // ===== BATELCO JORDAN =====
    ip.startsWith("2a01:4f8:c0c:") ||
    ip.startsWith("2a01:4f8:c2c:") ||

    // ===== DAMAMAX JORDAN =====
    ip.startsWith("2a05:dfc1:2000:")||
    ip.startsWith("2a05:dfc1:2100:")||
    ip.startsWith("2a05:dfc1:2200:")||
    ip.startsWith("2a05:dfc1:2300:")||

    // ===== PETRA NET JORDAN =====
    ip.startsWith("2001:df7:8800:") ||
    ip.startsWith("2001:df7:8900:") ||
    ip.startsWith("2001:df7:9000:") ||

    // ===== JORDAN DATA COM =====
    ip.startsWith("2a0a:e5c0:0:2:") ||
    ip.startsWith("2a0a:e5c0:0:3:") ||
    ip.startsWith("2a0a:e5c0:0:4:") ||

    // ===== VTEL JORDAN =====
    ip.startsWith("2a0d:5600:30:")  ||
    ip.startsWith("2a0d:5600:31:")  ||
    ip.startsWith("2a0d:5600:32:")  ||
    ip.startsWith("2a0d:5600:33:")  ||

    // ===== JORDAN UNIVERSITY NETWORKS =====
    ip.startsWith("2001:df2:e800:") ||
    ip.startsWith("2001:df2:e900:") ||

    // ===== ADDITIONAL JORDAN RANGES =====
    ip.startsWith("2a0b:f4c1:2:")   ||
    ip.startsWith("2a0b:f4c1:3:")   ||
    ip.startsWith("2a0c:b641:700:") ||
    ip.startsWith("2a0c:b641:800:") ||
    ip.startsWith("2a0c:b641:900:")
  );
}

function isJordanIPv4(ip) {
  // نطاقات IPv4 الأردنية الرئيسية
  return (
    // ZAIN Jordan
    ip.startsWith("46.185.")   ||
    ip.startsWith("37.98.")    ||
    ip.startsWith("37.99.")    ||
    ip.startsWith("95.177.")   ||
    ip.startsWith("188.247.")  ||
    ip.startsWith("176.28.")   ||
    ip.startsWith("176.29.")   ||

    // Orange Jordan
    ip.startsWith("82.212.")   ||
    ip.startsWith("5.21.")     ||
    ip.startsWith("5.22.")     ||
    ip.startsWith("62.3.")     ||
    ip.startsWith("79.173.")   ||
    ip.startsWith("194.126.")  ||

    // Umniah Jordan
    ip.startsWith("109.224.")  ||
    ip.startsWith("109.225.")  ||
    ip.startsWith("109.226.")  ||
    ip.startsWith("109.227.")  ||
    ip.startsWith("185.22.212.")||
    ip.startsWith("185.22.213.")||

    // Batelco Jordan
    ip.startsWith("212.118.")  ||
    ip.startsWith("212.119.")  ||

    // Damamax Jordan
    ip.startsWith("82.178.")   ||
    ip.startsWith("82.179.")   ||

    // Jordan General Ranges
    ip.startsWith("217.144.")  ||
    ip.startsWith("217.145.")  ||
    ip.startsWith("195.229.")  ||
    ip.startsWith("195.230.")
  );
}

function isJordan(ip) {
  if (isIPv6(ip)) return isJordanIPv6(ip);
  if (isIPv4(ip)) return isJordanIPv4(ip);
  return false;
}

// ============================================================
// ========== ISP IDENTIFICATION ==========
// ============================================================

function identifyJordanISP(ip) {
  if (isIPv6(ip)) {
    var expanded = expandIPv6(ip);

    if (expanded.startsWith("2a01:9700")) return "ZAIN";
    if (
      expanded.startsWith("2a04:4e42") ||
      expanded.startsWith("2001:df0")  ||
      expanded.startsWith("2001:4d2")
    ) return "ORANGE";
    if (
      expanded.startsWith("2a02:ed")   ||
      expanded.startsWith("2a06:e881")
    ) return "UMNIAH";
    if (expanded.startsWith("2a01:4f8:c")) return "BATELCO";
    if (expanded.startsWith("2a05:dfc1")) return "DAMAMAX";
    if (expanded.startsWith("2a0d:5600")) return "VTEL";
    return "JORDAN_OTHER";
  }

  if (isIPv4(ip)) {
    if (ip.startsWith("46.185.") || ip.startsWith("37.98.")) return "ZAIN";
    if (ip.startsWith("82.212.") || ip.startsWith("5.21.")) return "ORANGE";
    if (ip.startsWith("109.224.") || ip.startsWith("109.225.")) return "UMNIAH";
    if (ip.startsWith("212.118.")) return "BATELCO";
    if (ip.startsWith("82.178.")) return "DAMAMAX";
    return "JORDAN_OTHER";
  }

  return "UNKNOWN";
}

function getISPProxy(isp) {
  if (isp === "ZAIN")    return PROXY_ZAIN;
  if (isp === "ORANGE")  return PROXY_ORANGE;
  if (isp === "UMNIAH")  return PROXY_UMNIAH;
  if (isp === "BATELCO") return PROXY_BATELCO;
  if (isp === "DAMAMAX") return PROXY_DAMAMAX;
  return PROXY_PRIMARY;
}

// ============================================================
// ========== COUNTRY BLOCK ENGINE ==========
// ============================================================

function isBlockedCountry(fullIP) {

  // ===== BLOCK SAUDI ARABIA =====
  if (
    fullIP.startsWith("2a00:1450:4") ||
    fullIP.startsWith("2001:4860:")   ||
    fullIP.startsWith("2a00:bdc0:")   ||
    fullIP.startsWith("2a00:13c0:")   ||
    fullIP.startsWith("2a00:1fa0:")   ||
    fullIP.startsWith("2001:db8:1:") ||
    fullIP.startsWith("2a0d:5987:")
  ) return true;

  // ===== BLOCK UAE =====
  if (
    fullIP.startsWith("2a00:1a60:") ||
    fullIP.startsWith("2a00:1a68:") ||
    fullIP.startsWith("2a01:3a8:")   ||
    fullIP.startsWith("2400:8900:")  ||
    fullIP.startsWith("2a09:bac2:")
  ) return true;

  // ===== BLOCK IRAN =====
  if (
    fullIP.startsWith("2a00:1b20:") ||
    fullIP.startsWith("2a01:5ec0:") ||
    fullIP.startsWith("2a03:3b40:") ||
    fullIP.startsWith("2001:4d78:") ||
    fullIP.startsWith("2001:e60:")  ||
    fullIP.startsWith("2a01:7e0:")  ||
    fullIP.startsWith("2a06:f900:") ||
    fullIP.startsWith("2a10:3780:")
  ) return true;

  // ===== BLOCK PAKISTAN =====
  if (
    fullIP.startsWith("2401:4900:") ||
    fullIP.startsWith("2407:aa20:") ||
    fullIP.startsWith("2407:aa40:") ||
    fullIP.startsWith("2407:d000:") ||
    fullIP.startsWith("2407:c800:") ||
    fullIP.startsWith("2402:4000:")
  ) return true;

  // ===== BLOCK INDIA =====
  if (
    fullIP.startsWith("2401:4900:1") ||
    fullIP.startsWith("2401:4900:2") ||
    fullIP.startsWith("2405:200:")   ||
    fullIP.startsWith("2405:201:")   ||
    fullIP.startsWith("2406:da14:") ||
    fullIP.startsWith("2406:da1c:")
  ) return true;

  // ===== BLOCK AFGHANISTAN =====
  if (
    fullIP.startsWith("2400:3c00:") ||
    fullIP.startsWith("2400:4f00:") ||
    fullIP.startsWith("2a09:2680:") ||
    fullIP.startsWith("2a09:2688:")
  ) return true;

  // ===== BLOCK IRAQ =====
  if (
    fullIP.startsWith("2a04:3540:") ||
    fullIP.startsWith("2a04:3548:") ||
    fullIP.startsWith("2001:4478:") ||
    fullIP.startsWith("2a06:8ec0:") ||
    fullIP.startsWith("2a0b:8500:") ||
    fullIP.startsWith("2a0b:8508:")
  ) return true;

  // ===== BLOCK EGYPT =====
  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:") ||
    fullIP.startsWith("2a02:a50:")  ||
    fullIP.startsWith("2001:16a0:") ||
    fullIP.startsWith("2001:16a2:")
  ) return true;

  // ===== BLOCK TURKEY =====
  if (
    fullIP.startsWith("2a00:d080:") ||
    fullIP.startsWith("2a00:d870:") ||
    fullIP.startsWith("2a02:4780:") ||
    fullIP.startsWith("2a00:1ab0:")
  ) return true;

  // ===== BLOCK RUSSIA =====
  if (
    fullIP.startsWith("2a00:1148:") ||
    fullIP.startsWith("2a00:1370:") ||
    fullIP.startsWith("2a01:4f8:c0:") ||
    fullIP.startsWith("2a0c:b641:60:") ||
    fullIP.startsWith("2a02:6b8:")
  ) return true;

  // ===== BLOCK CHINA =====
  if (
    fullIP.startsWith("2400:3200:") ||
    fullIP.startsWith("2400:da00:") ||
    fullIP.startsWith("2001:db8:")  ||
    fullIP.startsWith("2402:4e00:") ||
    fullIP.startsWith("240e:")
  ) return true;

  // ===== BLOCK LIBYA =====
  if (
    fullIP.startsWith("2c0f:f248:") ||
    fullIP.startsWith("2c0f:f7c0:") ||
    fullIP.startsWith("2a09:7c40:") ||
    fullIP.startsWith("2a09:7c48:")
  ) return true;

  // ===== BLOCK YEMEN =====
  if (
    fullIP.startsWith("2a02:ed8:c400:") ||
    fullIP.startsWith("2a0d:5e40:")     ||
    fullIP.startsWith("2a0d:5e48:")
  ) return true;

  // ===== BLOCK SYRIA =====
  if (
    fullIP.startsWith("2a02:ed8:c300:") ||
    fullIP.startsWith("2a05:b400:")     ||
    fullIP.startsWith("2a0d:a240:")
  ) return true;

  return false;
}

// ============================================================
// ========== PUBG DETECTION ENGINE ==========
// ============================================================

function isPUBGHost(h) {
  return /pubg|tencent|krafton|lightspeed|levelinfinite|battlegrounds/i.test(h);
}

function isPUBGNetwork(h, u) {
  var combined = (h + u).toLowerCase();
  return (
    /pubg|tencent|krafton|lightspeed|levelinfinite|battlegrounds/.test(combined) ||
    /gamesvr|gameserver|matchsvr|lobbysvr|authsvr/.test(combined) ||
    /sgp\.pubg|sea\.pubg|me\.pubg|krjp\.pubg/.test(combined) ||
    /pubgmobile|sgame|proxymatch/.test(combined)
  );
}

function isLobbyRequest(data) {
  return /lobby|login|auth|session|gateway|region|matchmaking|queue|profile|inventory|store|shop|catalog|news|event|mission|reward|mail|friends|clan|chat|voice|party|team|config|settings|update|patch|cdn|asset|download|social|rank|leaderboard|account|badge|achievement|season|pass|token|verify|connect|handshake|init|bootstrap|heartbeat/i.test(data);
}

function isMatchRequest(data) {
  return /match|battle|classic|ranked|unranked|competitive|arena|tdm|teamdeathmatch|gungame|domination|assault|payload|metro|metroroyale|zombie|infection|evoground|ultimate|royale|war|sniper|quickmatch|arcade|clash|gunfight|ingame|gamesvr|relay|realtime|spectate|observer|combat|survival|lifeserver|playsvr|gamestate|syncdata|tickrate/i.test(data);
}

// ============================================================
// ========== PING OPTIMIZATION ==========
// ============================================================

function selectBestProxy(isp, retryCount) {
  // تحديد أفضل بروكسي بناءً على ISP وعدد المحاولات
  var baseProxy = getISPProxy(isp);

  if (retryCount === 0) return baseProxy;
  if (retryCount === 1) return PROXY_SECONDARY;
  if (retryCount === 2) return PROXY_TERTIARY;

  // إعادة ضبط وتجربة من الأول
  SESSION.retryCount = 0;
  return baseProxy;
}

function resetSession() {
  SESSION.ispNet       = null;
  SESSION.lobbyNet     = null;
  SESSION.matchNet     = null;
  SESSION.inMatch      = false;
  SESSION.retryCount   = 0;
  SESSION.lastISP      = null;
  SESSION.pingOptLevel = 0;
}

// ============================================================
// ========== MAIN PROXY FUNCTION ==========
// ============================================================

function FindProxyForURL(url, host) {

  // --- تجاهل الهوستات المحلية ---
  if (isPlainHostName(host))           return DIRECT;
  if (host === "localhost")            return DIRECT;
  if (host.startsWith("192.168."))    return DIRECT;
  if (host.startsWith("10."))         return DIRECT;
  if (host.startsWith("172.16."))     return DIRECT;

  // --- فلترة PUBG فقط ---
  if (!isPUBGNetwork(host, url))      return DIRECT;

  // --- DNS Resolve ---
  var ip = "";
  try {
    ip = dnsResolve(host);
    if (!ip) {
      // محاولة DNS ثانية
      try { ip = dnsResolveEx(host); } catch(e2) { ip = ""; }
    }
  } catch(e) { ip = ""; }

  // --- بلوك إذا لم يتم حل الـ DNS ---
  if (!ip) return BLOCK;

  // --- التحقق من IPv4 أو IPv6 ---
  var isV6 = isIPv6(ip);
  var isV4 = isIPv4(ip);

  if (!isV6 && !isV4) return BLOCK;

  // --- توسيع IPv6 ---
  var fullIP = isV6 ? expandIPv6(ip) : ip;

  // --- فحص الدول المحظورة ---
  if (isBlockedCountry(fullIP)) return BLOCK;

  // --- التحقق من الأردن فقط ---
  if (!isJordan(ip)) return BLOCK;

  // --- تحديد ISP الأردني ---
  var currentISP = identifyJordanISP(ip);

  // --- استخراج الشبكات ---
  var segments;
  if (isV6) {
    segments = fullIP.split(":");
  } else {
    segments = ip.split(".");
  }

  var isp2 = isV6
    ? segments.slice(0, 3).join(":")
    : segments.slice(0, 2).join(".");

  var net3 = isV6
    ? segments.slice(0, 3).join(":")
    : segments.slice(0, 3).join(".");

  var net4 = isV6
    ? segments.slice(0, 4).join(":")
    : segments.slice(0, 4).join(".");

  // --- تحليل نوع الطلب ---
  var data    = (host + url).toLowerCase();
  var isLobby = isLobbyRequest(data);
  var isMatch = isMatchRequest(data);

  // --- إعادة ضبط إذا خرجنا من المباراة ---
  if (!isMatch && SESSION.inMatch) {
    SESSION.matchNet = null;
    SESSION.inMatch  = false;
    SESSION.retryCount++;
  }

  // --- تحديد البروكسي الأمثل ---
  var bestProxy = selectBestProxy(currentISP, SESSION.retryCount);

  // ============================================================
  // ===== LOBBY MODE - 3 SEGMENTS =====
  // ============================================================
  if (isLobby) {

    // تأمين ISP
    if (!SESSION.ispNet) {
      SESSION.ispNet  = isp2;
      SESSION.lastISP = currentISP;
    }

    // رفض ISP مختلف
    if (isp2 !== SESSION.ispNet) return BLOCK;

    // تأمين الشبكة
    if (!SESSION.lobbyNet) {
      SESSION.lobbyNet     = net3;
      SESSION.pingOptLevel = 1;
    }

    // رفض شبكة مختلفة
    if (net3 !== SESSION.lobbyNet) return BLOCK;

    // زيادة اللاعبين الأردنيين - السماح بنطاق أوسع قليلاً في اللوبي
    if (SESSION.jordanBoost && isJordan(ip)) {
      SESSION.playerCount++;
      return bestProxy;
    }

    return bestProxy;
  }

  // ============================================================
  // ===== MATCH MODE - 4 SEGMENTS =====
  // ============================================================
  if (isMatch) {

    if (!SESSION.matchNet) {

      // تأمين ISP
      if (!SESSION.ispNet) {
        SESSION.ispNet  = isp2;
        SESSION.lastISP = currentISP;
      }

      // رفض ISP مختلف
      if (isp2 !== SESSION.ispNet) return BLOCK;

      // قفل الشبكة للمباراة بـ 4 سيقمنت
      SESSION.matchNet     = net4;
      SESSION.inMatch      = true;
      SESSION.pingOptLevel = 2;
      SESSION.retryCount   = 0;

      return bestProxy;
    }

    // التحقق الصارم خلال المباراة
    if (isp2 !== SESSION.ispNet) return BLOCK;
    if (net4 !== SESSION.matchNet) {

      // محاولة إعادة الاتصال تلقائياً
      if (SESSION.retryCount < 3) {
        SESSION.retryCount++;
        SESSION.matchNet = net4; // تحديث الشبكة
        return PROXY_SECONDARY;
      }

      return BLOCK;
    }

    return bestProxy;
  }

  // ============================================================
  // ===== GENERAL PUBG TRAFFIC =====
  // ============================================================

  // حركة PUBG العامة - السماح للاردنيين فقط
  if (isJordan(ip)) {
    return bestProxy;
  }

  return BLOCK;
}
// ============================================================
// END OF SCRIPT - PUBG ULTIMATE JORDAN LOCK v5.0
// ============================================================
