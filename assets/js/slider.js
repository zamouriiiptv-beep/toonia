'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  تهيئة جميع السلايدرز                 */
  /* ===================================== */

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    if (!dotsWrapper) return;

    /* ========= الحالة ========= */
    let activeIndex = 0;                 // المصدر الوحيد للحقيقة
    let isProgrammatic = false;
    let scrollTimeout = null;

    /* ===================================== */
    /*  إنشاء النقاط                         */
    /* ===================================== */

    dotsWrapper.innerHTML = '';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        scrollToIndex(i);
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    function setActive(index) {
      if (index === activeIndex) return;

      activeIndex = index;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /*  التمرير إلى شريحة حسب index          */
    /* ===================================== */

    function scrollToIndex(index) {
      index = Math.max(0, Math.min(slides.length - 1, index));

      isProgrammatic = true;

      slider.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth'
      });

      setActive(index);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isProgrammatic = false;
      }, 300);
    }

    /* ===================================== */
    /*  تحديد الشريحة النشطة من التمرير      */
    /* ===================================== */

    function updateActiveFromScroll() {
      if (isProgrammatic) return;

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const step = slides[0].offsetWidth + gap;

      let index = Math.round(slider.scrollLeft / step);

      if (index < 0) index = 0;
      if (index > slides.length - 1) index = slides.length - 1;

      setActive(index);
    }

    slider.addEventListener(
      'scroll',
      () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveFromScroll, 60);
      },
      { passive: true }
    );

    /* ===================================== */
    /*  تهيئة أولية                          */
    /* ===================================== */

    setActive(0);
    slider.scrollLeft = 0;
  });

  /* ===================================== */
  /*  الأسهم (data-target)                 */
  /* ===================================== */

  document.querySelectorAll('.arrow').forEach(btn => {

    const targetId = btn.dataset.target;
    const slider = document.getElementById(targetId);
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    let activeIndex = 0;

    btn.addEventListener('click', () => {

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const step = slides[0].offsetWidth + gap;

      activeIndex = Math.round(slider.scrollLeft / step);

      const nextIndex = btn.classList.contains('next')
        ? activeIndex + 1
        : activeIndex - 1;

      const index = Math.max(0, Math.min(slides.length - 1, nextIndex));

      slider.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth'
      });
    });
  });

});