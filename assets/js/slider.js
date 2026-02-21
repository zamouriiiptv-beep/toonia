'use strict';

/* ===================================== */
/*  slider.js                            */
/*  Scroll-snap aware dots (FINAL)       */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {

    const section = slider.closest('section');
    if (!section) return;

    const dotsWrap = section.querySelector('.slider-dots');
    if (!dotsWrap) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length <= 1) return;

    dotsWrap.innerHTML = '';
    dotsWrap.style.display = 'flex';

    /* ============================== */
    /*  إنشاء النقاط                  */
    /* ============================== */
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slides[i].scrollIntoView({
          behavior: 'smooth',
          inline: 'start'
        });
      });

      dotsWrap.appendChild(dot);
    });

    const dots = Array.from(dotsWrap.children);

    /* ============================== */
    /*  تحديد السلايد النشط فعليًا    */
    /* ============================== */
    function getActiveIndex() {
      const sliderRect = slider.getBoundingClientRect();
      const startEdge = sliderRect.left; // start يعمل مع RTL/LTR

      let closestIndex = 0;
      let minDistance = Infinity;

      slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left - startEdge);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      return closestIndex;
    }

    /* ============================== */
    /*  مزامنة النقاط                 */
    /* ============================== */
    function syncDots() {
      const index = getActiveIndex();

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    /* ============================== */
    /*  التهيئة الأولى                */
    /* ============================== */
    slides[0].scrollIntoView({ behavior: 'auto', inline: 'start' });
    syncDots();

    /* ============================== */
    /*  الاستماع للتمرير              */
    /* ============================== */
    let raf = null;
    slider.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        syncDots();
        raf = null;
      });
    }, { passive: true });

    window.addEventListener('resize', syncDots);

  });

});