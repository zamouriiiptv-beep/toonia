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

    const arrows = document.querySelectorAll(
      `.arrow[data-target="${sliderId}"]`
    );

    /* ===================================== */
    /*  الحالة (مصدر الحقيقة الوحيد)        */
    /* ===================================== */
    let activeIndex = 0;
    let isProgrammatic = false;

    /* ===================================== */
    /*  إنشاء نقاط السلايدر                 */
    /* ===================================== */
    dotsWrapper.innerHTML = '';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';

      dot.addEventListener('click', () => {
        scrollToIndex(i);
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    function setActive(index) {
      if (index === activeIndex) return;

      activeIndex = index;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /*  التمرير إلى شريحة حسب الفهرس         */
    /* ===================================== */
    function scrollToIndex(index) {
      index = Math.max(0, Math.min(slides.length - 1, index));

      isProgrammatic = true;

      slider.scrollTo({
        left: slides[index].offsetLeft,
        behavior: 'smooth'
      });

      setActive(index);

      setTimeout(() => {
        isProgrammatic = false;
      }, 300);
    }

    /* ===================================== */
    /*  تحديث الشريحة النشطة أثناء السحب     */
    /* ===================================== */
    function updateFromScroll() {
      if (isProgrammatic) return;

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const step = slides[0].offsetWidth + gap;

      let index = Math.round(slider.scrollLeft / step);
      index = Math.max(0, Math.min(slides.length - 1, index));

      setActive(index);
    }

    slider.addEventListener(
      'scroll',
      () => {
        requestAnimationFrame(updateFromScroll);
      },
      { passive: true }
    );

    /* ===================================== */
    /*  أزرار التنقل (الأسهم)               */
    /* ===================================== */
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        scrollToIndex(
          btn.classList.contains('next')
            ? activeIndex + 1
            : activeIndex - 1
        );
      });
    });

    /* ===================================== */
    /*  التهيئة الأولية                     */
    /* ===================================== */
    setActive(0);
    slider.scrollLeft = 0;

  });

});