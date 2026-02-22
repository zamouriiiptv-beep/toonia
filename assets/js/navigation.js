'use strict';

/* ===================================== */
/* navigation.js                        */
/* التحكم في التنقّل (Menu / Search / Filter) */
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

  /* ─────────── البحث العلوي (Header Search) ─────────── */
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      body.classList.toggle('search-open');
    });
  }

  /* ─────────── فلاتر التصنيفات (Genres Filter) ─────────── */
  const genreButtons = document.querySelectorAll('.genre');
  const workCards = document.querySelectorAll('.work-card');

  if (genreButtons.length > 0) {
    genreButtons.forEach(button => {
      button.addEventListener('click', () => {
        // تحديث حالة الزر النشط
        genreButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.textContent.trim();

        workCards.forEach(card => {
          // جلب النوع من الخاصية data-type التي أضفناها في HTML
          const workType = card.getAttribute('data-type');

          if (filterValue === 'الكل' || filterValue === workType) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ─────────── البحث في المرفوعات (Section Search) ─────────── */
  const sectionSearchInput = document.querySelector('.section-search input');
  
  if (sectionSearchInput) {
    sectionSearchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

      workCards.forEach(card => {
        // البحث داخل عنوان الصورة (alt) أو اسم العمل
        const title = card.querySelector('img').getAttribute('alt').toLowerCase();
        
        if (title.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

});