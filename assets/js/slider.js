'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ============================== */
  /*  تحديد الشريحة حسب المركز     */
  /* ============================== */
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

  /* ============================== */
  /*  مزامنة النقاط                */
  /* ============================== */
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

  /* ============================== */
  /*  الأسهم                       */
  /* ============================== */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      const slides = slider.querySelectorAll('.slide');
      if (!slides.length) return;

      slider._hasInteracted = true;

      const currentIndex = getIndexByCenter(slider);
      const direction = btn.classList.contains('next') ? 1 : -1;

      let targetIndex = currentIndex + direction;
      targetIndex = Math.max(0, Math.min(slides.length - 1, targetIndex));

      slides[targetIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      // 🔴 مهم: فرض التحديث حتى لو لم يحدث scroll
      requestAnimationFrame(() => {
        syncDots(slider);
      });
    });
  });

  /* ============================== */
  /*  النقاط + التهيئة             */
  /* ============================== */
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

        // 🔴 نفس الفكرة هنا
        requestAnimationFrame(() => {
          syncDots(slider);
        });
      });

      dotsContainer.appendChild(dot);
    });

    /* ============================== */
    /*  فرض البداية الصحيحة          */
    /* ============================== */
    const firstSlide = slides[0];
    firstSlide.scrollIntoView({
      block: 'nearest',
      inline: 'start'
    });

    slider._hasInteracted = false;
    syncDots(slider);

    /* ============================== */
    /*  التمرير اليدوي              */
    /* ============================== */
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