'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  الإعدادات                            */
  /* ===================================== */

  const SLIDER_STATE = new WeakMap();

  function initSlider(slider) {
    const track = slider.querySelector('.slider-track');
    const slides = Array.from(track.children);

    SLIDER_STATE.set(slider, {
      track,
      slides,
      index: 0,
      width: slider.clientWidth,
      animating: false
    });

    slides.forEach(slide => {
      slide.style.width = slider.clientWidth + 'px';
      slide.style.flexShrink = '0';
    });

    update(slider, false);
  }

  /* ===================================== */
  /*  التحديث                              */
  /* ===================================== */

  function update(slider, animate = true) {
    const state = SLIDER_STATE.get(slider);
    if (!state) return;

    state.track.style.transition = animate
      ? 'transform 0.4s ease-in-out'
      : 'none';

    state.track.style.transform =
      `translateX(${-state.index * state.width}px)`;

    syncDots(slider);
  }

  /* ===================================== */
  /*  التحريك (صورة واحدة فقط)             */
  /* ===================================== */

  function next(slider) {
    const state = SLIDER_STATE.get(slider);
    if (!state || state.animating) return;

    if (state.index < state.slides.length - 1) {
      state.index++;
      update(slider);
    }
  }

  function prev(slider) {
    const state = SLIDER_STATE.get(slider);
    if (!state || state.animating) return;

    if (state.index > 0) {
      state.index--;
      update(slider);
    }
  }

  /* ===================================== */
  /*  النقاط                               */
  /* ===================================== */

  function syncDots(slider) {
    const state = SLIDER_STATE.get(slider);
    if (!state) return;

    const dotsWrap = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsWrap) return;

    dotsWrap.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('active', i === state.index);
    });
  }

  /* ===================================== */
  /*  ربط الأسهم                           */
  /* ===================================== */

  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {
    btn.addEventListener('click', () => {
      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      btn.classList.contains('next')
        ? next(slider)
        : prev(slider);
    });
  });

  /* ===================================== */
  /*  تهيئة النقاط                         */
  /* ===================================== */

  document.querySelectorAll('.slider-dots').forEach(dotsWrap => {
    const slider = document.getElementById(dotsWrap.dataset.slider);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    if (slides.length <= 1) {
      dotsWrap.style.display = 'none';
      return;
    }

    dotsWrap.innerHTML = '';
    dotsWrap.style.display = 'flex';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';

      dot.addEventListener('click', () => {
        const state = SLIDER_STATE.get(slider);
        if (!state) return;

        state.index = i;
        update(slider);
      });

      dotsWrap.appendChild(dot);
    });
  });

  /* ===================================== */
  /*  Resize                               */
  /* ===================================== */

  window.addEventListener('resize', () => {
    document.querySelectorAll('.slider').forEach(slider => {
      const state = SLIDER_STATE.get(slider);
      if (!state) return;

      state.width = slider.clientWidth;
      state.slides.forEach(slide => {
        slide.style.width = state.width + 'px';
      });

      update(slider, false);
    });
  });

  /* ===================================== */
  /*  INIT                                 */
  /* ===================================== */

  document.querySelectorAll('.slider').forEach(initSlider);

});