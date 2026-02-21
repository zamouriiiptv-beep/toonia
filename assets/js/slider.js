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
  /*  حساب الإندكس حسب المنتصف      */
  /* ============================== */
  function getIndexByCenter(slider) {
    const slides = slider.querySelectorAll('.slide');
    if (!slides.length) return 0;

    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - sliderCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
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
    const scroll = slider.scrollLeft;

    let index;

    // عند بداية السلايدر فقط
    if (!slider._hasInteracted || scroll < step / 2) {
      index = 0;
    } else {
      index = getIndexByCenter(slider);
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ─────────── الأسهم ─────────── */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      slider._hasInteracted = true;

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

    slider._hasInteracted = false;

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
          slider._hasInteracted = true;

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
    let rafId = null;

    function onScroll() {
      slider._hasInteracted = true;

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