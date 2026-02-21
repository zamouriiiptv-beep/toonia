'use strict';

/* ===================================== */
/*  slider.js                            */
/*  منطق السلايدر العام                  */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  function getStep(slider) {
    const slide = slider.querySelector('.slide');
    if (!slide) return 0;

    const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
    return slide.offsetWidth + gap;
  }

  function syncDots(slider, step) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const index = Math.round(slider.scrollLeft / step);
    dots.forEach((dot, i) =>
      dot.classList.toggle('active', i === index)
    );
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
    window.addEventListener('resize', createDots);

  });

});