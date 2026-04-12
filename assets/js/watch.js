/**
 * Toonia – watch.js (نسخة مصلحة وشغالة 100%)
 * Handles: API fetch → render anime info → episode list → server switching
 */

"use strict";

const CONFIG = {
  apiBase: "/api/getAnime",
  defaultServer: "1",
};

const state = {
  animeData: null,
  currentEpisode: null,
  currentServer: CONFIG.defaultServer,
};

const DOM = {};

function cacheDom() {
  DOM.playerWrapper    = document.getElementById("playerWrapper");
  DOM.videoPlayer      = document.getElementById("videoPlayer");
  DOM.videoSource      = document.getElementById("videoSource");
  DOM.episodeTitle     = document.getElementById("episodeTitle");
  DOM.serverBtns       = document.getElementById("serverBtns");
  DOM.animeTitle       = document.getElementById("animeTitle");
  DOM.animeDesc        = document.getElementById("animeDesc");
  DOM.animeRating      = document.getElementById("animeRating");
  DOM.animeYear        = document.getElementById("animeYear");
  DOM.animeEpCount     = document.getElementById("animeEpCount");
  DOM.animeLang        = document.getElementById("animeLang");
  DOM.animeTags        = document.getElementById("animeTags");
  DOM.episodeList      = document.getElementById("episodeList");
  DOM.loadingOverlay   = document.getElementById("loadingOverlay");
  DOM.errorBox         = document.getElementById("errorBox");
  DOM.errorMessage     = document.getElementById("errorMessage");
}

function getAnimeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return Number.isFinite(id) ? id : null;
}

async function fetchAnime(id) {
  const url = `${CONFIG.apiBase}?id=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`خطأ في الاتصال (HTTP ${response.status})`);
  const json = await response.json();
  if (json.status !== "success" || !json.data) throw new Error(json.message || "الأنمي غير موجود.");
  return json.data;
}

function renderAnimeInfo(data) {
  DOM.animeTitle.textContent   = data.title       ?? "—";
  DOM.animeDesc.textContent    = data.description ?? "—";
  DOM.animeRating.textContent  = data.rating      ?? "—";
  DOM.animeYear.textContent    = data.year         ?? "—";
  DOM.animeEpCount.textContent = data.epCount      ?? "—";
  DOM.animeLang.textContent    = data.lang         ?? "—";

  DOM.animeTags.innerHTML = "";
  if (Array.isArray(data.tags)) {
    data.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      DOM.animeTags.appendChild(span);
    });
  }
  document.title = `${data.title} – Toonia`;
}

function renderEpisodeList(episodes) {
  DOM.episodeList.innerHTML = "";
  if (!Array.isArray(episodes) || episodes.length === 0) {
    DOM.episodeList.innerHTML = '<p class="no-episodes">لا توجد حلقات.</p>';
    return;
  }
  
  const fragment = document.createDocumentFragment();
  episodes.forEach((ep) => {
    const item = document.createElement("div");
    item.className = "episode-item";
    item.dataset.epNum = ep.num;
    item.innerHTML = `
      <span class="ep-num">${ep.num}</span>
      <span class="ep-title">${escapeHtml(ep.title)}</span>
      <span class="ep-duration">${escapeHtml(ep.duration || "24 دقيقة")}</span>
    `;
    // إضافة مستمع الحدث مع منع السلوك الافتراضي
    item.onclick = (e) => {
        e.preventDefault();
        loadEpisode(ep);
    };
    fragment.appendChild(item);
  });
  DOM.episodeList.appendChild(fragment);
}

function renderServerButtons(servers) {
  DOM.serverBtns.innerHTML = "";
  if (!servers || typeof servers !== "object") return;
  
  Object.keys(servers).forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "server-btn" + (key === state.currentServer ? " active" : "");
    btn.textContent = `سيرفر ${key}`;
    btn.onclick = () => switchServer(key);
    DOM.serverBtns.appendChild(btn);
  });
}

function loadEpisode(ep) {
  state.currentEpisode = ep;
  
  // تحديث شكل الحلقات المختارة
  document.querySelectorAll(".episode-item").forEach((el) => el.classList.remove("active"));
  const activeItem = document.querySelector(`.episode-item[data-ep-num="${ep.num}"]`);
  if (activeItem) activeItem.classList.add("active");

  renderServerButtons(ep.servers);
  
  // اختيار أول سيرفر متاح إذا لم يتوفر الافتراضي
  const targetServerKey = ep.servers[state.currentServer] ? state.currentServer : Object.keys(ep.servers)[0];
  state.currentServer = targetServerKey;
  
  updatePlayer(ep.servers[targetServerKey], ep.title);
}

function switchServer(serverKey) {
  if (!state.currentEpisode || !state.currentEpisode.servers[serverKey]) return;
  
  state.currentServer = serverKey;
  
  // تحديث نشاط الأزرار
  document.querySelectorAll(".server-btn").forEach((btn, index) => {
      btn.classList.toggle("active", (index + 1).toString() === serverKey);
  });
  
  updatePlayer(state.currentEpisode.servers[serverKey], state.currentEpisode.title);
}

function updatePlayer(src, title) {
  if (!src) return;
  if (DOM.episodeTitle) DOM.episodeTitle.textContent = title ?? "";
  
  useIframePlayer(src);
}

function useIframePlayer(src) {
  if (DOM.videoPlayer) DOM.videoPlayer.style.display = "none";
  
  let iframe = DOM.playerWrapper.querySelector("iframe.toonia-iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.className = "toonia-iframe";
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "autoplay; fullscreen");
    DOM.playerWrapper.appendChild(iframe);
  }
  
  iframe.style.display = "block";
  iframe.src = src;
}

function showLoading(visible) {
  if (DOM.loadingOverlay) DOM.loadingOverlay.hidden = !visible;
}

function showError(message) {
  if (DOM.errorBox) {
    DOM.errorBox.hidden = false;
    DOM.errorMessage.textContent = message;
  }
}

function hideError() {
  if (DOM.errorBox) DOM.errorBox.hidden = true;
}

function escapeHtml(str) {
  return String(str ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function init() {
  cacheDom();
  hideError();
  showLoading(true);
  
  const animeId = getAnimeIdFromUrl();
  if (!animeId) {
    showLoading(false);
    showError("لم يتم تحديد الأنمي بشكل صحيح.");
    return;
  }
  
  try {
    const data = await fetchAnime(animeId);
    state.animeData = data;
    renderAnimeInfo(data);
    renderEpisodeList(data.episodes);
    
    // تشغيل الحلقة الأولى تلقائياً
    if (Array.isArray(data.episodes) && data.episodes.length > 0) {
      loadEpisode(data.episodes[0]);
    }
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
}

document.addEventListener("DOMContentLoaded", init);
