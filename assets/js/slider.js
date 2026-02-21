'use strict';

/* ===================================== */
/*  slider.js                            */
/*  منطق السلايدر العام                  */
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

    return slide.getBoundingClientRect().width + gap;
  }

  /* ============================== */
  /*  حساب الإندكس الحالي بدقة      */
  /* ============================== */
  function getCurrentIndex(slider, step) {
    if (!step) return 0;
    return Math.round(slider.scrollLeft / step);
  }

  /* ============================== */
  /*  مزامنة النقاط                 */
  /* ============================== */
  function syncDots(slider) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const step = getStep(slider);
    const index = getCurrentIndex(slider, step);

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

      const direction = btn.classList.contains('next') ? 1 : -1;

      slider.scrollTo({
        left: slider.scrollLeft + step * direction,
        behavior: 'smooth'
      });

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
        dot.type = 'button';

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * step,
            behavior: 'smooth'
          });
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
      }

      syncDots(slider);
    }

    /* ============================== */
    /*  التمرير (سحب / عجلة / أسهم) */
    /* ============================== */
    let rafId = null;

    function onScroll() {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        syncDots(slider);
        rafId = null;
      });
    }

    createDots();

    slider.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', createDots);

  });

});