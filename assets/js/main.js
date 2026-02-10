'use strict';

/* ===================================== */
/*  تفاعلات الهيدر (Header Interactions) */
/* ===================================== */

/* انتظار تحميل الصفحة بالكامل قبل تنفيذ JavaScript */
document.addEventListener('DOMContentLoaded', function () {

    /* ================================= */
    /*  التحكم في فتح/إغلاق القائمة      */
    /* ================================= */

    /* زر فتح القائمة */
    const menuToggle = document.querySelector('.menu-toggle');

    /* عنصر body لإضافة / إزالة class */
    const body = document.body;

    /* التأكد من وجود زر القائمة قبل إضافة الحدث */
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {

            /* تبديل حالة القائمة (فتح / إغلاق) */
            body.classList.toggle('menu-open');
        });
    }


    /* ================================= */
    /*  زر البحث                         */
    /* ================================= */

    /* زر البحث في الهيدر */
    const searchBtn = document.querySelector('.search-btn');

    /* التأكد من وجود زر البحث */
    if (searchBtn) {
        searchBtn.addEventListener('click', function () {

            /* تبديل حالة البحث (إظهار / إخفاء) */
            body.classList.toggle('search-open');
        });
    }

});

/* ================================== */
/*  تهيئة سلايدر الحلقات الجديدة       */
/* ================================== */
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css">

<script>
const slider = document.getElementById('episodesSlider');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.onclick = () => {
  slider.scrollBy({ left: 170, behavior: 'smooth' });
};

prev.onclick = () => {
  slider.scrollBy({ left: -170, behavior: 'smooth' });
};
</script>

/* ================================== */
/*  منطق سلايدر الأعمال الأكثر مشاهدة */
/*  يتحكم في التمرير الأفقي للنقاط     */
/*  مع دعم السحب على الأجهزة المحمولة */
/*  بدون استخدام مكتبات خارجية        */
/* ================================== */

<script>
const slider = document.getElementById('mostWatchedSlider');
const dotsContainer = document.getElementById('mostWatchedDots');
const slides = slider.children;

const slidesPerView = window.innerWidth < 768 ? 2 : 5;
const dotsCount = Math.ceil(slides.length / slidesPerView);

for (let i = 0; i < dotsCount; i++) {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.children;

slider.addEventListener('scroll', () => {
  const index = Math.round(
    slider.scrollLeft / (slider.scrollWidth / dotsCount)
  );

  [...dots].forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
});
</script>

<!-- ================================== -->
<!--  صفحة جميع الأعمال                 -->
<!--  تعرض جميع الأعمال بدون تحديد     -->
<!-- ================================== -->

<section class="all-works-page" aria-label="جميع الأعمال">

  <!-- عنوان الصفحة -->
  <h1>جميع الأعمال</h1>

  <!-- شبكة عرض جميع الأعمال -->
  <div class="works-grid">

    <article class="work-card">
      <a href="/work/conan">
        <img src="assets/img/conan.webp" alt="المحقق كونان" loading="lazy">
      </a>
    </article>

    <article class="work-card">
      <a href="/work/bluey">
        <img src="assets/img/bluey.webp" alt="Bluey" loading="lazy">
      </a>
    </article>

    <!-- بقية الأعمال -->

  </div>

</section>
