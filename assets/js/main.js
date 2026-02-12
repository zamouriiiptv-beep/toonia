'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* ================================= */
  /* التحكم في فتح/إغلاق القائمة */
  /* ================================= */
  const menuToggleBtn = document.querySelector('.menu-toggle');
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      body.classList.toggle('menu-open');
    });
  }

  /* ================================= */
  /* زر البحث */
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
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slider = hero.querySelector('.hero-slider');
  const slides = slider.querySelectorAll('.hero-slide');
  const dotsWrapper = hero.querySelector('.hero-dots');

  if (slides.length < 2) return;

  let current = 0;
  const delay = 4000;
  let interval;

  // إنشاء dots
  slides.forEach((_, index) => {
    const btn = document.createElement('button');
    if (index === 0) btn.classList.add('active');

    btn.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });

    dotsWrapper.appendChild(btn);
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
    let next = (current + 1) % slides.length;
    goToSlide(next);
  }

  function startInterval() {
    interval = setInterval(nextSlide, delay);
  }

  function resetInterval() {
    clearInterval(interval);
    startInterval();
  }

  startInterval();
});

  /* ================================= */
  /* سلايدر الحلقات الجديدة (Episodes Slider) */
  /* ================================= */
  const episodesSliderContainer = document.getElementById('episodesSlider');
  if (episodesSliderContainer) {
    const episodesSliderWrapper = episodesSliderContainer.parentElement;
    const episodesNextBtn = episodesSliderWrapper.querySelector('.next');
    const episodesPrevBtn = episodesSliderWrapper.querySelector('.prev');

    if (episodesNextBtn && episodesPrevBtn) {
      const getScrollAmount = () => {
        const card = episodesSliderContainer.querySelector('.episode-card');
        if (!card) return 0;
        const gapValue = parseInt(getComputedStyle(episodesSliderContainer).gap) || 0;
        return card.offsetWidth + gapValue;
      };

      episodesNextBtn.addEventListener('click', () => {
        episodesSliderContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });

      episodesPrevBtn.addEventListener('click', () => {
        episodesSliderContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }
  }

  /* ================================= */
  /* سلايدر الأكثر مشاهدة (Most Watched Slider) */
  /* ================================= */
  const mostWatchedSliderContainer = document.getElementById('mostWatchedSlider');
  const mostWatchedDotsWrapper = document.getElementById('mostWatchedDots');

  if (mostWatchedSliderContainer && mostWatchedDotsWrapper) {
    const slidesElements = [...mostWatchedSliderContainer.children];
    const slidesPerViewCount = window.innerWidth < 768 ? 2 : 5;
    const dotsNeededCount = Math.ceil(slidesElements.length / slidesPerViewCount);

    // تنظيف الدوتس القديمة
    mostWatchedDotsWrapper.innerHTML = '';

    for (let i = 0; i < dotsNeededCount; i++) {
      const dotSpan = document.createElement('span');
      if (i === 0) dotSpan.classList.add('active');
      mostWatchedDotsWrapper.appendChild(dotSpan);
    }

    const mostWatchedDots = mostWatchedDotsWrapper.children;

    mostWatchedSliderContainer.addEventListener('scroll', () => {
      const maxScrollLeft = mostWatchedSliderContainer.scrollWidth - mostWatchedSliderContainer.clientWidth;
      const scrollLeft = mostWatchedSliderContainer.scrollLeft;
      let activeDotIndex = 0;

      if (maxScrollLeft > 0) {
        activeDotIndex = Math.round((scrollLeft / maxScrollLeft) * (dotsNeededCount - 1));
      }

      [...mostWatchedDots].forEach(dot => dot.classList.remove('active'));
      if (mostWatchedDots[activeDotIndex]) {
        mostWatchedDots[activeDotIndex].classList.add('active');
      }
    });
  }
});
