export default function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  const id = parseInt(req.query.id) || 101;

  // دالة بناء السيرفرات للأكواد اليدوية فقط
  function buildServers(codes = {}) {
    const servers = {};
    if (codes.uq) servers["1"] = `https://uqload.is/embed-${codes.uq}.html`;
    if (codes.st) servers["2"] = `https://streamtape.com/e/${codes.st}/`;
    if (codes.mv) servers["3"] = `https://myvidplay.com/e/${codes.mv}`;
    return servers;
  }

  const animeDB = {
    // ✅ 101: Attack on Titan — حلقات يدوية (أضف الأكواد الحقيقية لاحقاً)
    101: {
      id: 101,
      title: "Attack on Titan",
      description: "في عالم تحكمه العمالقة، يسعى إيرين ييغر للانتقام واستعادة حرية البشرية.",
      rating: "9.8",
      year: "2013",
      // ✅ إصلاح: epCount يطابق عدد الحلقات الفعلية المدخلة
      epCount: 1,
      lang: "مدبلج عربي",
      tags: ["أكشن", "خيال"],
      emoji: "🏰",
      episodes: [
        // أضف الحلقات هنا بأكواد حقيقية — مثال:
        // { num: 1, title: "الحلقة 1: للبشرية", duration: "24 دقيقة", servers: buildServers({ uq: "XXXX", st: "YYYY", mv: "ZZZZ" }) },
        {
          num: 1,
          title: "الحلقة 1: للبشرية",
          duration: "24 دقيقة",
          servers: buildServers({
            uq: "REPLACE_WITH_REAL_CODE",
            st: "REPLACE_WITH_REAL_CODE",
            mv: "REPLACE_WITH_REAL_CODE",
          }),
        },
      ],
    },

    // ✅ 106: البطل خماسي — نسخة مصلحة
    106: {
      id: 106,
      title: "البطل خماسي",
      description: "خمسة شباب يتحدون بمركباتهم لتشكيل الروبوت العملاق خماسي لحماية الأرض.",
      rating: "8.5",
      year: "1976",
      // ✅ إصلاح: epCount يطابق عدد الحلقات الفعلية (1 حلقة مدخلة حالياً)
      epCount: 1,
      lang: "مدبلج عربي",
      tags: ["ميكا", "أكشن", "كلاسيك"],
      emoji: "🤖",
      episodes: [
        {
          num: 1,
          title: "الحلقة 1: البطل خماسي",
          duration: "24 دقيقة",
          // ✅ الأكواد الحقيقية المصلحة
          servers: buildServers({
            uq: "133ubxsynlut",
            st: "r8eo6kQBDJT8Ao",
            mv: "sa0syyd9a4nl",
          }),
        },
        // أضف الحلقة 2 هنا بنفس الطريقة عند توفر الأكواد:
        // { num: 2, title: "الحلقة 2: ...", duration: "24 دقيقة", servers: buildServers({ uq: "...", st: "...", mv: "..." }) },
      ],
    },
  };

  if (animeDB[id]) {
    return res.status(200).json({
      status: "success",
      data: animeDB[id],
    });
  }

  return res.status(404).json({
    status: "error",
    message: "الأنمي غير موجود",
  });
}
