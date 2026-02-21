'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  تحديد الشريحة الأقرب إلى المنتصف     */
  /* ===================================== */
  function getIndexByCenter(slider) {
    const slides = slider.querySelectorAll('.slide');
    if (!slides.length) return 0;

    const sliderRect = slider.getBoundingClientRect();
    const sliderCenter = sliderRect.left + sliderRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width / 2;
      const distance = Math.abs(slideCenter - sliderCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  /* ===================================== */
  /*  مزامنة النقاط                        */
  /* ===================================== */
  function syncDots(slider) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const index = slider._hasInteracted
      ? getIndexByCenter(slider)
      : 0;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ===================================== */
  /*  الأسهم (Prev / Next)                 */
  /* ===================================== */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {
    btn.addEventListener('click', () => {

      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      const slides = slider.querySelectorAll('.slide');
      if (!slides.length) return;

      slider._hasInteracted = true;

      let currentIndex = getIndexByCenter(slider);

      /* ---- إصلاح سهم الرجوع ---- */
      if (btn.classList.contains('prev')) {
        const rect = slides[currentIndex].getBoundingClientRect();
        const sliderRect = slider.getBoundingClientRect();

        // إذا لم تكن الشريحة الحالية مصطفّة فعليًا للبداية
        if (rect.left > sliderRect.left + 1 && currentIndex > 0) {
          currentIndex -= 1;
        }
      }

      const direction = btn.classList.contains('next') ? 1 : -1;

      let targetIndex = currentIndex + direction;
      targetIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));

      slides[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      // فرض تحديث النقاط حتى لو لم يحدث scroll فعلي
      requestAnimationFrame(() => {
        syncDots(slider);
      });
    });
  });

  /* ===================================== */
  /*  النقاط + التهيئة                     */
  /* ===================================== */
  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const slider = document.getElementById(dotsContainer.dataset.slider);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    if (!slides.length) return;

    slider._hasInteracted = false;
    dotsContainer.innerHTML = '';

    if (slides.length <= 1) {
      dotsContainer.style.display = 'none';
      return;
    }

    dotsContainer.style.display = 'flex';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slider._hasInteracted = true;

        slides[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });

        requestAnimationFrame(() => {
          syncDots(slider);
        });
      });

      dotsContainer.appendChild(dot);
    });

    /* ---- فرض البداية من أول شريحة ---- */
    slides[0].scrollIntoView({
      block: 'nearest',
      inline: 'start'
    });

    slider._hasInteracted = false;
    syncDots(slider);

    /* ===================================== */
    /*  التمرير اليدوي (Drag / Wheel)       */
    /* ===================================== */
    let ticking = false;

    slider.addEventListener('scroll', () => {
      slider._hasInteracted = true;

      if (!ticking) {
        requestAnimationFrame(() => {
          syncDots(slider);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      syncDots(slider);
    });
  });

});