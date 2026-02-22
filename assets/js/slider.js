'use strict';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    if (!dotsWrapper) return;

    const section = slider.closest('section');
    const prevBtn = section.querySelector('.arrow.prev');
    const nextBtn = section.querySelector('.arrow.next');

    /* ============================= */
    /*  إنشاء النقاط                 */
    /* ============================= */
    dotsWrapper.innerHTML = '';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slides[i].scrollIntoView({
          behavior: 'smooth',
          inline: 'start'
        });
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    /* ============================= */
    /*  تحديد الشريحة النشطة         */
    /* ============================= */
    function updateActiveDot() {
      const sliderLeft = slider.getBoundingClientRect().left;

      let activeIndex = 0;
      let minDistance = Infinity;

      slides.forEach((slide, index) => {
        const slideLeft = slide.getBoundingClientRect().left;
        const distance = Math.abs(slideLeft - sliderLeft);

        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[activeIndex]) dots[activeIndex].classList.add('active');
    }

    /* ============================= */
    /*  الأسهم                       */
    /* ============================= */
    function scrollByOne(direction) {
      const current = dots.findIndex(dot =>
        dot.classList.contains('active')
      );

      const next = Math.max(
        0,
        Math.min(slides.length - 1, current + direction)
      );

      slides[next].scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      });
    }

    nextBtn?.addEventListener('click', () => scrollByOne(1));
    prevBtn?.addEventListener('click', () => scrollByOne(-1));

    /* ============================= */
    /*  التمرير اليدوي               */
    /* ============================= */
    slider.addEventListener('scroll', () => {
      requestAnimationFrame(updateActiveDot);
    });

    /* ============================= */
    /*  تهيئة أولية                  */
    /* ============================= */
    updateActiveDot();

  });

});