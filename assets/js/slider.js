'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  تهيئة كل سلايدر                      */
  /* ===================================== */

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );

    const section = slider.closest('section');
    const prevBtn = section.querySelector('.arrow.prev');
    const nextBtn = section.querySelector('.arrow.next');

    /* ===================================== */
    /*  حساب خطوة الحركة                     */
    /* ===================================== */

    function getStep() {
      const slide = slides[0];
      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      return slide.offsetWidth + gap;
    }

    /* ===================================== */
    /*  إنشاء النقاط تلقائيًا               */
    /* ===================================== */

    dotsWrapper.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slider.scrollTo({
          left: i * getStep(),
          behavior: 'smooth'
        });
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    /* ===================================== */
    /*  تحديد الشريحة النشطة                 */
    /* ===================================== */

    function getActiveIndex() {
      const step = getStep();
      return Math.round(slider.scrollLeft / step);
    }

    function updateDots() {
      const index = getActiveIndex();

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /*  الأسهم                               */
    /* ===================================== */

    nextBtn?.addEventListener('click', () => {
      slider.scrollBy({ left: getStep(), behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
      slider.scrollBy({ left: -getStep(), behavior: 'smooth' });
    });

    /* ===================================== */
    /*  المزامنة مع السحب                   */
    /* ===================================== */

    slider.addEventListener('scroll', () => {
      requestAnimationFrame(updateDots);
    });

    /* ===================================== */
    /*  تهيئة أولية                          */
    /* ===================================== */

    updateDots();

  });

});