'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const sliders = document.querySelectorAll('.slider');

  sliders.forEach(slider => {

    const track = slider.querySelector('.slides');
    const slides = Array.from(track.children);
    const dots = Array.from(slider.querySelectorAll('.dot'));
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');

    if (!slides.length || !dots.length) return;

    /* ============================= */
    /*  حساب عرض الخطوة              */
    /* ============================= */
    function getStep() {
      const gap = parseInt(getComputedStyle(track).gap, 10) || 0;
      return slides[0].offsetWidth + gap;
    }

    /* ============================= */
    /*  تحديد الشريحة النشطة         */
    /* ============================= */
    function getActiveIndex() {
      const step = getStep();
      return Math.round(track.scrollLeft / step);
    }

    /* ============================= */
    /*  تحديث النقاط                 */
    /* ============================= */
    function updateDots() {
      const index = getActiveIndex();

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ============================= */
    /*  الأسهم                       */
    /* ============================= */
    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    /* ============================= */
    /*  النقر على النقاط             */
    /* ============================= */
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        track.scrollTo({
          left: i * getStep(),
          behavior: 'smooth'
        });
      });
    });

    /* ============================= */
    /*  المزامنة مع التمرير          */
    /* ============================= */
    track.addEventListener('scroll', () => {
      requestAnimationFrame(updateDots);
    });

    /* ============================= */
    /*  تهيئة أولية                  */
    /* ============================= */
    updateDots();
  });

});