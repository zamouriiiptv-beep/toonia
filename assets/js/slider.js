'use strict';

document.addEventListener('DOMContentLoaded', () => {

  setTimeout(initSliders, 200);

  function initSliders() {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
      const sliderId = slider.id;
      if (!sliderId) return;

      const slides = slider.querySelectorAll('.slide');
      const dotsContainer = document.querySelector(`.slider-dots[data-slider="${sliderId}"]`);
      const prevBtn = document.querySelector(`.arrow.prev[data-target="${sliderId}"]`);
      const nextBtn = document.querySelector(`.arrow.next[data-target="${sliderId}"]`);

      if (!slides.length || !dotsContainer) return;

      dotsContainer.innerHTML = '';

      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dot.setAttribute('aria-label', `الانتقال إلى الشريحة ${i + 1}`);
        dotsContainer.appendChild(dot);

        dot.addEventListener('click', e => {
          e.preventDefault();
          scrollToSlide(i);
        });
      });

      updateActiveDot(0);

      function getSlideMetrics() {
        const slideWidth = slides[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(slider).gap) || 10;
        return { slideWidth, gap };
      }

      function scrollToSlide(index) {
        const { slideWidth, gap } = getSlideMetrics();
        const scrollPos = index * (slideWidth + gap);
        slider.scrollTo({ left: scrollPos, behavior: 'smooth' });
        updateActiveDot(index);
      }

      function updateActiveDot(index) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
      }

      let ticking = false;
      slider.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const { slideWidth, gap } = getSlideMetrics();
            const activeIndex = Math.round(slider.scrollLeft / (slideWidth + gap));
            if (activeIndex >= 0 && activeIndex < slides.length) updateActiveDot(activeIndex);
            ticking = false;
          });
          ticking = true;
        }
      });

      function scrollRelative(offset) {
        const { slideWidth, gap } = getSlideMetrics();
        const currentIndex = Math.round(slider.scrollLeft / (slideWidth + gap));
        const newIndex = Math.min(Math.max(0, currentIndex + offset), slides.length - 1);
        scrollToSlide(newIndex);
      }

      if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); scrollRelative(-1); });
      if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); scrollRelative(1); });

      window.addEventListener('resize', () => {
        const activeDot = dotsContainer.querySelector('.dot.active');
        if (activeDot) scrollToSlide(parseInt(activeDot.dataset.index));
      });
    });
  }

});