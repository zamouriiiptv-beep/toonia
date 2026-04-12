/**
 * Toonia – watch.js
 * Handles: API fetch → render anime info → episode list → server switching
 * Vanilla JS only, no dependencies.
 */

"use strict";

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ► تم تغيير apiBase فقط للإشارة إلى Vercel Serverless Function
═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  apiBase: "/api/getAnime",
  defaultServer: "1",
};

/* ═══════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════ */
const state = {
  animeData: null,
  currentEpisode: null,
  currentServer: CONFIG.defaultServer,
};

/* ═══════════════════════════════════════════════════════════════
   DOM REFERENCES
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   URL HELPERS
═══════════════════════════════════════════════════════════════ */
function getAnimeIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  return Number.isFinite(id) ? id : null;
}

/* ═══════════════════════════════════════════════════════════════
   API
═══════════════════════════════════════════════════════════════ */
async function fetchAnime(id) {
  const url = `${CONFIG.apiBase}?id=${encodeURIComponent(id)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`خطأ في الاتصال بالخادم (HTTP ${response.status})`);
  }

  const json = await response.json();

  if (json.status !== "success" || !json.data) {
    throw new Error(json.message || "لم يتم العثور على الأنيمي المطلوب.");
  }

  return json.data;
}

/* ═══════════════════════════════════════════════════════════════
   RENDER – Anime Info
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   RENDER – Episode List
═══════════════════════════════════════════════════════════════ */
function renderEpisodeList(episodes) {
  DOM.episodeList.innerHTML = "";

  if (!Array.isArray(episodes) || episodes.length === 0) {
    DOM.episodeList.innerHTML = '<p class="no-episodes">لا توجد حلقات متاحة.</p>';
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
      <span class="ep-duration">${escapeHtml(ep.duration)}</span>
    `;

    item.addEventListener("click", () => loadEpisode(ep));
    fragment.appendChild(item);
  });

  DOM.episodeList.appendChild(fragment);
}

/* ═══════════════════════════════════════════════════════════════
   RENDER – Server Buttons
═══════════════════════════════════════════════════════════════ */
function renderServerButtons(servers) {
  DOM.serverBtns.innerHTML = "";

  if (!servers || typeof servers !== "object") return;

  Object.keys(servers).forEach((key) => {
    const btn = document.createElement("button");
    btn.className = "server-btn" + (key === state.currentServer ? " active" : "");
    btn.dataset.serverKey = key;
    btn.textContent = `سيرفر ${key}`;

    btn.addEventListener("click", () => switchServer(key));
    DOM.serverBtns.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════════════════
   PLAYBACK LOGIC
═══════════════════════════════════════════════════════════════ */
function loadEpisode(ep) {
  state.currentEpisode = ep;
  state.currentServer  = CONFIG.defaultServer;

  document
    .querySelectorAll(".episode-item")
    .forEach((el) => el.classList.remove("active"));

  const activeItem = document.querySelector(
    `.episode-item[data-ep-num="${ep.num}"]`
  );
  if (activeItem) {
    activeItem.classList.add("active");
    activeItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  renderServerButtons(ep.servers);
  updatePlayer(ep.servers[state.currentServer], ep.title);
}

function switchServer(serverKey) {
  if (!state.currentEpisode) return;

  const url = state.currentEpisode.servers[serverKey];
  if (!url) {
    console.warn(`Server "${serverKey}" not found for this episode.`);
    return;
  }

  state.currentServer = serverKey;

  document.querySelectorAll(".server-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.serverKey === serverKey);
  });

  updatePlayer(url, state.currentEpisode.title);
}

function updatePlayer(src, title) {
  if (DOM.episodeTitle) {
    DOM.episodeTitle.textContent = title ?? "";
  }

  if (isEmbedUrl(src)) {
    useIframePlayer(src);
  } else {
    useVideoPlayer(src);
  }
}

function isEmbedUrl(src) {
  const embedHosts = ["uqload", "streamtape", "doodstream", "vidplay", "myvidplay"];
  try {
    const hostname = new URL(src).hostname;
    return embedHosts.some((h) => hostname.includes(h));
  } catch {
    return false;
  }
}

function useVideoPlayer(src) {
  const existingIframe = DOM.playerWrapper.querySelector("iframe.toonia-iframe");
  if (existingIframe) existingIframe.remove();

  DOM.videoPlayer.style.display = "block";
  DOM.videoSource.src = src;
  DOM.videoPlayer.load();
  DOM.videoPlayer.play().catch(() => {});
}

function useIframePlayer(src) {
  DOM.videoPlayer.style.display = "none";

  let iframe = DOM.playerWrapper.querySelector("iframe.toonia-iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.className = "toonia-iframe";
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("frameborder", "0");
    DOM.playerWrapper.appendChild(iframe);
  }
  iframe.src = src;
}

/* ═══════════════════════════════════════════════════════════════
   UI STATE
═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════════ */
function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
async function init() {
  cacheDom();
  hideError();
  showLoading(true);

  const animeId = getAnimeIdFromUrl();

  if (!animeId) {
    showLoading(false);
    showError("لم يتم تحديد الأنيمي. تأكد من أن الرابط يحتوي على ?id=...");
    return;
  }

  try {
    const data = await fetchAnime(animeId);
    state.animeData = data;

    renderAnimeInfo(data);
    renderEpisodeList(data.episodes);

    if (Array.isArray(data.episodes) && data.episodes.length > 0) {
      loadEpisode(data.episodes[0]);
    }
  } catch (err) {
    showError(err.message || "حدث خطأ غير متوقع. حاول مجدداً.");
    console.error("[Toonia]", err);
  } finally {
    showLoading(false);
  }
}

document.addEventListener("DOMContentLoaded", init);
