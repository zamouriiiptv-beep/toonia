'use strict';

/* ===================================== */
/*  slider.js                            */
/*  منطق السلايدر العام (Progress Dots) */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* حساب خطوة الحركة (مرجع واحد للأسهم + النقاط) */
  function getStep(slider) {
    const slide = slider.querySelector('.slide');
    if (!slide) return 0;

    const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
    return slide.offsetWidth + gap;
  }

  /* مزامنة النقاط بأسلوب Progress مثل الهيدر */
  function syncDots(slider, step) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length || !step) return;

    const scroll = slider.scrollLeft;
    const exactIndex = scroll / step;

    const activeIndex = Math.floor(exactIndex);
    const progress = exactIndex - activeIndex; // 0 → 1

    dots.forEach((dot, i) => {
      const isActive = i === activeIndex;
      dot.classList.toggle('active', isActive);

      /* progress بصري مثل الهيدر */
      dot.style.setProperty(
        '--progress',
        isActive ? `${Math.min(progress * 100, 100)}%` : '0%'
      );
    });
  }

  /* ─────────── الأسهم ─────────── */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      const step = getStep(slider);

      slider.scrollBy({
        left: btn.classList.contains('next') ? step : -step,
        behavior: 'smooth'
      });

      /* تحديث النقاط بعد حركة السهم */
      setTimeout(() => syncDots(slider, step), 300);
    });

  });

  /* ─────────── النقاط ─────────── */
  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const slider = document.getElementById(dotsContainer.dataset.slider);
    if (!slider) return;

    let dots = [];

    function createDots() {
      dotsContainer.innerHTML = '';
      dots = [];

      const step = getStep(slider);
      if (!step) return;

      const count = Math.round(slider.scrollWidth / step);

      if (count <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';

      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * step,
            behavior: 'smooth'
          });
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
      }
    }

    function onScroll() {
      const step = getStep(slider);
      requestAnimationFrame(() => syncDots(slider, step));
    }

    createDots();
    onScroll();

    slider.addEventListener('scroll', onScroll);
    window.addEventListener('resize', () => {
      createDots();
      onScroll();
    });

  });

});