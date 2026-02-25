'use strict';

/* ===================================== */
/*  navigation.js                        */
/*  التحكم في القائمة الجانبية والبحث     */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* ─────────── السايدبار ─────────── */
  const openBtn  = document.getElementById('aniOpen');
  const sidebar  = document.getElementById('aniSidebar');
  const overlay  = document.getElementById('aniOverlay');
  const closeBtn = document.getElementById('aniClose');

  if (openBtn && sidebar && overlay && closeBtn) {

    openBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.style.display = 'block';
      body.style.overflow = 'hidden';
    });

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
      body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
  }

  /* ─────────── البحث ─────────── */
  const searchBtn = document.querySelector('.search-trigger');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      body.classList.toggle('search-open');
    });
  }

  /* ─────────── مشغل الحلقات + active ─────────── */

  const episodeItems = document.querySelectorAll('.episode-item');
  const playerBox    = document.getElementById('playerBox');
  const poster       = document.getElementById('playerPoster');
  const playOverlay  = document.getElementById('playOverlay');

  episodeItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      /* تفعيل الحلقة */
      episodeItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      /* جلب رابط الفيديو */
      const videoUrl = item.getAttribute('data-video');
      if (!videoUrl || !playerBox) return;

      /* حذف الصورة والنص */
      if (poster) poster.remove();
      if (playOverlay) playOverlay.remove();

      /* إدخال المشغّل مكان الصورة */
      playerBox.innerHTML = `
        <iframe
          src="${videoUrl}"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          style="width:100%; height:100%;">
        </iframe>
      `;
    });
  });

});