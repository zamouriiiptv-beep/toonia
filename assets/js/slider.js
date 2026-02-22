'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  تهيئة السلايدرز                      */
  /* ===================================== */

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;

    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    if (!dotsWrapper) return;

    let activeIndex = 0;

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
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /*  تحديد الشريحة الحالية                */
    /* ===================================== */

    function updateActiveFromScroll() {
      const sliderLeft = slider.scrollLeft;

      let index = 0;
      let min = Infinity;

      slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - sliderLeft);
        if (dist < min) {
          min = dist;
          index = i;
        }
      });

      setActive(index);
    }

    slider.addEventListener('scroll', () => {
      requestAnimationFrame(updateActiveFromScroll);
    });

    setActive(0);
  });

  /* ===================================== */
  /*  الأسهم (ربط صريح بالـ data-target)   */
  /* ===================================== */

  document.querySelectorAll('.arrow').forEach(btn => {

    const targetId = btn.dataset.target;
    const slider = document.getElementById(targetId);
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    btn.addEventListener('click', () => {

      const step =
        slides[0].offsetWidth +
        (parseInt(getComputedStyle(slider).gap, 10) || 0);

      slider.scrollBy({
        left: btn.classList.contains('next') ? step : -step,
        behavior: 'smooth'
      });
    });
  });

});