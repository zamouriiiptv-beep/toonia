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

    let activeIndex = 0; // ← الحقيقة الوحيدة

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
    /*  تحديث النقطة النشطة          */
    /* ============================= */
    function updateActiveDot(index) {
      activeIndex = index;

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ============================= */
    /*  تحديد الشريحة الحالية        */
    /* ============================= */
    function detectActiveSlide() {
      const sliderLeft = slider.getBoundingClientRect().left;

      let minDistance = Infinity;
      let index = activeIndex;

      slides.forEach((slide, i) => {
        const distance =
          Math.abs(slide.getBoundingClientRect().left - sliderLeft);

        if (distance < minDistance) {
          minDistance = distance;
          index = i;
        }
      });

      updateActiveDot(index);
    }

    /* ============================= */
    /*  الأسهم (تعتمد على index)     */
    /* ============================= */
    function scrollByOne(direction) {
      const next = Math.max(
        0,
        Math.min(slides.length - 1, activeIndex + direction)
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
      requestAnimationFrame(detectActiveSlide);
    });

    /* ============================= */
    /*  تهيئة أولية                  */
    /* ============================= */
    updateActiveDot(0);

  });

});