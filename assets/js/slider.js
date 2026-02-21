'use strict';

/* ===================================== */
/*  slider.js                            */
/*  منطق السلايدر العام (Stable)         */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================== */
  /*  حساب خطوة السلايدر            */
  /* ============================== */
  function getStep(slider) {
    const slide = slider.querySelector('.slide');
    if (!slide) return 0;

    const styles = getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return slide.offsetWidth + gap;
  }

  /* ============================== */
  /*  مزامنة النقاط (نهائي)         */
  /* ============================== */
  function syncDots(slider) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const step = getStep(slider);
    if (!step) return;

    const maxIndex = dots.length - 1;

    let index = Math.round(slider.scrollLeft / step);
    index = Math.max(0, Math.min(index, maxIndex));

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ─────────── الأسهم ─────────── */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      const step = getStep(slider);
      if (!step) return;

      const dir = btn.classList.contains('next') ? 1 : -1;

      slider.scrollBy({
        left: step * dir,
        behavior: 'smooth'
      });

    });

  });

  /* ─────────── النقاط ─────────── */
  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const slider = document.getElementById(dotsContainer.dataset.slider);
    if (!slider) return;

    function createDots() {
      dotsContainer.innerHTML = '';

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
        dot.type = 'button';

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * step,
            behavior: 'smooth'
          });
        });

        dotsContainer.appendChild(dot);
      }

      syncDots(slider);
    }

    /* ============================== */
    /*  التمرير (سحب / عجلة)         */
    /* ============================== */
    slider.addEventListener('scroll', () => {
      syncDots(slider);
    }, { passive: true });

    window.addEventListener('resize', createDots);

    createDots();
  });

});