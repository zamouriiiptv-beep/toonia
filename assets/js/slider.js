'use strict';

/* ===================================== */
/*  slider.js                            */
/*  Scroll-based slider (Final Stable)   */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================== */
  /*  حساب الخطوة الحقيقية          */
  /* ============================== */
  function getStep(slider) {
    const slides = slider.querySelectorAll('.slide');
    if (slides.length < 2) return 0;
    return slides[1].offsetLeft - slides[0].offsetLeft;
  }

  /* ============================== */
  /*  تطبيع scrollLeft (RTL-safe)   */
  /* ============================== */
  function getScroll(slider) {
    const dir = getComputedStyle(slider).direction;

    if (dir !== 'rtl') return slider.scrollLeft;

    const max = slider.scrollWidth - slider.clientWidth;
    return Math.abs(slider.scrollLeft - max);
  }

  /* ============================== */
  /*  مزامنة النقاط                 */
  /* ============================== */
  function syncDots(slider) {
    const dotsWrap = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsWrap) return;

    const dots = dotsWrap.querySelectorAll('button');
    if (!dots.length) return;

    const step = getStep(slider);
    if (!step) return;

    const scroll = getScroll(slider);
    let index = Math.round(scroll / step);

    index = Math.max(0, Math.min(index, dots.length - 1));

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ============================== */
  /*  فرض البداية من أول صورة       */
  /* ============================== */
  function forceStart(slider) {
    // نضع السلايدر على أول عنصر فعليًا
    slider.scrollTo({ left: 0, behavior: 'auto' });
    syncDots(slider);
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
  document.querySelectorAll('.slider-dots').forEach(dotsWrap => {

    const slider = document.getElementById(dotsWrap.dataset.slider);
    if (!slider) return;

    function createDots() {
      dotsWrap.innerHTML = '';

      const step = getStep(slider);
      if (!step) return;

      const count = Math.round(slider.scrollWidth / step);

      if (count <= 1) {
        dotsWrap.style.display = 'none';
        return;
      }

      dotsWrap.style.display = 'flex';

      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * step,
            behavior: 'smooth'
          });
        });

        dotsWrap.appendChild(dot);
      }

      // ⬅️ مهم: فرض البداية بعد إنشاء النقاط
      forceStart(slider);
    }

    slider.addEventListener('scroll', () => {
      syncDots(slider);
    }, { passive: true });

    window.addEventListener('resize', createDots);

    createDots();
  });

});