'use strict';

/* ===================================== */
/*  navigation.js                        */
/*  التحكم في التنقّل (Menu / Search)    */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* ─────────── القائمة الجانبية ─────────── */
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      body.classList.toggle('menu-open');
    });
  }

  /* ─────────── البحث ─────────── */
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      body.classList.toggle('search-open');
    });
  }

});