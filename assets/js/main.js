'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* ================================= */
  /* القائمة (Menu) */
  /* ================================= */
  const menuToggleBtn = document.querySelector('.menu-toggle');
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      body.classList.toggle('menu-open');
    });
  }

  /* ================================= */
  /* البحث (Search) */
  /* ================================= */
  const searchButton = document.querySelector('.search-btn');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      body.classList.toggle('search-open');
    });
  }

  /* ================================= */
  /* Hero Slider */
  /* ================================= */
  const hero = document.querySelector('.hero');
  if (hero) {
    const slider = hero.querySelector('.hero-slider');
    const slides = slider ? slider.querySelectorAll('.hero-slide') : [];
    const dotsWrapper = hero.querySelector('.hero-dots');

    if (slider && dotsWrapper && slides.length > 1) {
      let current = 0;
      const delay = 4000;
      let interval;

      // إنشاء النقاط
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
          goToSlide(index);
          resetInterval();
        });

        dotsWrapper.appendChild(dot);
      });

      const dots = dotsWrapper.querySelectorAll('button');

      function goToSlide(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = index;

        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function nextSlide() {
        goToSlide((current + 1) % slides.length);
      }

      function startInterval() {
        interval = setInterval(nextSlide, delay);
      }

      function resetInterval() {
        clearInterval(interval);
        startInterval();
      }

      startInterval();
    }
  }

  /* ================================= */
  /* Episodes Slider */
  /* ================================= */
  const episodesSlider = document.getElementById('episodesSlider');
  if (episodesSlider) {
    const wrapper = episodesSlider.parentElement;
    const nextBtn = wrapper?.querySelector('.next');
    const prevBtn = wrapper?.querySelector('.prev');

    const getScrollAmount = () => {
      const card = episodesSlider.querySelector('.episode-card');
      if (!card) return 0;
      const gap = parseInt(getComputedStyle(episodesSlider).gap) || 0;
      return card.offsetWidth + gap;
    };

    nextBtn?.addEventListener('click', () => {
      episodesSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn?.addEventListener('click', () => {
      episodesSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
  }

  /* ================================= */
  /* Most Watched Slider */
  /* ================================= */
  const mostWatchedSlider = document.getElementById('mostWatchedSlider');
  const mostWatchedDotsWrapper = document.getElementById('mostWatchedDots');

  if (mostWatchedSlider && mostWatchedDotsWrapper) {
    const slides = [...mostWatchedSlider.children];
    const perView = window.innerWidth < 768 ? 2 : 5;
    const dotsCount = Math.ceil(slides.length / perView);

    mostWatchedDotsWrapper.innerHTML = '';

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      mostWatchedDotsWrapper.appendChild(dot);
    }

    const dots = mostWatchedDotsWrapper.children;

    mostWatchedSlider.addEventListener('scroll', () => {
      const maxScroll = mostWatchedSlider.scrollWidth - mostWatchedSlider.clientWidth;
      const index = maxScroll
        ? Math.round((mostWatchedSlider.scrollLeft / maxScroll) * (dotsCount - 1))
        : 0;

      [...dots].forEach(d => d.classList.remove('active'));
      dots[index]?.classList.add('active');
    });
  }

});
