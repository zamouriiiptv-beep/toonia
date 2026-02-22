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

    const arrows = document.querySelectorAll(
      `.arrow[data-target="${sliderId}"]`
    );

    /* ============================= */
    /*  الحالة (مصدر الحقيقة)        */
    /* ============================= */
    let activeIndex = 0;
    let isProgrammatic = false;

    /* ============================= */
    /*  إنشاء النقاط                 */
    /* ============================= */
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

    /* ============================= */
    /*  تمرير إلى شريحة              */
    /* ============================= */
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

    /* ============================= */
    /*  تحديد النشط أثناء السحب      */
    /* ============================= */
    function updateFromScroll() {
      if (isProgrammatic) return;

      const sliderRect = slider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      slides.forEach((slide, i) => {
        const rect = slide.getBoundingClientRect();
        const slideCenter = rect.left + rect.width / 2;
        const distance = Math.abs(slideCenter - sliderCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });

      setActive(closestIndex);
    }

    slider.addEventListener(
      'scroll',
      () => {
        requestAnimationFrame(updateFromScroll);
      },
      { passive: true }
    );

    /* ============================= */
    /*  الأسهم                       */
    /* ============================= */
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        scrollToIndex(
          btn.classList.contains('next')
            ? activeIndex + 1
            : activeIndex - 1
        );
      });
    });

    /* ============================= */
    /*  التهيئة الأولية              */
    /* ============================= */
    setActive(0);
    slider.scrollLeft = 0;

  });

});