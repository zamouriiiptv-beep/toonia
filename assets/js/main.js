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
    /*  أسهم السلايدر (عام لكل الأقسام)  */
    /* ================================== */

    document.querySelectorAll('.slider-arrow').forEach(arrow => {

        arrow.addEventListener('click', () => {

            const sliderId = arrow.getAttribute('data-target');
            const slider = document.getElementById(sliderId);

            if (!slider) return;

            const slide = slider.querySelector('.slide');
            if (!slide) return;

            const gap = parseInt(getComputedStyle(slider).gap) || 0;
            const scrollAmount = slide.offsetWidth + gap;

            if (arrow.classList.contains('next')) {
                slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }

        });

    });

    /* ================================== */
    /*  Slider Dots (عام لكل السلايدرات) */
    /* ================================== */

    document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

        const sliderId = dotsContainer.getAttribute('data-slider');
        const slider = document.getElementById(sliderId);

        if (!slider) return;

        const wrapper = slider.closest('.slider-wrapper');
        let dots = [];

        function createDots() {
            dotsContainer.innerHTML = '';
            dots = [];

            const wrapperWidth = wrapper.offsetWidth;
            const totalWidth = slider.scrollWidth;
            const pages = Math.ceil(totalWidth / wrapperWidth);

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
                        left: i * wrapperWidth,
                        behavior: 'smooth'
                    });
                });

                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }

        function updateActiveDot() {
            const wrapperWidth = wrapper.offsetWidth;
            const index = Math.round(slider.scrollLeft / wrapperWidth);

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
