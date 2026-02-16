'use strict';

/* ===================================== */
/*  انتظار تحميل الصفحة بالكامل          */
/* ===================================== */

document.addEventListener('DOMContentLoaded', function () {

  const body = document.body;

  /* ================================= */
  /*  التحكم في فتح/إغلاق القائمة      */
  /* ================================= */

  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      body.classList.toggle('menu-open');
    });
  }

  /* ================================= */
  /*  زر البحث                         */
  /* ================================= */

  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      body.classList.toggle('search-open');
    });
  }

  /* ================================== */
  /*  أسهم السلايدر (Transform Based)  */
  /* ================================== */

  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    const sliderId = btn.dataset.target;
    const track = document.getElementById(sliderId);
    if (!track) return;

    const slides = track.children;
    if (!slides.length) return;

    const gap = parseInt(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].offsetWidth + gap;

    let index = 0;
    const maxIndex = slides.length - 1;

    btn.addEventListener('click', () => {

      if (btn.classList.contains('next')) {
        if (index < maxIndex) index++;
      } else {
        if (index > 0) index--;
      }

      track.style.transform =
        `translateX(-${index * slideWidth}px)`;
    });

  });

  /* ================================== */
  /*  Slider Dots (Transform Based)     */
  /* ================================== */

  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const sliderId = dotsContainer.dataset.slider;
    const track = document.getElementById(sliderId);
    if (!track) return;

    const wrapper = track.closest('.slider-wrapper');
    const slides = track.children;
    if (!slides.length) return;

    const gap = parseInt(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].offsetWidth + gap;

    let dots = [];
    let index = 0;

    function createDots() {
      dotsContainer.innerHTML = '';
      dots = [];

      const wrapperWidth = wrapper.offsetWidth;
      const slidesPerView = Math.floor(wrapperWidth / slideWidth);
      const pages = Math.ceil(slides.length / slidesPerView);

      if (pages <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';

      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');

        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
          index = i * slidesPerView;
          track.style.transform =
            `translateX(-${index * slideWidth}px)`;
          updateActiveDot();
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function updateActiveDot() {
      const slidesPerView =
        Math.floor(wrapper.offsetWidth / slideWidth);

      const activeIndex =
        Math.floor(index / slidesPerView);

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    /* تشغيل */
    createDots();
    updateActiveDot();

    window.addEventListener('resize', () => {
      createDots();
      updateActiveDot();
    });

  });

});
