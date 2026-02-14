'use strict';

/* ===================================== */
/*  انتظار تحميل الصفحة بالكامل          */
/* ===================================== */

document.addEventListener('DOMContentLoaded', function () {

    const body = document.body;

    /* ================================= */
    /*  التحكم في فتح/إغلاق القائمة      */
    /* ================================= */

    const menuToggle = document.querySelector('.menu-toggle');
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

    /* ================================== */
    /*  سلايدر الحلقات الجديدة (أزرار)   */
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
    /*  Slider Dots (عام لكل السلايدرات) */
    /* ================================== */

    document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

        const sliderId = dotsContainer.getAttribute('data-slider');
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const wrapper = slider.closest('.slider-wrapper');
        let dots = [];

        function getCardMetrics() {
            const card = slider.querySelector('.slide');
            if (!card) return null;

            const gap = parseInt(getComputedStyle(slider).gap) || 0;
            return card.offsetWidth + gap;
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            dots = [];

            const cardWidth = getCardMetrics();
            if (!cardWidth) return;

            const visibleCards = Math.max(
                1,
                Math.floor(wrapper.offsetWidth / cardWidth)
            );

            const totalCards = slider.children.length;
            const pages = Math.ceil(totalCards / visibleCards);

            if (pages <= 1) {
                dotsContainer.style.display = 'none';
                return;
            }

            dotsContainer.style.display = 'flex';

            for (let i = 0; i < pages; i++) {
                const dot = document.createElement('button');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    slider.scrollTo({
                        left: i * cardWidth * visibleCards,
                        behavior: 'smooth'
                    });
                });

                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }

        function updateActiveDot() {
            const cardWidth = getCardMetrics();
            if (!cardWidth) return;

            const visibleCards = Math.max(
                1,
                Math.floor(wrapper.offsetWidth / cardWidth)
            );

            const index = Math.round(
                slider.scrollLeft / (cardWidth * visibleCards)
            );

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        /* تشغيل */
        createDots();

        slider.addEventListener('scroll', () => {
            requestAnimationFrame(updateActiveDot);
        });

        window.addEventListener('resize', () => {
            createDots();
            updateActiveDot();
        });

    });

});
