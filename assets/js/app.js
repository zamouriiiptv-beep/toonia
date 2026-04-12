/**
 * TOONIA – app.js
 * Vanilla JS – No frameworks
 * Fetch-ready architecture
 */

"use strict";

/* =============================================
   MOCK DATA
   ============================================= */

const HERO_SLIDES = [
  {
    id: 1,
    title: "Demon Slayer: Infinity Castle",
    description: "تانجيرو كاميادو يواجه أقوى أعداء الوحوش في قلعة اللانهاية في معركة لن تُنسى أبداً.",
    genre: "أنيمي · أكشن",
    episodes: "26 حلقة",
    badge: "جديد",
    color: "#e53935",
    emoji: "⚔️",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #4a0000 40%, #8b1a1a 100%)",
  },
  {
    id: 2,
    title: "One Piece: Egghead Arc",
    description: "لوفي وطاقمه يصلون إلى جزيرة المستقبل حيث العلم يلتقي بالخطر في مواجهة الحكومة العالمية.",
    genre: "أنيمي · مغامرات",
    episodes: "50 حلقة",
    badge: "مميز",
    color: "#1565C0",
    emoji: "🏴‍☠️",
    gradient: "linear-gradient(135deg, #0a0a2a 0%, #0d2952 40%, #1a5276 100%)",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen Season 3",
    description: "يوجي إيتادوري يواجه تحديات جديدة في معركة شاملة ضد أقوى الأرواح الملعونة.",
    genre: "أنيمي · فانتازيا",
    episodes: "24 حلقة",
    badge: "حصري",
    color: "#7B1FA2",
    emoji: "👁️",
    gradient: "linear-gradient(135deg, #0d001a 0%, #2d0045 40%, #5c0080 100%)",
  },
  {
    id: 4,
    title: "SpongeBob SquarePants: The Movie",
    description: "مغامرة سبونج بوب وبات ستار في رحلة ملحمية لإنقاذ بيكيني بوتوم من أشرار البحار.",
    genre: "كرتون · كوميدي",
    episodes: "فيلم",
    badge: "مجاني",
    color: "#FFC107",
    emoji: "🧽",
    gradient: "linear-gradient(135deg, #1a1400 0%, #4a3800 40%, #7a5c00 100%)",
  },
];

const TRENDING = [
  { id: 101, title: "Attack on Titan",    eps: 87,  badge: "VIP",  emoji: "🏰", palette: "placeholder-1", rating: 9.8, year: 2013 },
  { id: 102, title: "Naruto Shippuden",   eps: 500, badge: "FREE", emoji: "🍥", palette: "placeholder-2", rating: 9.3, year: 2007 },
  { id: 103, title: "Dragon Ball Super",  eps: 131, badge: "NEW",  emoji: "🐉", palette: "placeholder-3", rating: 8.7, year: 2015 },
  { id: 104, title: "My Hero Academia",   eps: 138, badge: "VIP",  emoji: "⚡", palette: "placeholder-4", rating: 8.9, year: 2016 },
  { id: 105, title: "Chainsaw Man",       eps: 12,  badge: "NEW",  emoji: "🪚", palette: "placeholder-5", rating: 9.1, year: 2022 },
  { id: 106, title: "Hunter x Hunter",    eps: 148, badge: "FREE", emoji: "🎯", palette: "placeholder-6", rating: 9.5, year: 2011 },
  { id: 107, title: "Fullmetal Alchemist",eps: 64,  badge: "FREE", emoji: "⚗️", palette: "placeholder-7", rating: 9.7, year: 2009 },
  { id: 108, title: "Tokyo Revengers",    eps: 65,  badge: "SUB",  emoji: "🏍️", palette: "placeholder-8", rating: 8.4, year: 2021 },
];

const ANIME_SERIES = [
  { id: 201, title: "Bleach TYBW",      eps: 52, badge: "NEW",  emoji: "🌙",  palette: "placeholder-9",  rating: 9.4, year: 2022 },
  { id: 202, title: "Vinland Saga S2",  eps: 24, badge: "VIP",  emoji: "🪓",  palette: "placeholder-10", rating: 9.2, year: 2023 },
  { id: 203, title: "Spy x Family",     eps: 37, badge: "FREE", emoji: "🕵️", palette: "placeholder-1",  rating: 8.8, year: 2022 },
  { id: 204, title: "Frieren: Beyond",  eps: 28, badge: "NEW",  emoji: "🧙‍♀️",palette: "placeholder-2",  rating: 9.6, year: 2023 },
  { id: 205, title: "Dungeon Meshi",    eps: 24, badge: "NEW",  emoji: "🍲",  palette: "placeholder-3",  rating: 9.0, year: 2024 },
  { id: 206, title: "Blue Lock S2",     eps: 24, badge: "VIP",  emoji: "⚽",  palette: "placeholder-4",  rating: 8.6, year: 2024 },
  { id: 207, title: "Solo Leveling",    eps: 12, badge: "SUB",  emoji: "⬆️",  palette: "placeholder-5",  rating: 8.9, year: 2024 },
  { id: 208, title: "Mashle Magic",     eps: 25, badge: "FREE", emoji: "💪",  palette: "placeholder-6",  rating: 8.3, year: 2023 },
];

const KIDS = [
  { id: 301, title: "Tom & Jerry",        eps: 164,  badge: "FREE", emoji: "🐭", palette: "placeholder-7",  rating: 9.0, year: 1940 },
  { id: 302, title: "Doraemon",           eps: 1787, badge: "FREE", emoji: "🤖", palette: "placeholder-8",  rating: 9.2, year: 1979 },
  { id: 303, title: "SpongeBob",          eps: 279,  badge: "FREE", emoji: "🧽", palette: "placeholder-9",  rating: 8.8, year: 1999 },
  { id: 304, title: "Peppa Pig",          eps: 365,  badge: "FREE", emoji: "🐷", palette: "placeholder-10", rating: 7.5, year: 2004 },
  { id: 305, title: "Paw Patrol",         eps: 200,  badge: "FREE", emoji: "🐾", palette: "placeholder-1",  rating: 7.8, year: 2013 },
  { id: 306, title: "Bluey",              eps: 151,  badge: "FREE", emoji: "🐕", palette: "placeholder-2",  rating: 9.1, year: 2018 },
  { id: 307, title: "Miraculous",         eps: 100,  badge: "VIP",  emoji: "🐞", palette: "placeholder-3",  rating: 8.2, year: 2015 },
  { id: 308, title: "Pokémon Horizons",   eps: 51,   badge: "NEW",  emoji: "⚡", palette: "placeholder-4",  rating: 8.0, year: 2023 },
];

// Mock detail data (used in watch.html)
// ════════════════════════════════════════════════════════════════
// كل حلقة تحتوي على servers: { "1": url_uqload, "2": url_streamtape, "3": url_myvidplay }
// استبدل الروابط بروابط حقيقية عند الربط مع API
// ════════════════════════════════════════════════════════════════
const ANIME_DETAILS = {
  101: {
    title: "Attack on Titan",
    description: "في عالم تحكمه عمالقة الأكل للبشر، يقرر إيرين يجر الانتقام بعد أن تهاجم العمالقة مدينته. قصة ملحمية عن الحرية، الحرب، والبقاء.",
    rating: "9.8",
    year: "2013",
    epCount: 87,
    lang: "مدبلج عربي",
    tags: ["أكشن", "فانتازيا مظلمة", "دراما", "إثارة"],
    palette: "placeholder-1",
    emoji: "🏰",
    episodes: Array.from({ length: 87 }, (_, i) => ({
      num: i + 1,
      title: `الحلقة ${i + 1}: ${["البداية","الجدار","الهجوم","الثأر","الحقيقة","المعركة","الانتقام","النهاية"][i % 8]}`,
      duration: `${22 + (i % 4)} دقيقة`,
      // ══ سيرفرات الحلقة — استبدل بروابط حقيقية ══
      servers: {
        "1": `https://uqload.is/embed-aot-ep${i + 1}.html`,
        "2": `https://streamtape.com/e/aot-ep${i + 1}/`,
        "3": `https://myvidplay.com/e/aot-ep${i + 1}`,
      },
    })),
  },
  102: {
    title: "Naruto Shippuden",
    description: "ناروتو أوزوماكي يواصل رحلته نحو حلمه ليصبح هوكاجي بينما يواجه تهديدات تطال العالم بأسره.",
    rating: "9.3",
    year: "2007",
    epCount: 500,
    lang: "مدبلج عربي",
    tags: ["أكشن", "نينجا", "مغامرات", "صداقة"],
    palette: "placeholder-2",
    emoji: "🍥",
    episodes: Array.from({ length: 30 }, (_, i) => ({
      num: i + 1,
      title: `الحلقة ${i + 1}`,
      duration: "23 دقيقة",
      servers: {
        "1": `https://uqload.is/embed-ns-ep${i + 1}.html`,
        "2": `https://streamtape.com/e/ns-ep${i + 1}/`,
        "3": `https://myvidplay.com/e/ns-ep${i + 1}`,
      },
    })),
  },
};

/* =============================================
   UTILITY FUNCTIONS
   ============================================= */
function getParams() {
  return new URLSearchParams(window.location.search);
}

function getBadgeClass(badge) {
  const map = { FREE: "badge-free", NEW: "badge-new", VIP: "badge-vip", SUB: "badge-sub" };
  return map[badge] || "badge-free";
}

function navigateToWatch(id) {
  window.location.href = `watch.html?id=${id}`;
}

/* =============================================
   CARD GENERATION
   ============================================= */
function createCard(item, rank = null) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("data-id", item.id);
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `مشاهدة ${item.title}`);

  card.innerHTML = `
    <div class="card-img-wrap ${item.palette}">
      <div class="card-img-fallback">
        <span>${item.emoji}</span>
        <span>${item.title}</span>
      </div>
      <span class="card-badge ${getBadgeClass(item.badge)}">${item.badge}</span>
      <div class="card-play-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </div>
      ${rank !== null ? `<span class="card-rank">${rank + 1}</span>` : ""}
    </div>
    <div class="card-info">
      <div class="card-title">${item.title}</div>
      <div class="card-meta">
        <span class="card-eps">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/></svg>
          ${item.eps} حلقة
        </span>
        <span>${item.year}</span>
      </div>
    </div>
  `;

  card.addEventListener("click", () => navigateToWatch(item.id));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") navigateToWatch(item.id);
  });

  return card;
}

function generateCards(containerId, dataArray, withRank = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  dataArray.forEach((item, idx) => {
    fragment.appendChild(createCard(item, withRank ? idx : null));
  });
  container.appendChild(fragment);
}

/* =============================================
   HORIZONTAL SCROLL NAVIGATION
   ============================================= */
function initRowNavigation() {
  document.querySelectorAll(".cards-row-wrap").forEach((wrap) => {
    const row  = wrap.querySelector(".cards-row");
    const prev = wrap.querySelector(".row-prev");
    const next = wrap.querySelector(".row-next");
    if (!row) return;
    const scrollAmt = () =>
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--card-w") || "170") * 3 + 42;
    prev && prev.addEventListener("click", () => row.scrollBy({ left:  scrollAmt(), behavior: "smooth" }));
    next && next.addEventListener("click", () => row.scrollBy({ left: -scrollAmt(), behavior: "smooth" }));
  });
}

/* =============================================
   HERO SLIDER
   ============================================= */
let heroIndex = 0;
let heroTimer  = null;

function renderHeroSlider() {
  const track   = document.getElementById("heroTrack");
  const content = document.getElementById("heroContent");
  const dotsWrap= document.getElementById("heroDots");
  if (!track || !content || !dotsWrap) return;

  track.innerHTML = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide${i === 0 ? " active" : ""}"
         style="background:${s.gradient};"
         data-index="${i}"></div>
  `).join("");

  content.innerHTML = HERO_SLIDES.map((s, i) => `
    <div class="hero-slide-content${i === 0 ? " active" : ""}" data-index="${i}">
      <span class="hero-genre-tag">${s.genre}</span>
      <h1 class="hero-title">${s.emoji} ${s.title}</h1>
      <p class="hero-desc">${s.description}</p>
      <div class="hero-actions">
        <a href="watch.html?id=${s.id}" class="btn-play">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          شاهد الآن
        </a>
        <button class="btn-info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          تفاصيل
        </button>
        <span class="hero-ep-info">${s.badge} · ${s.episodes}</span>
      </div>
    </div>
  `).join("");

  dotsWrap.innerHTML = HERO_SLIDES.map((_, i) => `
    <button class="hero-dot${i === 0 ? " active" : ""}" data-index="${i}" aria-label="شريحة ${i + 1}"></button>
  `).join("");

  dotsWrap.querySelectorAll(".hero-dot").forEach((dot) => {
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.index)));
  });

  startHeroAutoplay();
}

function goToSlide(idx) {
  const slides   = document.querySelectorAll(".hero-slide");
  const contents = document.querySelectorAll(".hero-slide-content");
  const dots     = document.querySelectorAll(".hero-dot");

  slides[heroIndex]?.classList.remove("active");
  contents[heroIndex]?.classList.remove("active");
  dots[heroIndex]?.classList.remove("active");

  heroIndex = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;

  slides[heroIndex]?.classList.add("active");
  contents[heroIndex]?.classList.add("active");
  dots[heroIndex]?.classList.add("active");

  resetHeroAutoplay();
}

function startHeroAutoplay() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 4000);
}

function resetHeroAutoplay() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 4000);
}

function initHeroControls() {
  document.getElementById("heroPrev")?.addEventListener("click", () => goToSlide(heroIndex - 1));
  document.getElementById("heroNext")?.addEventListener("click", () => goToSlide(heroIndex + 1));
}

function initHeroSwipe() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  let startX = 0, isDragging = false;
  hero.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
  hero.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0 ? heroIndex + 1 : heroIndex - 1);
    isDragging = false;
  });
}

/* =============================================
   HEADER BEHAVIOR
   ============================================= */
function initHeader() {
  window.addEventListener("scroll", () => {
    document.getElementById("header")?.classList.toggle("scrolled", window.scrollY > 60);
  }, { passive: true });

  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  hamburger?.addEventListener("click", () => mobileNav?.classList.toggle("open"));

  const searchToggle = document.getElementById("searchToggle");
  const searchBox    = document.getElementById("searchBox");
  searchToggle?.addEventListener("click", () => {
    searchBox?.classList.toggle("open");
    if (searchBox?.classList.contains("open")) {
      searchBox?.querySelector(".search-input")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) searchBox?.classList.remove("open");
  });
}

/* =============================================
   PLAYER ENGINE  ← جديد / مدمج مع app.js
   ============================================= */
const playerEngine = (() => {

  /* ── State داخلي ──────────────────────────────── */
  let _episode       = null;
  let _server        = 1;
  let _failedServers = [];
  let _allEpisodes   = [];
  let _loaderTimer   = null;
  let _toastTimer    = null;

  /* ── DOM refs (تُحلّ عند أول استخدام) ─────────── */
  const el = (id) => document.getElementById(id);

  /* ── localStorage ─────────────────────────────── */
  const LS_KEY = "toonia_srv";

  function saveServerPreference(n) {
    try { localStorage.setItem(LS_KEY, String(n)); } catch (e) {}
  }

  function getServerPreference() {
    try {
      const v = parseInt(localStorage.getItem(LS_KEY), 10);
      return [1, 2, 3].includes(v) ? v : 1;
    } catch (e) { return 1; }
  }

  /* ── Toast ────────────────────────────────────── */
  function showToast(msg) {
    const t = el("tooniaToast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
  }

  /* ── تحميل iframe مع Loader ───────────────────── */
  function loadIframe(src) {
    const iframe = el("mainPlayer");
    const loader = el("playerLoader");
    if (!iframe) return;

    loader?.classList.remove("hidden");
    iframe.src = "about:blank";
    clearTimeout(_loaderTimer);

    setTimeout(() => { iframe.src = src; }, 80);

    // أخفِ loader بعد 4 ثواني (iframe cross-origin لا يطلق onload دائماً)
    _loaderTimer = setTimeout(() => loader?.classList.add("hidden"), 4000);

    iframe.onload = () => loader?.classList.add("hidden");
  }

  /* ── playEpisode ──────────────────────────────── */
  function playEpisode(episode) {
    _episode       = episode;
    _failedServers = [];
    _server        = getServerPreference();

    let url = episode.servers?.[String(_server)];
    if (!url) { _server = 1; url = episode.servers?.["1"]; }
    if (!url) { showToast("❌ لا توجد روابط لهذه الحلقة"); return; }

    loadIframe(url);
    _updateServerButtons();

    // عنوان البلاير
    const epTitle = el("playerEpTitle");
    if (epTitle) epTitle.textContent = episode.title || "";

    // إخفاء الـ overlay
    el("playerOverlay")?.classList.add("hidden");

    // تحديث زر التالي
    _updateNextBtn();

    // highlight الحلقة في القائمة
    _highlightEpisode(episode.num);
  }

  /* ── changeServer ─────────────────────────────── */
  function changeServer(num) {
    if (!_episode) { showToast("⚠️ اختر حلقة أولاً"); return; }
    const url = _episode.servers?.[String(num)];
    if (!url) { showToast("هذا السيرفر غير متاح"); return; }
    _server = num;
    saveServerPreference(num);
    _updateServerButtons();
    loadIframe(url);
    showToast("✅ " + _getServerName(num));
  }

  /* ── Auto Fallback ────────────────────────────── */
  function _fallback() {
    if (!_episode) return;
    if (!_failedServers.includes(_server)) _failedServers.push(_server);
    const next = [1, 2, 3].find((s) => !_failedServers.includes(s));
    if (next) {
      showToast(`⚡ التبديل لـ ${_getServerName(next)}...`);
      setTimeout(() => changeServer(next), 900);
    } else {
      showToast("❌ جميع السيرفرات غير متاحة");
      el("playerLoader")?.classList.add("hidden");
    }
  }

  /* ── goNextEpisode ────────────────────────────── */
  function goNextEpisode() {
    if (!_episode || !_allEpisodes.length) return;
    const idx = _allEpisodes.findIndex((e) => e.num === _episode.num);
    if (idx !== -1 && idx + 1 < _allEpisodes.length) {
      playEpisode(_allEpisodes[idx + 1]);
      showToast("▶ " + _allEpisodes[idx + 1].title);
    }
  }

  /* ── setEpisodes (يُستدعى من renderEpisodesList) ─ */
  function setEpisodes(eps) {
    _allEpisodes = eps;
  }

  /* ── helpers ──────────────────────────────────── */
  function _updateServerButtons() {
    [1, 2, 3].forEach((n) => {
      const btn = el(`srv${n}`);
      if (!btn) return;
      btn.classList.toggle("active", n === _server);
      btn.classList.toggle("error",  _failedServers.includes(n));
    });
  }

  function _updateNextBtn() {
    const btn = el("btnNextEp");
    if (!btn) return;
    const eps = _allEpisodes;
    btn.disabled = !_episode || !eps.length || _episode.num >= eps[eps.length - 1].num;
  }

  function _highlightEpisode(num) {
    document.querySelectorAll(".ep-item").forEach((el) => {
      const idx = parseInt(el.dataset.index, 10);
      el.classList.toggle("active", idx === num - 1);
    });
  }

  function _getServerName(n) {
    return { 1: "Uqload", 2: "Streamtape", 3: "Myvidplay" }[n] || `سيرفر ${n}`;
  }

  /* ── init: يُربط مع iframe error ─────────────── */
  function init() {
    const iframe = el("mainPlayer");
    iframe?.addEventListener("error", _fallback);
  }

  /* ── Public API ───────────────────────────────── */
  return { playEpisode, changeServer, goNextEpisode, setEpisodes, init };

})();

/* =============================================
   WATCH PAGE
   ============================================= */
function initWatchPage() {
  const params   = getParams();
  const id       = parseInt(params.get("id")) || 101;
  const allAnime = [...TRENDING, ...ANIME_SERIES, ...KIDS];
  const basicData  = allAnime.find((a) => a.id === id);
  const detailData = ANIME_DETAILS[id] || buildFallbackDetail(basicData);

  if (!detailData) {
    document.getElementById("animeTitle").textContent = "لم يتم العثور على المحتوى";
    return;
  }

  // تسليم الحلقات للـ playerEngine
  playerEngine.setEpisodes(detailData.episodes || []);
  playerEngine.init();

  renderAnimeInfo(detailData);
  renderEpisodesList(detailData.episodes || []);
  renderRelated(id, allAnime);
  initNextEpButton(detailData);
}

function buildFallbackDetail(basic) {
  if (!basic) return null;
  return {
    title: basic.title,
    description: `استمتع بمشاهدة ${basic.title} – سلسلة رائعة بـ ${basic.eps} حلقة.`,
    rating: basic.rating.toString(),
    year: basic.year.toString(),
    epCount: basic.eps,
    lang: "مدبلج عربي",
    tags: ["أنيمي"],
    palette: basic.palette,
    emoji: basic.emoji,
    episodes: Array.from({ length: Math.min(basic.eps, 30) }, (_, i) => ({
      num: i + 1,
      title: `الحلقة ${i + 1}`,
      duration: "23 دقيقة",
      servers: {
        "1": `https://uqload.is/embed-ep${i + 1}.html`,
        "2": `https://streamtape.com/e/ep${i + 1}/`,
        "3": `https://myvidplay.com/e/ep${i + 1}`,
      },
    })),
  };
}

function renderAnimeInfo(data) {
  document.title = `${data.title} – Toonia`;

  const thumb = document.getElementById("animeThumb");
  if (thumb) {
    thumb.parentElement.classList.add(data.palette);
    thumb.style.display = "none";
    thumb.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;">${data.emoji}</div>`;
  }

  document.getElementById("animeTitle").textContent   = data.title;
  document.getElementById("animeRating").textContent  = data.rating;
  document.getElementById("animeYear").textContent    = data.year;
  document.getElementById("animeEpCount").textContent = data.epCount;
  document.getElementById("animeLang").textContent    = data.lang;
  document.getElementById("animeDesc").textContent    = data.description;

  const tagsContainer = document.getElementById("animeTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = data.tags.map((t) => `<span class="anime-tag">${t}</span>`).join("");
  }
}

let currentEpIndex = 0;

function renderEpisodesList(episodes) {
  const list  = document.getElementById("episodesList");
  const badge = document.getElementById("epCountBadge");
  if (!list) return;

  badge && (badge.textContent = `${episodes.length} حلقة`);
  list.innerHTML = "";

  const fragment = document.createDocumentFragment();
  episodes.forEach((ep, idx) => {
    const item = document.createElement("div");
    item.className = `ep-item${idx === 0 ? " active" : ""}`;
    item.setAttribute("data-index", idx);
    item.innerHTML = `
      <div class="ep-num">${ep.num}</div>
      <div class="ep-details">
        <div class="ep-title">${ep.title}</div>
        <div class="ep-duration">${ep.duration}</div>
      </div>
    `;
    // ══ ربط الضغط مع playerEngine ══
    item.addEventListener("click", () => {
      currentEpIndex = idx;
      playerEngine.playEpisode(ep);
    });
    fragment.appendChild(item);
  });
  list.appendChild(fragment);
}

function initNextEpButton(data) {
  const btn = document.getElementById("btnNextEp");
  if (!btn) return;
  // ══ زر التالي يمر عبر playerEngine ══
  btn.addEventListener("click", () => playerEngine.goNextEpisode());
}

function renderRelated(currentId, allAnime) {
  const related = allAnime.filter((a) => a.id !== currentId).slice(0, 10);
  generateCards("rowRelated", related);
}

/* =============================================
   FUTURE API INTEGRATION STUBS
   ============================================= */
// async function fetchTrending() {
//   const res = await fetch('/api/trending');
//   return res.json();
// }
// async function fetchAnimeDetail(id) {
//   const res = await fetch(`/api/anime/${id}`);
//   return res.json();
// }

/* =============================================
   PAGE ROUTER & INIT
   ============================================= */
function handleNavigation() {
  const isWatch = document.body.classList.contains("watch-page");

  if (isWatch) {
    initHeader();
    initWatchPage();
  } else {
    initHeader();
    renderHeroSlider();
    initHeroControls();
    initHeroSwipe();
    generateCards("rowTrending", TRENDING, true);
    generateCards("rowAnime", ANIME_SERIES);
    generateCards("rowKids", KIDS);
    initRowNavigation();
  }
}

// Boot
document.addEventListener("DOMContentLoaded", handleNavigation);
