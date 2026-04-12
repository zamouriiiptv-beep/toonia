export default function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  const id = parseInt(req.query.id) || 101;

  // دالة بناء السيرفرات للأكواد اليدوية
  function buildServers(codes = {}) {
    const servers = {};
    if (codes.uq) servers["1"] = `https://uqload.is/embed-${codes.uq}.html`;
    if (codes.st) servers["2"] = `https://streamtape.com/e/${codes.st}/`;
    if (codes.mv) servers["3"] = `https://myvidplay.com/e/${codes.mv}`;
    return servers;
  }

  // نظام الحلقات الاحتياطي (Auto)
  function buildAutoEpisodes(slug, count, titles, baseDuration = 23) {
    const episodes = [];
    for (let i = 1; i <= count; i++) {
      episodes.push({
        num: i,
        title: `الحلقة ${i}: ${titles[(i - 1) % titles.length] || "مغامرة جديدة"}`,
        duration: `${baseDuration} دقيقة`,
        servers: buildServers({
          uq: `${slug}-ep${i}`,
          st: `${slug}-ep${i}`,
          mv: `${slug}-ep${i}`,
        }),
      });
    }
    return episodes;
  }

  const aotTitles = ["البداية", "الجدار", "الهجوم"];

  const animeDB = {
    // 101: Attack on Titan
    101: {
      id: 101,
      title: "Attack on Titan",
      description: "في عالم تحكمه العمالقة، يسعى إيرين ييغر للانتقام واستعادة حرية البشرية.",
      rating: "9.8",
      year: "2013",
      epCount: 87,
      lang: "مدبلج عربي",
      tags: ["أكشن", "خيال"],
      emoji: "🏰",
      episodes: buildAutoEpisodes("aot", 12, aotTitles),
    },

    // 106: أنمي البطل خماسي - النسخة المصلحة
    106: {
      id: 106,
      title: "البطل خماسي",
      description: "خمسة شباب يتحدون بمركباتهم لتشكيل الروبوت العملاق خماسي لحماية الأرض.",
      rating: "8.5",
      year: "1976",
      epCount: 54,
      lang: "مدبلج عربي",
      tags: ["ميكا", "أكشن", "كلاسيك"],
      emoji: "🤖",
      episodes: [
        /* الحلقة 1: تم تصحيح كود Streamtape هنا ليعمل المشغل ✅ */
        { 
          num: 1, 
          title: "الحلقة 1: البطل خماسي", 
          duration: "24 دقيقة", 
          servers: buildServers({ 
            uq: "133ubxsynlut", 
            st: "r8eo6kQBDJT8Ao", 
            mv: "sa0syyd9a4nl" 
          }) 
        },
        /* أضف الحلقة 2 هنا لاحقاً بنفس الطريقة */
      ],
    }
  };

  // التحقق من وجود الأنمي في قاعدة البيانات
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
