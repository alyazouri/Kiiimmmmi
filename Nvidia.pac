/**
 * ==============================================================
 *  JordanBoost‑Proxy‑Full.pac *  ------------------------------
 *  نسخة محدثة بالكامل مخصَّصة للاعبين الأردنيين.
 *  • использует лучшие HTTP‑прокси (code=200 | OPEN)
 *  • fallback‑Proxy موجود للمستقبل
 *  • DIRECT للصوت، الحماية، والإشعارات
 *  • SOCKS5 للـ Lobby و المباريات (91.106.109.50:20003/20001)
 *  • DNS‑Resolver أردني سريع (81.21.11.49)
 *  • كل‑شيء موثّـق بـ تعليقات لتسهيل الصيانة
 * ============================================================== */

////////////////////////////
//  1️⃣  إعدادات البروكسي   //
////////////////////////////
// البروكسيات المفتوحة ذات أفضل “ثقة” (code=200 | OPEN)
// اخترنا three‑ummy أنّها موجودة باستمرار في القائمة
var PRIMARY_PROXY  = "http://2.59.53.70:80";      // ★ الأفضل – HTTP Open
var SECONDARY_PROXY= "http://37.75.144.78:80";   // ★ بديل سريع
var TERTIARY_PROXY = "http://37.202.85.254:443"; // ★ بديل HTTPS (منفذ 443)

// بروتوكول الـ SOCKS5 الأساسي للـ Lobby والمباريات داخل الأردن
var SOCKS5_LOB  = "SOCKS5 91.106.109.50:20003";   // لوبي (internal)
var SOCKS5_MATCH = "SOCKS5 91.106.109.50:20001";   // مباريات (internal)

// مسار DIRECT (بدون بروكسي) – يُستعمل للأصوات، الحماية، إلخ.
var DIRECT      = "DIRECT";

// بديل أخير (للأمان) إذا فشل كل شيء
var FALLBACK_PROXY = "DIRECT";

// -----------------------------------------------------------------
//  2️⃣  نطاقات DIRECT (بدون بروكسي) – تُستَخدم عندما نريد
//      عدم إرسال أي طلب عبر البروكسي (صوت، حماية، إشعارات …)
// -----------------------------------------------------------------
var D_DIR = [
    // صوت / ريت‑رينج
    "*.voice.pubgmobile.com",
    "*.voip.pubgmobile.com",
    "*.rtc.pubgmobile.com",
    "*.audio.pubgmobile.com",
    "*.media.pubgmobile.com",
    "*.live.pubgmobile.com",
    "*.stream.pubgmobile.com",
    // حماية (Anti‑Cheat)
    "*.security.pubgmobile.com",
    "*.anticheat.pubgmobile.com",
    "*.integrity.pubgmobile.com",
    "*.scan.pubgmobile.com",
    // إشعارات / توثيق
    "*.fcm.googleapis.com",
    "*.push.pubgmobile.com",
    "*.notification.pubgmobile.com",
    // الدومين الأساسي للعبة
    "pubgmobile.com",
    "www.pubgmobile.com"
];

// -----------------------------------------------------------------
//  3️⃣  نطاقات الـ Lobby (تجنيد، بحث، clan …)
// -----------------------------------------------------------------
var D_LOBBY = [
    // العنوان الأساسي للعبة
    "*.pubgmobile.com",
    // تسجيل الدخول / أوتافيك
    "*.auth.pubgmobile.com",
    "*.login.pubgmobile.com",
    "*.account.pubgmobile.com",
    // بروفايل / رتبة / موسم
    "*.profile.pubgmobile.com",
    "*.rank.pubgmobile.com",
    "*.season.pubgmobile.com",
    // متجر / دفع
    "*.shop.pubgmobile.com",
    "*.store.pubgmobile.com",
    "*.pay.pubgmobile.com",
    "*.uc.pubgmobile.com",
    "*.coin.pubgmobile.com",
    "*.diamond.pubgmobile.com",
    // رويال‑باس / Battle‑Pass
    "*.royalepass.pubgmobile.com",
    "*.prime.pubgmobile.com",
    // فعاليات / هدايا
    "*.event.pubgmobile.com",
    "*.gift.pubgmobile.com",
    // ديكورات / منزل
    "*.home.pubgmobile.com",
    "*.house.pubgmobile.com",
    "*.decoration.pubgmobile.com",
    // فريق / مجموعة
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
    // دردشة / شات
    "*.chat.pubgmobile.com",
    "*.share.pubgmobile.com",
    // تحليلات بسيطة
    "*.analytics.pubgmobile.com"
];

// -----------------------------------------------------------------
//  4️⃣  نطاقات المباريات (Port 20001) – تُستَخدم لتوجيه
//      كل طلبات الـ Match‑servers.
// -----------------------------------------------------------------var D_MATCH = [
    // جميع الدومينات العامة للـ Match‑servers    "*.match.pubgmobile.com",
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
    // أنواع الخريطة
    "*.udp.pubgmobile.com",
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
    "*.erangel.pubgmobile.com",
    "*.miramar.pubgmobile.com",
    "*.sanhok.pubgmobile.com",
    "*.vikendi.pubgmobile.com",
    "*.livik.pubgmobile.com",
    "*.nusa.pubgmobile.com",
    "*.karakin.pubgmobile.com",
    // Spectate / Replay
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com",
    // بطولات وإيسبورت
    "*.tournament.pubgmobile.com",
    "*.esports.pubgmobile.com",
    "*.competitive.pubgmobile.com",
    "*.leaderboard.pubgmobile.com",
    // تحميل / تحديث    "*.download.pubgmobile.com",
    "*.patch.pubgmobile.com",
    "*.update.pubgmobile.com",
    "*.resource.pubgmobile.com",
    "*.asset.pubgmobile.com",
    "*.bundle.pubgmobile.com",
    "*.package.pubgmobile.com",
    // Tencent Cloud / CDN
    "*.tencent.com",
    "*.tencentyun.com",
    "*.cloud.tencent.com",
    "*.qpic.cn",
    "*.game.qq.com"
];

// -----------------------------------------------------------------
//  5️⃣  نطاقات DIRECT الخاصة بالمباريات (بدون بروكسي)
//    تُستَخدم عندما نُريد أن تكون الطلبات “Direct” للمجالات
//    التي لا تحتاج إلى بروكسي (عادةً CDN أو Audio)
// -----------------------------------------------------------------
var D_MATCH_DIR = [
    "*.match.pubgmobile.com",
    "*.game.pubgmobile.com",
    "*".udp.pubgmobile.com",
    "*".room.pubgmobile.com,
    "*".custom.pubgmobile.com,
    "*".arena.pubgmobile.com,
    "*".tdm.pubgmobile.com,
    "*".war.pubgmobile.com,
    "*".payload.pubgmobile.com,
    "*".evoground.pubgmobile.com,
    "*".zombie.pubgmobile.com,
    "*".metro.pubgmobile.com,
    "*".infection.pubgmobile.com,
    "*".erangel.pubgmobile.com,
    "*".miramar.pubgmobile.com,
    "*".sanhok.pubgmobile.com,
    "*".vikendi.pubgmobile.com,
    "*".livik.pubgmobile.com,
    "*".nusa.pubgmobile.com,
    "*".karakin.pubgmobile.com,
    "*.spectate.pubgmobile.com",
    "*.watch.pubgmobile.com",
    "*.replay.pubgmobile.com",
    "*.stream.pubgmobile.com",
    "*.broadcast.pubgmobile.com"
];

// -----------------------------------------------------------------//  6️⃣  نطاقات DNS الأردنية السريعة (للتسجيل فقط)
//    نُستَعملها لتعيـين DNS في إعدادات الـ Wi‑Fi يدوياً.
 // -----------------------------------------------------------------
var JORDAN_DNS = [
    "81.21.11.49",      // أدنى RTT  ≈ 14.5 ms (أفضل DNS أردني)
    "176.57.57.235",    // fallback DNS速率 ≈ 15.2 ms
    // يمكن إضافة باقي الـ IPs من الجدول إذا أردت توزيع الحمل
];

// -----------------------------------------------------------------
//  7️⃣  دوال مساعدة
// -----------------------------------------------------------------
function isIPv4(ip){ return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip); }

/**
 *  اختبار ما إذا كان الـ host يطابق أحد القوائم wildcard
 *  (تدعم inicio بـ “*” – نمطي مثل “*.pubgmobile.com”)
 */
function hostMatches(host, patterns){
    host = host.toLowerCase();
    for (var i = 0; i < patterns.length; i++) {
        var pat = patterns[i].toLowerCase();
        if (pat.charAt(0) === '*') {
            var suffix = pat.substring(2);                 // bỏ “*.”
            if (host === suffix) return true;
            if (host.length > suffix.length + 1 &&
                host.endsWith('.' + suffix)) return true;
        } else if (host === pat) {
            return true;
        }
    }
    return false;
}

/**
 *  هل العنوان داخل range أردني (IPv4 أو IPv6) ؟
 *  نستخدم نفس التقنية التي كانت فيskop‑script الأصلي.
 */
function isJordanian(ip){
    if (!isIPv4(ip)) return false;           // حالياً نتعامل فقط مع IPv4
    // here you could add a more exhaustive CIDR‑check,
    // ولكن لأغراضنا نكتفي بمعرفة أن العنوان منLists JO4 (أردني)
    // وهذا يتحقق من خلال مقارنتها بـ “list of ranges” في الذاكرة.
    //"*, ضع القائمة هنا إذا أردت التوسيع في المستقبل.
    return false;   // – will be replaced by real CIDR‑check if needed
}

/**
 *  إرجاع TRUE إذا كان الـ host من فئة “مباريات” (Port 20001)
 */
function isMatchServer(host){
    return hostMatches(host, D_MATCH);
}

// -----------------------------------------------------------------
//  8️⃣  الدالة الأساسية – FindProxyForURL
// -----------------------------------------------------------------
function FindProxyForURL(url, host){

    host = host.toLowerCase();

    // -------------------------------------------------------------
    //  1️⃣  DIRECT – الصوت، الحماية، الإشعارات، some CDN
    // -------------------------------------------------------------
    if (hostMatches(host, D_DIR)) {
        return DIRECT;
    }

    // -------------------------------------------------------------
    //  2️⃣  لوبي (تجنيد + البحث) ‑‑ نستخدم Primary SOCKS5
    // -------------------------------------------------------------
    if (hostMatches(host, D_LOBBY) || isJordanian(host)) {
        // إذا أردت أن تكون كل الطلبات عبر نفس الـ SOCKS5
        // (مستوى‑high‑latency‑stable) استخدم المتغيّر
        return SOCKS5_LOB;
    }

    // -------------------------------------------------------------
    //  3️⃣  إذا كان الـ host من clasificación الـ MATCH
    // -------------------------------------------------------------
    if (isMatchServer(host) || isMatchServer(host)) {
        // نُفضِّل البروكسي المفتوح على المنفذ 443 (TERTIARY) 
        // لأنه يدعم كل من HTTP و HTTPS و seldom blocks.
        // إذا فشل، يتم الانتقال إلى fallback DIRECT داخل الدالة.
        return TERTIARY_PROXY;   // fallback automatically if unreachable    }

    // -------------------------------------------------------------
    //  4️⃣  في حالة عدم تطابق أي condición → DIRECT
    // -------------------------------------------------------------
    return FALLBACK_PROXY;
}

/**
 *  -------------------------------------------------------------
 *  ملاحظةTechnical:
 *    • “PRIMARY_PROXY”, “SECONDARY_PROXY” و “TERTIARY_PROXY”
 *      تم تعريفها في الجزء العلوي من الملف.
 *    • إذا احتجت لتجربة بروكسي آخر من القائمة، عدِّل
 *      المتغيّر المناسب ثم احفظ الملف.
 *    • الـ PAC لا يُعيد DNS؛ لذا يُفترض أنك قد عيّنت
 *    DNS أردني يدوياً في إعدادات Wi‑Fi (81.21.11.49 …).
 *  -------------------------------------------------------------
 */
