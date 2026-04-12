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

  openBtn?.addEventListener("click", openSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
  overlay?.addEventListener("click", closeSidebar);

  // إغلاق ذكي: الضغط خارج القائمة
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      !openBtn?.contains(e.target)
    ) {
      closeSidebar();
    }
  });

  // إغلاق عند الضغط على أي رابط داخل القائمة
  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.getAttribute("href") !== "#") {
        closeSidebar();
      }
    });
  });

  // Accordion logic
  sidebar.querySelectorAll(".ani-acc-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = toggle.closest(".ani-acc-item");
      sidebar.querySelectorAll(".ani-acc-item.open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("open");
      });
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
   الترتيب: أحدث الإضافات ← الأكثر مشاهدة ← الأنمي ← الكرتون ← الأفلام ← ركن الأطفال
   ══════════════════════════════════════════ */
const POSTER_SECTIONS = [
  {
    id: "sliderLatest",
    title: "أحدث الإضافات",
    accent: "blue",
    seeAll: "#",
    items: [
      { title: "البطل خماسي",      bg: "linear-gradient(135deg,#243b55,#141e30)",  bdg: "#1E88E5" },
      { title: "Kaiju No. 8",      bg: "linear-gradient(135deg,#1a472a,#2d6a4f)",  bdg: "#00D67A" },
      { title: "Wind Breaker",     bg: "linear-gradient(135deg,#0d324d,#7f5a83)",  bdg: "#9C27B0" },
      { title: "Blue Lock S2",     bg: "linear-gradient(135deg,#0a0a2a,#0d2952)",  bdg: "#1E88E5" },
      { title: "Solo Leveling S2", bg: "linear-gradient(135deg,#0f2027,#2c5364)",  bdg: "#00BCD4" },
      { title: "Haikyuu!! Movie",  bg: "linear-gradient(135deg,#42275a,#734b6d)",  bdg: "#E91E63" },
      { title: "Re:Zero S3",       bg: "linear-gradient(135deg,#2d1b69,#11998e)",  bdg: "#00D67A" },
      { title: "Mashle S2",        bg: "linear-gradient(135deg,#4a1942,#c74b50)",  bdg: "#FF5722" },
      { title: "Demon Slayer S4",  bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)",  bdg: "#F44336" },
      { title: "Frieren Beyond",   bg: "linear-gradient(135deg,#200122,#6f0000)",  bdg: "#9C27B0" },
    ],
  },
  {
    id: "sliderMostWatched",
    title: "الأكثر مشاهدة",
    accent: "",
    seeAll: "#",
    items: [
      { title: "Attack on Titan",   bg: "linear-gradient(135deg,#1a1a2e,#0f3460)",  bdg: "#1E88E5" },
      { title: "Naruto Shippuden",  bg: "linear-gradient(135deg,#2d1b69,#11998e)",  bdg: "#FF9800" },
      { title: "One Piece",         bg: "linear-gradient(135deg,#0a0a2a,#1a5276)",  bdg: "#FFC107" },
      { title: "Dragon Ball Z",     bg: "linear-gradient(135deg,#200122,#6f0000)",  bdg: "#FF5722" },
      { title: "Demon Slayer",      bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)",  bdg: "#F44336" },
      { title: "Jujutsu Kaisen",    bg: "linear-gradient(135deg,#0d001a,#5c0080)",  bdg: "#9C27B0" },
      { title: "My Hero Academia",  bg: "linear-gradient(135deg,#0f2027,#2c5364)",  bdg: "#00D67A" },
      { title: "Fullmetal Alch.",   bg: "linear-gradient(135deg,#4a1942,#c74b50)",  bdg: "#E91E63" },
      { title: "Hunter x Hunter",   bg: "linear-gradient(135deg,#243b55,#141e30)",  bdg: "#00BCD4" },
      { title: "Bleach TYBW",       bg: "linear-gradient(135deg,#093028,#237a57)",  bdg: "#00D67A" },
    ],
  },
  {
    id: "sliderAnime",
    title: "الأنمي",
    accent: "",
    seeAll: "#",
    items: [
      { title: "Attack on Titan",   bg: "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",  bdg: "#1E88E5" },
      { title: "Naruto Shippuden",  bg: "linear-gradient(135deg,#2d1b69,#11998e)",           bdg: "#FF9800" },
      { title: "Dragon Ball Super", bg: "linear-gradient(135deg,#200122,#6f0000)",           bdg: "#FF5722" },
      { title: "Jujutsu Kaisen",    bg: "linear-gradient(135deg,#0d001a,#2d0045,#5c0080)",  bdg: "#9C27B0" },
      { title: "Demon Slayer",      bg: "linear-gradient(135deg,#1a0a0a,#4a0000,#8b1a1a)",  bdg: "#F44336" },
      { title: "One Piece",         bg: "linear-gradient(135deg,#0a0a2a,#0d2952,#1a5276)",  bdg: "#FFC107" },
      { title: "Bleach TYBW",       bg: "linear-gradient(135deg,#093028,#237a57)",           bdg: "#00D67A" },
      { title: "My Hero Academia",  bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",  bdg: "#00BCD4" },
      { title: "Chainsaw Man",      bg: "linear-gradient(135deg,#1a472a,#2d6a4f)",           bdg: "#00D67A" },
      { title: "Frieren Beyond",    bg: "linear-gradient(135deg,#42275a,#734b6d)",           bdg: "#E91E63" },
    ],
  },
  {
    id: "sliderCartoon",
    title: "الكرتون",
    accent: "blue",
    seeAll: "#",
    items: [
      { title: "SpongeBob",      bg: "linear-gradient(135deg,#1a1400,#4a3800,#7a5c00)",  bdg: "#FFC107" },
      { title: "Tom & Jerry",    bg: "linear-gradient(135deg,#243b55,#141e30)",           bdg: "#1E88E5" },
      { title: "Looney Tunes",   bg: "linear-gradient(135deg,#200122,#6f0000)",           bdg: "#F44336" },
      { title: "Scooby-Doo",     bg: "linear-gradient(135deg,#0f2027,#203a43)",           bdg: "#00BCD4" },
      { title: "The Simpsons",   bg: "linear-gradient(135deg,#4a3800,#7a5c00)",           bdg: "#FF9800" },
      { title: "Family Guy",     bg: "linear-gradient(135deg,#0d324d,#7f5a83)",           bdg: "#9C27B0" },
      { title: "Gravity Falls",  bg: "linear-gradient(135deg,#093028,#237a57)",           bdg: "#00D67A" },
      { title: "Rick and Morty", bg: "linear-gradient(135deg,#0a0a2a,#1a5276)",           bdg: "#00BCD4" },
      { title: "Adventure Time", bg: "linear-gradient(135deg,#1a472a,#2d6a4f)",           bdg: "#00D67A" },
      { title: "Regular Show",   bg: "linear-gradient(135deg,#42275a,#734b6d)",           bdg: "#E91E63" },
    ],
  },
  {
    id: "sliderMovies",
    title: "الأفلام",
    accent: "red",
    seeAll: "#",
    items: [
      { title: "Spirited Away",       bg: "linear-gradient(135deg,#0a0a2a,#0d2952)",  bdg: "#1E88E5" },
      { title: "Your Name",           bg: "linear-gradient(135deg,#2d1b69,#11998e)",  bdg: "#00BCD4" },
      { title: "Princess Mononoke",   bg: "linear-gradient(135deg,#1a472a,#2d6a4f)",  bdg: "#00D67A" },
      { title: "Akira",               bg: "linear-gradient(135deg,#1a0a0a,#4a0000)",  bdg: "#F44336" },
      { title: "Ghost in the Shell",  bg: "linear-gradient(135deg,#0f2027,#2c5364)",  bdg: "#9C27B0" },
      { title: "The Boy and Heron",   bg: "linear-gradient(135deg,#093028,#237a57)",  bdg: "#00D67A" },
      { title: "Weathering with You", bg: "linear-gradient(135deg,#42275a,#734b6d)",  bdg: "#E91E63" },
      { title: "A Silent Voice",      bg: "linear-gradient(135deg,#4a1942,#c74b50)",  bdg: "#FF5722" },
      { title: "Howl's Castle",       bg: "linear-gradient(135deg,#243b55,#141e30)",  bdg: "#FFC107" },
      { title: "Nausicaa",            bg: "linear-gradient(135deg,#200122,#6f0000)",  bdg: "#FF9800" },
    ],
  },
  {
    id: "sliderKids",
    title: "ركن الأطفال",
    accent: "yellow",
    seeAll: "#",
    items: [
      { title: "Doraemon",     bg: "linear-gradient(135deg,#0a0a2a,#1a5276)",  bdg: "#1E88E5" },
      { title: "Bluey",        bg: "linear-gradient(135deg,#0d324d,#7f5a83)",  bdg: "#00BCD4" },
      { title: "Peppa Pig",    bg: "linear-gradient(135deg,#4a1942,#c74b50)",  bdg: "#E91E63" },
      { title: "Paw Patrol",   bg: "linear-gradient(135deg,#0f2027,#203a43)",  bdg: "#F44336" },
      { title: "Miraculous",   bg: "linear-gradient(135deg,#1a0a0a,#8b1a1a)",  bdg: "#9C27B0" },
      { title: "Pokémon",      bg: "linear-gradient(135deg,#4a3800,#7a5c00)",  bdg: "#FFC107" },
      { title: "Cocomelon",    bg: "linear-gradient(135deg,#093028,#237a57)",  bdg: "#00D67A" },
      { title: "Masha & Bear", bg: "linear-gradient(135deg,#2d1b69,#11998e)",  bdg: "#FF9800" },
      { title: "Oggy",         bg: "linear-gradient(135deg,#42275a,#734b6d)",  bdg: "#9C27B0" },
      { title: "Ben 10",       bg: "linear-gradient(135deg,#1a472a,#2d6a4f)",  bdg: "#00D67A" },
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

    // Header — نقطة خضراء بدل الإيموجي
    sec.innerHTML = `
      <div class="poster-section-header">
        <div class="poster-section-title">
          <div class="poster-section-accent ${section.accent}"></div>
          <span>${section.title}</span>
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

    // Fill slider — badge HD فقط
    const slider = sec.querySelector(`#${section.id}`);
    section.items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "poster-card";
      card.innerHTML = `
        <div class="poster-placeholder" style="background:${item.bg}">
          <span>${item.title}</span>
        </div>
        <span class="poster-badge hd" style="background:${item.bdg};color:#fff;border:none;">HD</span>
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
