'use strict';

/* ===================================== */
/*  slider.js                            */
/*  Bullet-proof slider dots             */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {

    const dotsWrap = slider.closest('section')?.querySelector('.slider-dots');
    if (!dotsWrap) return;

    const slides = slider.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    dotsWrap.innerHTML = '';
    dotsWrap.style.display = 'flex';

    /* ============================== */
    /*  حساب الخطوة الحقيقية          */
    /* ============================== */
    function getStep() {
      if (slides.length < 2) return 0;
      return slides[1].offsetLeft - slides[0].offsetLeft;
    }

    /* ============================== */
    /*  تطبيع scrollLeft (RTL-safe)   */
    /* ============================== */
    function getScroll() {
      const dir = getComputedStyle(slider).direction;
      if (dir !== 'rtl') return slider.scrollLeft;

      const max = slider.scrollWidth - slider.clientWidth;
      return Math.abs(slider.scrollLeft - max);
    }

    /* ============================== */
    /*  إنشاء النقاط                  */
    /* ============================== */
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        const step = getStep();
        if (!step) return;

        slider.scrollTo({
          left: i * step,
          behavior: 'smooth'
        });
      });

      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('button');

    /* ============================== */
    /*  مزامنة النقطة النشطة          */
    /* ============================== */
    function syncDots() {
      const step = getStep();
      if (!step) return;

      const index = Math.round(getScroll() / step);

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    /* ============================== */
    /*  البداية من أول صورة           */
    /* ============================== */
    slider.scrollTo({ left: 0, behavior: 'auto' });
    syncDots();

    slider.addEventListener('scroll', syncDots, { passive: true });
    window.addEventListener('resize', syncDots);

  });

});