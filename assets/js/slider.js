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

  /* الشريحة الأقرب للمركز (للنقاط فقط) */
  function getIndexByCenter(slider) {
    const slides = getSlides(slider);
    if (!slides.length) return 0;

    const sliderRect = getSliderRect(slider);
    const center = sliderRect.left + sliderRect.width / 2;

    let index = 0;
    let min = Infinity;

    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const c = r.left + r.width / 2;
      const d = Math.abs(c - center);
      if (d < min) {
        min = d;
        index = i;
      }
    });

    return index;
  }

  /* ===================================== */
  /*  الأسهم – منطق صحيح                   */
  /* ===================================== */

  function scrollNext(slider) {
    const slides = getSlides(slider);
    const sliderRect = getSliderRect(slider);

    // أول شريحة غير مرئية بالكامل
    const target = slides.find(slide => {
      const r = slide.getBoundingClientRect();
      return r.right > sliderRect.right + 1;
    });

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }

  function scrollPrev(slider) {
    const slides = getSlides(slider);
    const sliderRect = getSliderRect(slider);

    // آخر شريحة غير مرئية بالكامل
    const target = [...slides].reverse().find(slide => {
      const r = slide.getBoundingClientRect();
      return r.left < sliderRect.left - 1;
    });

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }

  /* ===================================== */
  /*  مزامنة النقاط                        */
  /* ===================================== */

  function syncDots(slider) {
    const dotsWrap = document.querySelector(`.slider-dots[data-slider="${slider.id}"]`);
    if (!dotsWrap) return;

    const dots = dotsWrap.querySelectorAll('button');
    if (!dots.length) return;

    const index = slider._hasInteracted ? getIndexByCenter(slider) : 0;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
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

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slider._hasInteracted = true;
        slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        requestAnimationFrame(() => syncDots(slider));
      });

      dotsWrap.appendChild(dot);
    });

    /* فرض البداية */
    slides[0].scrollIntoView({ inline: 'start', block: 'nearest' });
    syncDots(slider);

    /* تمرير يدوي */
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