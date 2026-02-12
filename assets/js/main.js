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

    const heroSlides = document.querySelectorAll(".hero-bg");
    const heroDots = document.querySelectorAll(".hero-dot");

    let current = 0;
    const interval = 5000;

    if (heroSlides.length > 1) {

        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove("active"));
            heroDots.forEach(dot => dot.classList.remove("active"));

            heroSlides[index].classList.add("active");
            if (heroDots[index]) {
                heroDots[index].classList.add("active");
            }

            current = index;
        }

        let timer = setInterval(() => {
            let next = (current + 1) % heroSlides.length;
            showSlide(next);
        }, interval);

        heroDots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                clearInterval(timer);
                showSlide(index);
                timer = setInterval(() => {
                    showSlide((current + 1) % heroSlides.length);
                }, interval);
            });
        });
    }

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
