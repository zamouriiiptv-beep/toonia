/**
 * TOONIA – navigation.js
 * Accordion Sidebar + Poster Sliders
 */
"use strict";

/* ══════════════════════════════════════════
   SIDEBAR
   ══════════════════════════════════════════ */
function initSidebar() {
  const openBtn  = document.getElementById("aniOpen");
  const sidebar  = document.getElementById("aniSidebar");
  const overlay  = document.getElementById("aniOverlay");
  const closeBtn = document.getElementById("aniClose");

  if (!sidebar) return;

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // فتح القائمة
  openBtn?.addEventListener("click", openSidebar);

  // إغلاق بزر X
  closeBtn?.addEventListener("click", closeSidebar);

  // إغلاق عند الضغط على الـ overlay
  overlay?.addEventListener("click", closeSidebar);

  // ✅ Search toggle
  const searchToggle = document.getElementById("searchToggle");
  const searchBar    = document.getElementById("searchBar");
  const searchInput  = document.getElementById("searchInput");
  if (searchToggle && searchBar) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = searchBar.style.display === "block";
      searchBar.style.display = isOpen ? "none" : "block";
      if (!isOpen) searchInput?.focus();
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#searchBar") && !e.target.closest("#searchToggle")) {
        searchBar.style.display = "none";
      }
    });
  }

  // ✅ إغلاق ذكي: الضغط خارج القائمة
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !openBtn?.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // ✅ إغلاق عند الضغط على أي رابط داخل القائمة
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      // أغلق فقط إذا كان الرابط يؤدي لصفحة (ليس #)
      if (link.getAttribute("href") !== "#") {
        closeSidebar();
      }
    });
  });

  // ✅ Accordion logic
  sidebar.querySelectorAll(".ani-acc-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // منع الإغلاق عند الضغط على القائمة
      const item = toggle.closest(".ani-acc-item");

      // إغلاق باقي العناصر المفتوحة
      sidebar.querySelectorAll(".ani-acc-item.open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("open");
      });

      // فتح/إغلاق العنصر المضغوط
      item.classList.toggle("open");
    });
  });

  // منع إغلاق القائمة عند الضغط بداخلها
  sidebar.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

/* ══════════════════════════════════════════
   POSTER SLIDERS DATA
   ══════════════════════════════════════════ */
const POSTER_SECTIONS = [
  {
    id: "sliderAnime",
    title: "الأنمي",
    accent: "",
    icon: "⚔️",
    seeAll: "#",
    items: [
      { title: "Attack on Titan",    badge: "vip",  emoji: "🏰", bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)" },
      { title: "Naruto Shippuden",   badge: "free", emoji: "🍥", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
      { title: "Dragon Ball Super",  badge: "new",  emoji: "🐉", bg: "linear-gradient(135deg,#200122,#6f0000)" },
      { title: "Jujutsu Kaisen",     badge: "vip",  emoji: "👁️", bg: "linear-gradient(135deg,#0d001a,#2d0045,#5c0080)" },
      { title: "Demon Slayer",       badge: "new",  emoji: "⚔️", bg: "linear-gradient(135deg,#1a0a0a,#4a0000,#8b1a1a)" },
      { title: "One Piece",          badge: "free", emoji: "🏴‍☠️", bg: "linear-gradient(135deg,#0a0a2a,#0d2952,#1a5276)" },
      { title: "Bleach TYBW",        badge: "new",  emoji: "🌙", bg: "linear-gradient(135deg,#093028,#237a57)" },
      { title: "My Hero Academia",   badge: "vip",  emoji: "⚡", bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)" },
      { title: "Chainsaw Man",       badge: "new",  emoji: "🪚", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
      { title: "Frieren Beyond",     badge: "free", emoji: "🧙‍♀️", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
    ],
  },
  {
    id: "sliderCartoon",
    title: "الكرتون",
    accent: "blue",
    icon: "🎨",
    seeAll: "#",
    items: [
      { title: "SpongeBob",       badge: "free", emoji: "🧽", bg: "linear-gradient(135deg,#1a1400,#4a3800,#7a5c00)" },
      { title: "Tom & Jerry",     badge: "free", emoji: "🐭", bg: "linear-gradient(135deg,#243b55,#141e30)" },
      { title: "Looney Tunes",    badge: "free", emoji: "🐰", bg: "linear-gradient(135deg,#200122,#6f0000)" },
      { title: "Scooby-Doo",      badge: "free", emoji: "🐕", bg: "linear-gradient(135deg,#0f2027,#203a43)" },
      { title: "The Simpsons",    badge: "hd",   emoji: "😂", bg: "linear-gradient(135deg,#4a3800,#7a5c00)" },
      { title: "Family Guy",      badge: "hd",   emoji: "🏠", bg: "linear-gradient(135deg,#0d324d,#7f5a83)" },
      { title: "Gravity Falls",   badge: "free", emoji: "🔭", bg: "linear-gradient(135deg,#093028,#237a57)" },
      { title: "Rick and Morty",  badge: "vip",  emoji: "🛸", bg: "linear-gradient(135deg,#0a0a2a,#1a5276)" },
      { title: "Adventure Time",  badge: "free", emoji: "🗡️", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
      { title: "Regular Show",    badge: "free", emoji: "🦅", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
    ],
  },
  {
    id: "sliderMovies",
    title: "الأفلام",
    accent: "red",
    icon: "🎬",
    seeAll: "#",
    items: [
      { title: "Spirited Away",       badge: "vip",  emoji: "🐉", bg: "linear-gradient(135deg,#0a0a2a,#0d2952)" },
      { title: "Your Name",           badge: "free", emoji: "💫", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
      { title: "Princess Mononoke",   badge: "vip",  emoji: "🌿", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
      { title: "Akira",               badge: "hd",   emoji: "🏍️", bg: "linear-gradient(135deg,#1a0a0a,#4a0000)" },
      { title: "Ghost in the Shell",  badge: "free", emoji: "🤖", bg: "linear-gradient(135deg,#0f2027,#2c5364)" },
      { title: "The Boy and Heron",   badge: "new",  emoji: "🦅", bg: "linear-gradient(135deg,#093028,#237a57)" },
      { title: "Weathering with You", badge: "vip",  emoji: "☁️", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
      { title: "A Silent Voice",      badge: "free", emoji: "🎵", bg: "linear-gradient(135deg,#4a1942,#c74b50)" },
      { title: "Howl's Castle",       badge: "vip",  emoji: "🏰", bg: "linear-gradient(135deg,#243b55,#141e30)" },
      { title: "Nausicaa",            badge: "hd",   emoji: "🌾", bg: "linear-gradient(135deg,#200122,#6f0000)" },
    ],
  },
  {
    id: "sliderKids",
    title: "ركن الأطفال",
    accent: "yellow",
    icon: "🌟",
    seeAll: "#",
    items: [
      { title: "Doraemon",       badge: "free", emoji: "🤖", bg: "linear-gradient(135deg,#0a0a2a,#1a5276)" },
      { title: "Bluey",          badge: "free", emoji: "🐕", bg: "linear-gradient(135deg,#0d324d,#7f5a83)" },
      { title: "Peppa Pig",      badge: "free", emoji: "🐷", bg: "linear-gradient(135deg,#4a1942,#c74b50)" },
      { title: "Paw Patrol",     badge: "free", emoji: "🐾", bg: "linear-gradient(135deg,#0f2027,#203a43)" },
      { title: "Miraculous",     badge: "vip",  emoji: "🐞", bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)" },
      { title: "Pokémon",        badge: "new",  emoji: "⚡", bg: "linear-gradient(135deg,#4a3800,#7a5c00)" },
      { title: "Cocomelon",      badge: "free", emoji: "🎵", bg: "linear-gradient(135deg,#093028,#237a57)" },
      { title: "Masha & Bear",   badge: "free", emoji: "🐻", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
      { title: "Oggy",           badge: "free", emoji: "🐱", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
      { title: "Ben 10",         badge: "hd",   emoji: "⌚", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
    ],
  },
  {
    id: "sliderSeason",
    title: "أنميات الموسم",
    accent: "purple",
    icon: "📅",
    seeAll: "#",
    items: [
      { title: "Solo Leveling S2",    badge: "new", emoji: "⬆️", bg: "linear-gradient(135deg,#0f2027,#2c5364)" },
      { title: "Blue Lock S2",        badge: "new", emoji: "⚽", bg: "linear-gradient(135deg,#0a0a2a,#0d2952)" },
      { title: "Dungeon Meshi",       badge: "new", emoji: "🍲", bg: "linear-gradient(135deg,#200122,#6f0000)" },
      { title: "Frieren Beyond",      badge: "new", emoji: "🧙‍♀️", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
      { title: "Mashle S2",           badge: "new", emoji: "💪", bg: "linear-gradient(135deg,#4a1942,#c74b50)" },
      { title: "Kaiju No. 8",         badge: "new", emoji: "👾", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
      { title: "Wind Breaker",        badge: "new", emoji: "🏍️", bg: "linear-gradient(135deg,#093028,#237a57)" },
      { title: "Demon Slayer S4",     badge: "new", emoji: "⚔️", bg: "linear-gradient(135deg,#1a0a0a,#4a0000)" },
      { title: "Haikyuu!! Movie",     badge: "new", emoji: "🏐", bg: "linear-gradient(135deg,#0d324d,#7f5a83)" },
      { title: "Re:Zero S3",          badge: "new", emoji: "🌸", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
    ],
  },
  {
    id: "sliderMostWatched",
    title: "الأكثر مشاهدة",
    accent: "",
    icon: "🔥",
    seeAll: "#",
    items: [
      { title: "Attack on Titan",   badge: "vip",  emoji: "🏰", bg: "linear-gradient(135deg,#1a1a2e,#0f3460)" },
      { title: "Naruto Shippuden",  badge: "free", emoji: "🍥", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
      { title: "One Piece",         badge: "free", emoji: "🏴‍☠️", bg: "linear-gradient(135deg,#0a0a2a,#1a5276)" },
      { title: "Dragon Ball Z",     badge: "free", emoji: "🐉", bg: "linear-gradient(135deg,#200122,#6f0000)" },
      { title: "Demon Slayer",      badge: "new",  emoji: "⚔️", bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)" },
      { title: "Jujutsu Kaisen",    badge: "vip",  emoji: "👁️", bg: "linear-gradient(135deg,#0d001a,#5c0080)" },
      { title: "My Hero Academia",  badge: "vip",  emoji: "⚡", bg: "linear-gradient(135deg,#0f2027,#2c5364)" },
      { title: "Fullmetal Alch.",   badge: "free", emoji: "⚗️", bg: "linear-gradient(135deg,#4a1942,#c74b50)" },
      { title: "Hunter x Hunter",   badge: "free", emoji: "🎯", bg: "linear-gradient(135deg,#243b55,#141e30)" },
      { title: "Bleach TYBW",       badge: "new",  emoji: "🌙", bg: "linear-gradient(135deg,#093028,#237a57)" },
    ],
  },
  {
    id: "sliderLatest",
    title: "أحدث الإضافات",
    accent: "blue",
    icon: "✨",
    seeAll: "#",
    items: [
      { title: "البطل خماسي",      badge: "free", emoji: "🤖", bg: "linear-gradient(135deg,#243b55,#141e30)" },
      { title: "Kaiju No. 8",      badge: "new",  emoji: "👾", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)" },
      { title: "Wind Breaker",     badge: "new",  emoji: "🏍️", bg: "linear-gradient(135deg,#0d324d,#7f5a83)" },
      { title: "Blue Lock S2",     badge: "new",  emoji: "⚽", bg: "linear-gradient(135deg,#0a0a2a,#0d2952)" },
      { title: "Solo Leveling S2", badge: "new",  emoji: "⬆️", bg: "linear-gradient(135deg,#0f2027,#2c5364)" },
      { title: "Haikyuu!! Movie",  badge: "new",  emoji: "🏐", bg: "linear-gradient(135deg,#42275a,#734b6d)" },
      { title: "Re:Zero S3",       badge: "new",  emoji: "🌸", bg: "linear-gradient(135deg,#2d1b69,#11998e)" },
      { title: "Mashle S2",        badge: "new",  emoji: "💪", bg: "linear-gradient(135deg,#4a1942,#c74b50)" },
      { title: "Demon Slayer S4",  badge: "new",  emoji: "⚔️", bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)" },
      { title: "Frieren Beyond",   badge: "free", emoji: "🧙‍♀️", bg: "linear-gradient(135deg,#200122,#6f0000)" },
    ],
  },
];

/* ══════════════════════════════════════════
   BUILD POSTER SECTIONS
   ══════════════════════════════════════════ */
function buildPosterSections() {
  const container = document.getElementById("posterSections");
  if (!container) return;

  POSTER_SECTIONS.forEach((section) => {
    const sec = document.createElement("section");
    sec.className = "poster-section";

    // Header
    sec.innerHTML = `
      <div class="poster-section-header">
        <div class="poster-section-title">
          <div class="poster-section-accent ${section.accent}"></div>
          <span>${section.icon} ${section.title}</span>
        </div>
        <a href="${section.seeAll}" class="poster-see-all">
          عرض الكل
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
      </div>
      <div class="poster-slider-wrap">
        <div class="poster-slider" id="${section.id}"></div>
      </div>
    `;

    container.appendChild(sec);

    // Fill slider
    const slider = sec.querySelector(`#${section.id}`);
    section.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "poster-card";
      card.innerHTML = `
        <div class="poster-placeholder" style="background:${item.bg}">
          <span style="font-size:2.2rem">${item.emoji}</span>
          <span>${item.title}</span>
        </div>
        <span class="poster-badge ${item.badge}">${item.badge.toUpperCase()}</span>
        <div class="poster-play-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div class="poster-card-title">${item.title}</div>
      `;
      slider.appendChild(card);
    });
  });
}

/* ══════════════════════════════════════════
   INIT
   ══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  buildPosterSections();
});
