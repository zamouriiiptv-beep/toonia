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

    let activeIndex = 0; // المصدر الوحيد للحقيقة

    /* ===================================== */
    /*  إنشاء النقاط                         */
    /* ===================================== */

    dotsWrapper.innerHTML = '';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slider.scrollTo({
          left: slides[i].offsetLeft,
          behavior: 'smooth'
        });
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    function setActive(index) {
      activeIndex = index;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /*  تحديد الشريحة النشطة                 */
    /* ===================================== */

    function updateActiveFromScroll() {

      /* 🔒 تثبيت البداية */
      if (slider.scrollLeft < 5) {
        setActive(0);
        return;
      }

      const scrollLeft = slider.scrollLeft;

      let index = 0;
      let minDistance = Infinity;

      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          index = i;
        }
      });

      setActive(index);
    }

    slider.addEventListener('scroll', () => {
      requestAnimationFrame(updateActiveFromScroll);
    });

    /* ===================================== */
    /*  تهيئة أولية                          */
    /* ===================================== */

    setActive(0);
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

    btn.addEventListener('click', () => {

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const step = slides[0].offsetWidth + gap;

      slider.scrollBy({
        left: btn.classList.contains('next') ? step : -step,
        behavior: 'smooth'
      });
    });
  });

});