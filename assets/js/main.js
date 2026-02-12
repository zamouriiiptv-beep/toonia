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
const heroContainer = document.querySelector('.hero');
if (heroContainer) {
  const heroSlides = heroContainer.querySelectorAll('.hero-slide');
  const heroDotsWrapper = heroContainer.querySelector('.hero-dots');

  if (heroSlides.length > 1 && heroDotsWrapper) {
    let currentIndex = 0;
    const slideIntervalDelay = 4000;
    let slideInterval;

    const goToSlide = (index) => {
      heroSlides[currentIndex].classList.remove('active');
      heroDots[currentIndex].classList.remove('active');

      currentIndex = index;

      heroSlides[currentIndex].classList.add('active');
      heroDots[currentIndex].classList.add('active');
    };

    const nextSlide = () => {
      goToSlide((currentIndex + 1) % heroSlides.length);
    };

    const startSlideInterval = () => {
      slideInterval = setInterval(nextSlide, slideIntervalDelay);
    };

    const resetSlideInterval = () => {
      clearInterval(slideInterval);
      startSlideInterval();
    };

    // إنشاء dots للـ Hero Slider
    heroSlides.forEach((_, index) => {
      const dotBtn = document.createElement('button');
      if (index === 0) dotBtn.classList.add('active');
      dotBtn.addEventListener('click', () => {
        goToSlide(index);
        resetSlideInterval();
      });
      heroDotsWrapper.appendChild(dotBtn);
    });

    const heroDots = heroDotsWrapper.querySelectorAll('button');

    startSlideInterval();
  }
}

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
