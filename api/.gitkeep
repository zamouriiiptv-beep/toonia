<?php
/**
 * Toonia – API
 * File: api/getAnime.php
 * Usage: getAnime.php?id=101
 */

// ── Headers ──────────────────────────────────────────────────────────────────
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");   // السماح بالطلبات من أي نطاق (CORS)
header("Access-Control-Allow-Methods: GET");

// ── قراءة الـ id (افتراضي: 101) ──────────────────────────────────────────────
$id = isset($_GET["id"]) ? intval($_GET["id"]) : 101;

// ── دالة لبناء سيرفرات حلقة ──────────────────────────────────────────────────
function buildServers(string $slug, int $epNum): array {
    return [
        "1" => "https://uqload.is/embed-{$slug}-ep{$epNum}.html",
        "2" => "https://streamtape.com/e/{$slug}-ep{$epNum}/",
        "3" => "https://myvidplay.com/e/{$slug}-ep{$epNum}",
    ];
}

// ── دالة لبناء مصفوفة الحلقات ────────────────────────────────────────────────
function buildEpisodes(string $slug, int $count, array $titles, int $baseDuration = 23): array {
    $episodes = [];
    for ($i = 1; $i <= $count; $i++) {
        $episodes[] = [
            "num"      => $i,
            "title"    => "الحلقة {$i}: " . $titles[($i - 1) % count($titles)],
            "duration" => ($baseDuration + (($i % 3) - 1)) . " دقيقة",
            "servers"  => buildServers($slug, $i),
        ];
    }
    return $episodes;
}

// ── بيانات الأنيمي ───────────────────────────────────────────────────────────
$aotTitles = ["البداية","الجدار","الهجوم","الثأر","الحقيقة","المعركة","الانتقام","النهاية","الوحش","التضحية","الحرية","الأمل"];
$narTitles = ["العودة","الطريق","التحالف","الصراع","الخطر","الظلام","النور","القوة","الإرادة","الصمود","الانتصار","السلام"];
$oneTitles = ["البحر","الكنز","المعركة","الرفاق","الخطر","الجزيرة","الفجر","الملك","الحلم","العالم","الأسطورة","المستقبل"];
$dsTitles  = ["اللهب","الشيطان","الإرادة","الوادي","التدريب","النهر","الجبل","القمر","النجم","الرياح","الرعد","الفجر"];
$hhTitles  = ["الصياد","الامتحان","التحدي","المتاهة","العدو","الجائزة","الخطة","الاتحاد","الهجوم","الدفاع","القرار","الغاية"];

$animeDB = [

    // ── 101: Attack on Titan ─────────────────────────────────────────────────
    101 => [
        "id"          => 101,
        "title"       => "Attack on Titan",
        "description" => "في عالم تحكمه عمالقة الأكل للبشر، يقرر إيرين يجر الانتقام بعد أن تهاجم العمالقة مدينته. قصة ملحمية عن الحرية، الحرب، والبقاء.",
        "rating"      => "9.8",
        "year"        => "2013",
        "epCount"     => 87,
        "lang"        => "مدبلج عربي",
        "tags"        => ["أكشن", "فانتازيا مظلمة", "دراما", "إثارة"],
        "emoji"       => "🏰",
        "badge"       => "VIP",
        "episodes"    => buildEpisodes("aot", 87, $aotTitles, 24),
    ],

    // ── 102: Naruto Shippuden ────────────────────────────────────────────────
    102 => [
        "id"          => 102,
        "title"       => "Naruto Shippuden",
        "description" => "ناروتو أوزوماكي يواصل رحلته نحو حلمه ليصبح هوكاجي بينما يواجه تهديدات تطال العالم بأسره.",
        "rating"      => "9.3",
        "year"        => "2007",
        "epCount"     => 500,
        "lang"        => "مدبلج عربي",
        "tags"        => ["أكشن", "نينجا", "مغامرات", "صداقة"],
        "emoji"       => "🍥",
        "badge"       => "FREE",
        "episodes"    => buildEpisodes("naruto", 30, $narTitles, 23),
    ],

    // ── 103: One Piece ───────────────────────────────────────────────────────
    103 => [
        "id"          => 103,
        "title"       => "One Piece",
        "description" => "مونكي دي لوفي يبحر مع رفاقه بحثاً عن الكنز الأعظم One Piece ليصبح ملك القراصنة.",
        "rating"      => "9.2",
        "year"        => "1999",
        "epCount"     => 1100,
        "lang"        => "مدبلج عربي",
        "tags"        => ["مغامرة", "أكشن", "كوميدي", "خيال"],
        "emoji"       => "🏴‍☠️",
        "badge"       => "FREE",
        "episodes"    => buildEpisodes("onepiece", 30, $oneTitles, 22),
    ],

    // ── 104: Demon Slayer ────────────────────────────────────────────────────
    104 => [
        "id"          => 104,
        "title"       => "Demon Slayer",
        "description" => "تانجيرو كاميادو يصبح قاتل شياطين انتقاماً لعائلته ولإنقاذ أخته التي تحولت إلى شيطان.",
        "rating"      => "9.5",
        "year"        => "2019",
        "epCount"     => 55,
        "lang"        => "مدبلج عربي",
        "tags"        => ["أكشن", "خيال", "دراما", "رومانسي"],
        "emoji"       => "⚔️",
        "badge"       => "NEW",
        "episodes"    => buildEpisodes("demonslayer", 55, $dsTitles, 23),
    ],

    // ── 105: Hunter x Hunter ─────────────────────────────────────────────────
    105 => [
        "id"          => 105,
        "title"       => "Hunter x Hunter",
        "description" => "غون فريكس يسعى لأن يصبح صياداً مثل والده الغامض، في رحلة مليئة بالأخطار والصداقات.",
        "rating"      => "9.5",
        "year"        => "2011",
        "epCount"     => 148,
        "lang"        => "مدبلج عربي",
        "tags"        => ["أكشن", "مغامرة", "فانتازيا", "نفسي"],
        "emoji"       => "🎯",
        "badge"       => "FREE",
        "episodes"    => buildEpisodes("hxh", 30, $hhTitles, 23),
    ],

];

// ── البحث وإرجاع النتيجة ─────────────────────────────────────────────────────
if (array_key_exists($id, $animeDB)) {
    echo json_encode(
        ["status" => "success", "data" => $animeDB[$id]],
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );
} else {
    http_response_code(404);
    echo json_encode(
        ["status" => "error", "message" => "لم يتم العثور على الأنيمي بالـ id: {$id}"],
        JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
    );
}