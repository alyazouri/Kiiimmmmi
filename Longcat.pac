# 🎮 PUBG Mobile - Jordan BOOST v8.0 (كامل)

```javascript
// ================================================================
//  🎮 PUBG Mobile - Jordan Players BOOST
//  🇯🇴 النسخة النهائية - محسّنة بالكامل
//  Version: 8.0 Ultimate
// ================================================================
//
//  📡 DNS الأسرع: 46.185.143.103 (15ms)
//  🌐 Proxy لوبي: 46.185.143.103:80
//  ⚔️ Proxy مباريات: 91.106.105.13:80
//
// ================================================================

// ═══════════════════════════════════════════════════════════════
//  ① الإعدادات الرئيسية - ⚙️ غيّر هنا فقط
// ═══════════════════════════════════════════════════════════════

// ⭐ أفضل Proxy (من فحص DNS)
var PROXY_LOBBY_IP   = "46.185.143.103";   // لوبي - أسرع
var PROXY_MATCH_IP   = "46.185.143.103";    // مباريات
var PROXY_FALLBACK   = "176.29.176.134";   // احتياطي

// 🔌 المنافذ
var PROXY_PORT       = "80";              // HTTP
// var PROXY_PORT     = "20003";          // لو SOCKS5
// var MATCH_PORT     = "20001";          // لو SOCKS5

// 🔧 نوع البروتوكول
var PROXY_TYPE       = "HTTP";            // HTTP أو SOCKS5
// var PROXY_TYPE    = "SOCKS5";

// ═══════════════════════════════════════════════════════════════
//  بناء الأوامر
// ═══════════════════════════════════════════════════════════════
var LOB = PROXY_TYPE + " " + PROXY_LOBBY_IP + ":" + PROXY_PORT;
var MAT = PROXY_TYPE + " " + PROXY_MATCH_IP + ":" + PROXY_PORT;
var FBK = PROXY_TYPE + " " + PROXY_FALLBACK + ":" + PROXY_PORT;
var DIR = "DIRECT";
var BLK = PROXY_TYPE + " 0.0.0.0:0";

// ═══════════════════════════════════════════════════════════════
//  ② نطاقات IP الأردنية (موسعة)
// ═══════════════════════════════════════════════════════════════

// 📡 IPv4 - جميع مشغلي الأردن
var JO4 = [
    // 🔵 Zain Jordan
    "37.208.0.0/13",
    "78.100.0.0/15",
    "212.34.64.0/18",
    "212.34.96.0/19",
    "185.45.36.0/22",
    "188.225.128.0/17",
    
    // 🟡 Umniah
    "46.32.0.0/16",
    "78.42.0.0/16",
    "94.24.0.0/16",
    "185.18.108.0/22",
    "188.228.0.0/17",
    
    // 🟠 Orange Jordan
    "212.34.0.0/19",
    "37.35.0.0/16",
    "78.40.0.0/16",
    "78.158.0.0/15",
    "82.212.0.0/14",
    "86.108.0.0/15",
    "91.141.0.0/16",
    "176.29.0.0/16",
    "185.33.12.0/22",
    "185.88.140.0/22",
    "188.247.64.0/18",
    
    // ⚪ HostMasters / DataSpeed
    "46.185.128.0/17",
    "91.106.96.0/20",
    
    // 🟢 ITGate
    "42.136.0.0/16",
    "185.84.100.0/22",
    
    // 🔴 Neotel
    "45.9.220.0/22",
    "185.112.24.0/22",
    
    // 📌 إضافات
    "79.173.192.0/18",
    "41.184.0.0/16",
    "41.234.0.0/16",
    "95.141.240.0/21",
    "185.51.24.0/22",
    "185.100.52.0/22",
    "185.103.92.0/22",
    "195.191.100.0/22"
];

// 📡 IPv6
var JO6 = [
    "2a00:8c00::/32",
    "2a02:f040::/32",
    "2a01:100::/32",
    "2a05:580::/32",
    "2a02:f60::/32",
    "2a0d:4800::/32",
    "2001:67c:1d8::/48",
    "2a02:c10::/32"
];

// ═══════════════════════════════════════════════════════════════
//  ③ IP سيرفرات PUBG (Tencent)
// ═══════════════════════════════════════════════════════════════

var MS4 = [
    "49.51.0.0/16",
    "43.154.0.0/15",
    "43.134.0.0/16",
    "101.32.0.0/14",
    "101.36.0.0/14",
    "101.33.0.0/16",
    "119.28.0.0/16",
    "119.29.0.0/16",
    "150.109.0.0/16",
    "129.226.0.0/16",
    "129.204.0.0/16",
    "203.205.0.0/16",
    "118.89.0.0/16",
    "118.126.0.0/16",
    "81.68.0.0/16",
    "13.248.0.0/14",
    "15.177.0.0/16",
    "99.82.0.0/16",
    "15.230.0.0/16",
    "52.95.0.0/16"
];

var MS6 = [
    "2402:4e00::/32",
    "2406:da00::/32",
    "2406:d200::/32",
    "2600:1f00::/24"
];

// ═══════════════════════════════════════════════════════════════
//  ④ قوائم الدومينات
// ═══════════════════════════════════════════════════════════════

// 🔊 صوت + حماية → DIRECT (بدون تأخير)
var D_VOICE = [
    "*.voice.pubgmobile.com",
    "*.voip.pubgmobile.com",
    "*.rtc.pubgmobile.com",
    "*.audio.pubgmobile.com",
    "*.media.pubgmobile.com",
    "*.trtc.tencentcloud.com",
    "*.tim.qq.com",
    "*.ims.qq.com"
];

var D_SECURITY = [
    "*.security.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "*.guard.pubgmobile.com",
    "*.safe.pubgmobile.com",
    "*.protect.pubgmobile.com",
    "*.shield.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "*.scan.pubgmobile.com",
    "*.device.pubgmobile.com",
    "*.deviceid.pubgmobile.com",
    "*.fingerprint.pubgmobile.com",
    "*.kernel.pubgmobile.com",
    "*.audit.pubgmobile.com",
    "*.detect.pubgmobile.com"
];

var D_REPORT = [
    "*.beacon.qq.com",
    "*.report.qq.com",
    "*.report.pubgmobile.com",
    "*.telemetry.pubgmobile.com",
    "*.analytics.pubgmobile.com",
    "*.stats.pubgmobile.com",
    "*.metrics.pubgmobile.com",
    "*.track.pubgmobile.com",
    "*.log.pubgmobile.com",
    "*.monitor.pubgmobile.com",
    "*.ping.pubgmobile.com",
    "*.feedback.pubgmobile.com"
];

// 🎮 مباريات → Proxy مباريات
var D_MATCH = [
    // سيرفرات
    "*.match.pubgmobile.com",
    "*.game.pubgmobile.com",
    "*.gameserver.pubgmobile.com",
    "*.gs.pubgmobile.com",
    "*.gslb.pubgmobile.com",
    "*.dispatch.pubgmobile.com",
    "*.entry.pubgmobile.com",
    "*.connect.pubgmobile.com",
    "*.gateway.pubgmobile.com",
    "*.relay.pubgmobile.com",
    "*.session.pubgmobile.com",
    "*.region.pubgmobile.com",
    "*.netcode.pubgmobile.com",
    "*.tcp.pubgmobile.com",
    "*.udp.pubgmobile.com",
    
    // أنواع اللعب
    "*.room.pubgmobile.com",
    "*.custom.pubgmobile.com",
    "*.arena.pubgmobile.com",
    "*.tdm.pubgmobile.com",
    "*.war.pubgmobile.com",
    "*.payload.pubgmobile.com",
    "*.evoground.pubgmobile.com",
    "*.zombie.pubgmobile.com",
    "*.metro.pubgmobile.com",
    "*.infection.pubgmobile.com",
    
    // خرائط
    "*.erangel.pubgmobile.com",
    "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com",
    "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com",
    "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com",
    
    // مشاهدة
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    
    // بطولات
    "*.tournament.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "*.leaderboard.pubgmobile.com"
];

// 🏠 لوبي → Proxy لوبي
var D_LOBBY = [
    // أساسي
    "*.pubgmobile.com",
    "pubgmobile.com",
    "www.pubgmobile.com",
    "*.igamecj.com",
    "*.igame.com",
    
    // CDN + موارد
    "*.cdn.pubgmobile.com",
    "*.res.pubgmobile.com",
    "*.config.pubgmobile.com",
    "*.ui.pubgmobile.com",
    "*.api.pubgmobile.com",
    "*.proxy.pubgmobile.com",
    
    // تسجيل دخول
    "*.auth.pubgmobile.com",
    "*.login.pubgmobile.com",
    "*.account.pubgmobile.com",
    "*.oauth.pubgmobile.com",
    "*.token.pubgmobile.com",
    "*.register.pubgmobile.com",
    "*.verify.pubgmobile.com",
    "*.captcha.pubgmobile.com",
    
    // بروفايل + رتب
    "*.profile.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "*.season.pubgmobile.com",
    "*.tier.pubgmobile.com",
    "*.badge.pubgmobile.com",
    "*.title.pubgmobile.com",
    "*.achievement.pubgmobile.com",
    "*.milestone.pubgmobile.com",
    "*.progress.pubgmobile.com",
    "*.trophy.pubgmobile.com",
    "*.mission.pubgmobile.com",
    "*.task.pubgmobile.com",
    
    // متجر + دفع
    "*.shop.pubgmobile.com",
    "*.store.pubgmobile.com",
    "*.pay.pubgmobile.com",
    "*.payment.pubgmobile.com",
    "*.purchase.pubgmobile.com",
    "*.billing.pubgmobile.com",
    "*.uc.pubgmobile.com",
    "*.coin.pubgmobile.com",
    "*.diamond.pubgmobile.com",
    "*.redeem.pubgmobile.com",
    "*.coupon.pubgmobile.com",
    "*.voucher.pubgmobile.com",
    "*.promo.pubgmobile.com",
    "*.offer.pubgmobile.com",
    "*.iap.pubgmobile.com",
    "*.receipt.pubgmobile.com",
    "*.order.pubgmobile.com",
    "*.transaction.pubgmobile.com",
    "*.subscribe.pubgmobile.com",
    
    // Royal Pass
    "*.royalepass.pubgmobile.com",
    "*.rp.pubgmobile.com",
    "*.prime.pubgmobile.com",
    "*.battlepass.pubgmobile.com",
    
    // فعاليات
    "*.event.pubgmobile.com",
    "*.reward.pubgmobile.com",
    "*.crate.pubgmobile.com",
    "*.lucky.pubgmobile.com",
    "*.spin.pubgmobile.com",
    "*.gift.pubgmobile.com",
    
    // منزل + ديكور
    "*.home.pubgmobile.com",
    "*.house.pubgmobile.com",
    "*.furniture.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    "*.camp.pubgmobile.com",
    "*.visit.pubgmobile.com",
    
    // تجنيد + فريق
    "*.recruit.pubgmobile.com",
    "*.matchmaking.pubgmobile.com",
    "*.team.pubgmobile.com",
    "*.squad.pubgmobile.com",
    "*.invite.pubgmobile.com",
    "*.friend.pubgmobile.com",
    "*.friends.pubgmobile.com",
    "*.clan.pubgmobile.com",
    "*.guild.pubgmobile.com",
    "*.crew.pubgmobile.com",
    "*.group.pubgmobile.com",
    "*.community.pubgmobile.com",
    "*.block.pubgmobile.com",
    "*.follow.pubgmobile.com",
    "*.follower.pubgmobile.com",
    "*.inbox.pubgmobile.com",
    "*.mail.pubgmobile.com",
    "*.message.pubgmobile.com",
    "*.chat.pubgmobile.com",
    "*.share.pubgmobile.com",
    
    // إشعارات
    "*.push.pubgmobile.com",
    "*.notify.pubgmobile.com",
    "*.notification.pubgmobile.com",
    "*.alert.pubgmobile.com",
    "*.announce.pubgmobile.com",
    "*.news.pubgmobile.com",
    
    // تحميل
    "*.download.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "*.update.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "*.bundle.pubgmobile.com",
    "*.package.pubgmobile.com",
    "*.hotfix.pubgmobile.com",
    
    // Tencent
    "*.tencent.com",
    "*.tencentyun.com",
    "*.cloud.tencent.com",
    "*.qpic.cn",
    "*.gp.qq.com",
    "*.game.qq.com",
    "speed.game.qq.com",
    "*.gpod.qq.com",
    "*.wegame.com",
    "*.qcloud.com",
    "*.qcloudcdn.com",
    "*.tencentcloud.com",
    "*.cos.myqcloud.com",
    "*.cdn.dnsv1.com",
    
    // CDN عام
    "*.akamaized.net",
    "*.akamai.net",
    "*.cloudfront.net",
    "*.fastly.net",
    "*.myqcloud.com",
    "*.dnspod.net",
    "*.dnspod.com",
    
    // تسجيل دخول خارجي
    "*.facebook.com",
    "*.fbcdn.net",
    "*.facebook.net",
    "connect.facebook.net",
    "*.googleapis.com",
    "*.googleusercontent.com",
    "play-fe.googleapis.com",
    "*.ggpht.com",
    "accounts.google.com",
    "*.gstatic.com",
    "*.apple.com",
    "appleid.apple.com",
    "buy.itunes.apple.com",
    
    // إشعارات
    "mtalk.google.com",
    "android.clients.google.com",
    "*.fcm.googleapis.com",
    "*.gcm.googleapis.com"
];

// ═══════════════════════════════════════════════════════════════
//  ⑤ دوال مساعدة
// ═══════════════════════════════════════════════════════════════

// تحويل IP لعدد
function ipToInt(ip) {
    var p = ip.split('.');
    return ((+p[0] << 24) | (+p[1] << 16) | (+p[2] << 8) | +p[3]) >>> 0;
}

// فحص IP في نطاق CIDR
function ipInCIDR(ip, cidr) {
    var parts = cidr.split('/');
    var mask = parseInt(parts[1], 10);
    var maskVal = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
    return (ipToInt(ip) & maskVal) === (ipToInt(parts[0]) & maskVal);
}

// فحص IP في قائمة
function ipInList(ip, list) {
    for (var i = 0; i < list.length; i++) {
        if (ipInCIDR(ip, list[i])) return true;
    }
    return false;
}

// هل IP أردني؟
function isJordan(ip) {
    return ipInList(ip, JO4);
}

// هل IP سيرفر PUBG؟
function isPUBGServer(ip) {
    return ipInList(ip, MS4);
}

// فحص الدومين
function matchDomain(host, list) {
    host = host.toLowerCase();
    for (var i = 0; i < list.length; i++) {
        var pattern = list[i].toLowerCase();
        if (pattern.charAt(0) === '*') {
            var suffix = pattern.substring(2);
            if (host === suffix || (host.length > suffix.length + 1 && 
                host.substring(host.length - suffix.length - 1) === '.' + suffix)) {
                return true;
            }
        } else if (host === pattern) {
            return true;
        }
    }
    return false;
}

// ═══════════════════════════════════════════════════════════════
//  ⑥ الدالة الرئيسية ⚡
// ═══════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    var h = host.toLowerCase();
    
    // ══════════════════════════════════════
    //  ① صوت + حماية + تقارير → DIRECT
    // ══════════════════════════════════════
    if (matchDomain(h, D_VOICE)) return DIR;
    if (matchDomain(h, D_SECURITY)) return DIR;
    if (matchDomain(h, D_REPORT)) return DIR;
    
    // ══════════════════════════════════════
    //  ② المباريات → Proxy مباريات
    // ══════════════════════════════════════
    if (matchDomain(h, D_MATCH)) return MAT;
    if (isPUBGServer(host)) return MAT;
    
    // ══════════════════════════════════════
    //  ③ اللوبي + IP أردني → Proxy لوبي
    // ══════════════════════════════════════
    if (matchDomain(h, D_LOBBY)) return LOB;
    if (isJordan(host)) return LOB;
    
    // ══════════════════════════════════════
    //  ④ الباقي → DIRECT
    // ══════════════════════════════════════
    return DIR;
}

// ================================================================
//  ✅ تم - جاهز للاستخدام
// ================================================================
```

---

## 📋 طريقة الاستخدام

| الخطوة | التفاصيل |
|--------|----------|
| 1️⃣ | احفظ كـ `Jordan-Boost-v8.pac` |
| 2️⃣ | في Wi-Fi → Advanced → Proxy → PAC URL |
| 3️⃣ | اكتب: `file:///sdcard/Jordan-Boost-v8.pac` |
| 4️⃣ | ✅ ابدأ اللعب! |

---

## 🔧 تعديل سريع

| لتغيير | عدّل |
|--------|------|
| Proxy لوبي | `PROXY_LOBBY_IP = "46.185.143.103"` |
| Proxy مباريات | `PROXY_MATCH_IP = "91.106.105.13"` |
| نوع البروتوكول | `PROXY_TYPE = "HTTP"` → `"SOCKS5"` |
| المنفذ | `PROXY_PORT = "80"` → `"20003"` |

> 💡 **الأفضل حالياً**: `HTTP 46.185.143.103:80` للوبي + `HTTP 91.106.105.13:80` للمباريات ⚡
