'use strict';

/* ===================================== */
/*  انتظار تحميل الصفحة بالكامل          */
/* ===================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================= */
    /*  التحكم في فتح/إغلاق القائمة      */
    /* ================================= */

    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            body.classList.toggle('menu-open');
        });
    }

    /* ================================= */
    /*  زر البحث                         */
    /* ================================= */

    const searchBtn = document.querySelector('.search-btn');

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            body.classList.toggle('search-open');
        });
    }

    /* ================================= */
    /*  Hero Slider                      */
    /* ================================= */

    <script>
document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.querySelector(".hero-dots");

  let current = 0;
  const intervalTime = 5000;
  let sliderInterval;

  if (slides.length < 2) return;

  /* إنشاء Dots */
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function goToSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    current = index;

    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function nextSlide() {
    let next = current + 1;
    if (next >= slides.length) next = 0;
    goToSlide(next);
  }

  function startSlider() {
    sliderInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(sliderInterval);
    startSlider();
  }

  startSlider();

});
</script>

    /* ================================== */
    /*  سلايدر الحلقات الجديدة             */
    /* ================================== */

    const episodesSlider = document.getElementById('episodesSlider');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (episodesSlider && nextBtn && prevBtn) {

        const scrollAmount = () => {
            const card = episodesSlider.querySelector('.episode-card');
            if (!card) return 0;

            const gap = parseInt(getComputedStyle(episodesSlider).gap) || 0;
            return card.offsetWidth + gap;
        };

        nextBtn.addEventListener('click', () => {
            episodesSlider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            episodesSlider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
    }

    /* ================================== */
    /*  سلايدر الأكثر مشاهدة              */
    /* ================================== */

    const mostSlider = document.getElementById('mostWatchedSlider');
    const dotsContainer = document.getElementById('mostWatchedDots');

    if (mostSlider && dotsContainer) {

        const slides = mostSlider.children;
        const slidesPerView = window.innerWidth < 768 ? 2 : 5;
        const dotsCount = Math.ceil(slides.length / slidesPerView);

        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('span');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        const dots = dotsContainer.children;

        mostSlider.addEventListener('scroll', () => {
            const index = Math.round(
                mostSlider.scrollLeft / (mostSlider.scrollWidth / dotsCount)
            );

            [...dots].forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        });
    }

});
