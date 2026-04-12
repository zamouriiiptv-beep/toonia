export default function handler(req, res) {
  const id = parseInt(req.query.id) || 101;

  function buildServers(slug, epNum) {
    return {
      "1": `https://uqload.is/embed-${slug}-ep${epNum}.html`,
      "2": `https://streamtape.com/e/${slug}-ep${epNum}/`,
      "3": `https://myvidplay.com/e/${slug}-ep${epNum}`,
    };
  }

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

  const aotTitles = ["البداية","الجدار","الهجوم","الثأر","الحقيقة","المعركة"];
  const narTitles = ["العودة","الطريق","التحالف","الصراع","الخطر","النور"];
  const oneTitles = ["البحر","الكنز","المعركة","الرفاق","الخطر","الجزيرة"];

  const animeDB = {
    101: {
      id: 101,
      title: "Attack on Titan",
      description: "قصة إيرين والعمالقة في عالم مليء بالصراع والحرية.",
      rating: "9.8",
      year: "2013",
      epCount: 87,
      lang: "مدبلج عربي",
      tags: ["أكشن", "دراما", "فانتازيا"],
      emoji: "🏰",
      episodes: buildEpisodes("aot", 10, aotTitles),
    },

    102: {
      id: 102,
      title: "Naruto Shippuden",
      description: "رحلة ناروتو ليصبح هوكاجي.",
      rating: "9.3",
      year: "2007",
      epCount: 500,
      lang: "مدبلج عربي",
      tags: ["نينجا", "أكشن"],
      emoji: "🍥",
      episodes: buildEpisodes("naruto", 10, narTitles),
    },

    103: {
      id: 103,
      title: "One Piece",
      description: "لوفي يبحث عن كنز ون بيس.",
      rating: "9.2",
      year: "1999",
      epCount: 1100,
      lang: "مدبلج عربي",
      tags: ["مغامرة"],
      emoji: "🏴‍☠️",
      episodes: buildEpisodes("onepiece", 10, oneTitles),
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
    message: `Anime not found: ${id}`,
  });
}