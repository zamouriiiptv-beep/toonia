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

    // فتح القائمة
    openBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.style.display = 'block';
      body.style.overflow = 'hidden';
    });

    // إغلاق القائمة
    const closeSidebar = () => {
      sidebar.classList.remove('active');
      overlay.style.display = 'none';
      body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
  }

  /* ─────────── البحث (كما هو) ─────────── */
  const searchBtn = document.querySelector('.search-trigger');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      body.classList.toggle('search-open');
    });
  }

});