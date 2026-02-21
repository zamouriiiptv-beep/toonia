'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  أدوات مساعدة                         */
  /* ===================================== */

  function getSlides(slider) {
    return Array.from(slider.querySelectorAll('.slide'));
  }

  function getSliderRect(slider) {
    return slider.getBoundingClientRect();
  }

  /* ===================================== */
  /*  تحديد الشريحة النشطة (حواف + مركز)  */
  /* ===================================== */
  function getActiveIndex(slider) {
    const slides = getSlides(slider);
    if (!slides.length) return 0;

    const sliderRect = getSliderRect(slider);

    // بداية السلايدر
    const firstRect = slides[0].getBoundingClientRect();
    if (firstRect.left >= sliderRect.left - 1) {
      return 0;
    }

    // نهاية السلايدر
    const lastRect = slides[slides.length - 1].getBoundingClientRect();
    if (lastRect.right <= sliderRect.right + 1) {
      return slides.length - 1;
    }

    // الحالة العادية: الأقرب إلى المركز
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
    const dotsWrap = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsWrap) return;

    const dots = dotsWrap.querySelectorAll('button');
    if (!dots.length) return;

    const index = slider._hasInteracted
      ? getActiveIndex(slider)
      : 0;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ===================================== */
  /*  منطق الأسهم (Viewport-based)        */
  /* ===================================== */

  function scrollNext(slider) {
    const slides = getSlides(slider);
    const sliderRect = getSliderRect(slider);

    const target = slides.find(slide => {
      const r = slide.getBoundingClientRect();
      return r.right > sliderRect.right + 1;
    });

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
    }
  }

  function scrollPrev(slider) {
    const slides = getSlides(slider);
    const sliderRect = getSliderRect(slider);

    const target = [...slides].reverse().find(slide => {
      const r = slide.getBoundingClientRect();
      return r.left < sliderRect.left - 1;
    });

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });
    }
  }

  /* ===================================== */
  /*  ربط الأسهم                           */
  /* ===================================== */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      slider._hasInteracted = true;

      if (btn.classList.contains('next')) {
        scrollNext(slider);
      } else {
        scrollPrev(slider);
      }

      requestAnimationFrame(() => syncDots(slider));
    });
  });

  /* ===================================== */
  /*  النقاط + التهيئة                     */
  /* ===================================== */
  document.querySelectorAll('.slider-dots').forEach(dotsWrap => {

    const slider = document.getElementById(dotsWrap.dataset.slider);
    if (!slider) return;

    const slides = getSlides(slider);
    if (!slides.length) return;

    slider._hasInteracted = false;
    dotsWrap.innerHTML = '';

    if (slides.length <= 1) {
      dotsWrap.style.display = 'none';
      return;
    }

    dotsWrap.style.display = 'flex';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slider._hasInteracted = true;

        slides[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest'
        });

        requestAnimationFrame(() => syncDots(slider));
      });

      dotsWrap.appendChild(dot);
    });

    /* فرض البداية من أول شريحة */
    slides[0].scrollIntoView({
      inline: 'start',
      block: 'nearest'
    });

    syncDots(slider);

    /* ===================================== */
    /*  التمرير اليدوي                      */
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
  });

});