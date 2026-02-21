'use strict';

/* ===================================== */
/*  slider.js                            */
/*  منطق السلايدر العام                  */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────── مزامنة النقاط ─────────── */
  function syncDots(slider) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const wrapper = slider.closest('.slider-wrapper');
    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const index = Math.round(slider.scrollLeft / wrapper.offsetWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  /* ─────────── أسهم السلايدر ─────────── */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const sliderId = btn.dataset.target;
      const slider = document.getElementById(sliderId);
      if (!slider) return;

      const slide = slider.querySelector('.slide');
      if (!slide) return;

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const amount = slide.offsetWidth + gap;

      slider.scrollBy({
        left: btn.classList.contains('next') ? amount : -amount,
        behavior: 'smooth'
      });

      /* مزامنة النقاط بعد حركة السهم */
      setTimeout(() => syncDots(slider), 300);

    });

  });

  /* ─────────── نقاط السلايدر (Dots) ─────────── */
  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const sliderId = dotsContainer.dataset.slider;
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const wrapper = slider.closest('.slider-wrapper');
    let dots = [];

    function createDots() {
      dotsContainer.innerHTML = '';
      dots = [];

      const wrapperWidth = wrapper.offsetWidth;

      const pages = Math.ceil(
        (slider.scrollWidth - wrapperWidth) / wrapperWidth
      ) + 1;

      if (pages <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';

      for (let i = 0; i < pages; i++) {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * wrapperWidth,
            behavior: 'smooth'
          });
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function updateActiveDot() {
      const index = Math.round(slider.scrollLeft / wrapper.offsetWidth);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    createDots();
    updateActiveDot();

    slider.addEventListener('scroll', () => {
      requestAnimationFrame(updateActiveDot);
    });

    window.addEventListener('resize', () => {
      createDots();
      updateActiveDot();
    });

  });

});