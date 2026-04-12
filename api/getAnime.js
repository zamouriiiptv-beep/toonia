/**
 * Toonia – api/getAnime.js
 * Vercel Serverless Function
 * Usage: /api/getAnime?id=101
 */

export default function handler(req, res) {

  // ── CORS Headers ──────────────────────────────────────────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  // ── قراءة الـ id ──────────────────────────────────────────────
  const id = parseInt(req.query.id) || 101;

  // ── بناء السيرفرات ────────────────────────────────────────────
  function buildServers(slug, epNum) {
    return {
      "1": `https://uqload.is/embed-${slug}-ep${epNum}.html`,
      "2": `https://streamtape.com/e/${slug}-ep${epNum}/`,
      "3": `https://myvidplay.com/e/${slug}-ep${epNum}`,
    };
  }

  // ── بناء الحلقات ──────────────────────────────────────────────
  function buildEpisodes(slug, count, titles, baseDuration = 23) {
    const episodes = [];
    for (let i = 1; i <= count; i++) {
      episodes.push({
        num: i,
        title: `الحلقة ${i}: ${titles[(i - 1) % titles.length]}`,
        duration: `${baseDuration + ((i % 3) - 1)} دقيقة`,
        servers: buildServers(slug, i),
      });
    }
    return episodes;
  }

  // ── عناوين الحلقات ────────────────────────────────────────────
  const aotTitles = ["البداية","الجدار","الهجوم","الثأر","الحقيقة","المعركة","الانتقام","النهاية","الوحش","التضحية","الحرية","الأمل"];
  const narTitles = ["العودة","الطريق","التحالف","الصراع","الخطر","الظلام","النور","القوة","الإرادة","الصمود","الانتصار","السلام"];
  const oneTitles = ["البحر","الكنز","المعركة","الرفاق","الخطر","الجزيرة","الفجر","الملك","الحلم","العالم","الأسطورة","المستقبل"];
  const dsTitles  = ["اللهب","الشيطان","الإرادة","الوادي","التدريب","النهر","الجبل","القمر","النجم","الرياح","الرعد","الفجر"];
  const hhTitles  = ["الصياد","الامتحان","التحدي","المتاهة","العدو","الجائزة","الخطة","الاتحاد","الهجوم","الدفاع","القرار","الغاية"];

  // ── قاعدة البيانات ────────────────────────────────────────────
  const animeDB = {

    101: {
      id: 101,
      title: "Attack on Titan",
      description: "في عالم تحكمه عمالقة الأكل للبشر، يقرر إيرين يجر الانتقام بعد أن تهاجم العمالقة مدينته. قصة ملحمية عن الحرية، الحرب، والبقاء.",
      rating: "9.8",
      year: "2013",
      epCount: 87,
      lang: "مدبلج عربي",
      tags: ["أكشن", "فانتازيا مظلمة", "دراما", "إثارة"],
      emoji: "🏰",
      episodes: buildEpisodes("aot", 87, aotTitles, 24),
    },

    102: {
      id: 102,
      title: "Naruto Shippuden",
      description: "ناروتو أوزوماكي يواصل رحلته نحو حلمه ليصبح هوكاجي بينما يواجه تهديدات تطال العالم بأسره.",
      rating: "9.3",
      year: "2007",
      epCount: 500,
      lang: "مدبلج عربي",
      tags: ["أكشن", "نينجا", "مغامرات", "صداقة"],
      emoji: "🍥",
      episodes: buildEpisodes("naruto", 30, narTitles, 23),
    },

    103: {
      id: 103,
      title: "One Piece",
      description: "مونكي دي لوفي يبحر مع رفاقه بحثاً عن الكنز الأعظم One Piece ليصبح ملك القراصنة.",
      rating: "9.2",
      year: "1999",
      epCount: 1100,
      lang: "مدبلج عربي",
      tags: ["مغامرة", "أكشن", "كوميدي", "خيال"],
      emoji: "🏴‍☠️",
      episodes: buildEpisodes("onepiece", 30, oneTitles, 22),
    },

    104: {
      id: 104,
      title: "Demon Slayer",
      description: "تانجيرو كاميادو يصبح قاتل شياطين انتقاماً لعائلته ولإنقاذ أخته التي تحولت إلى شيطان.",
      rating: "9.5",
      year: "2019",
      epCount: 55,
      lang: "مدبلج عربي",
      tags: ["أكشن", "خيال", "دراما"],
      emoji: "⚔️",
      episodes: buildEpisodes("demonslayer", 55, dsTitles, 23),
    },

    105: {
      id: 105,
      title: "Hunter x Hunter",
      description: "غون فريكس يسعى لأن يصبح صياداً مثل والده الغامض، في رحلة مليئة بالأخطار والصداقات.",
      rating: "9.5",
      year: "2011",
      epCount: 148,
      lang: "مدبلج عربي",
      tags: ["أكشن", "مغامرة", "فانتازيا", "نفسي"],
      emoji: "🎯",
      episodes: buildEpisodes("hxh", 30, hhTitles, 23),
    },

  };

  // ── الرد ──────────────────────────────────────────────────────
  if (animeDB[id]) {
    return res.status(200).json({
      status: "success",
      data: animeDB[id],
    });
  }

  return res.status(404).json({
    status: "error",
    message: `لم يتم العثور على الأنيمي بالـ id: ${id}`,
  });
}
