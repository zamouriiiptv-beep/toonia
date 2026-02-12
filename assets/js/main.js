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

    document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".hero-slider .slide");
  const dotsContainer = document.querySelector(".hero-slider .dots");

  let current = 0;
  const intervalTime = 5000;  // مدة عرض كل شريحة
  const transitionTime = 800; // مجرد مرجع، غير مستخدم برمجياً هنا

  // لا يوجد أكثر من شريحة واحدة؟ لا نفعل شيئاً.
  if (slides.length < 2) return;

  // إنشاء نقاط بناءً على عدد الشرائح
  slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  // عرض شريحة معينة
  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
  }

  // الانتقال للشريحة التالية
  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  // تشغيل تلقائي
  let auto = setInterval(nextSlide, intervalTime);

  // التحكم بالنقاط
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(auto);
      showSlide(idx);
      // إعادة تشغيل التلقائي بعد التفاعل
      auto = setInterval(nextSlide, intervalTime);
    });
  });

});

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
