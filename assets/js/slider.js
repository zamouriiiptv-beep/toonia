'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /* تهيئة جميع السلايدرز                 */
  /* ===================================== */

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;

    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    if (!dotsWrapper) return;

    const arrows = document.querySelectorAll(
      `.arrow[data-target="${sliderId}"]`
    );

    /* ===================================== */
    /* الحالة (مصدر الحقيقة الوحيد)        */
    /* ===================================== */
    let activeIndex = 0;
    let isProgrammatic = false;
    let scrollTimeout = null;

    /* ===================================== */
    /* إنشاء نقاط السلايدر                  */
    /* ===================================== */
    dotsWrapper.innerHTML = '';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';

      dot.addEventListener('click', () => {
        scrollToIndex(i);
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    function setActive(index) {
      activeIndex = index;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    /* ===================================== */
    /* التمرير إلى شريحة حسب الفهرس         */
    /* ===================================== */
    function scrollToIndex(index) {
      index = Math.max(0, Math.min(slides.length - 1, index));

      isProgrammatic = true;

      // استخدام scrollIntoView يضمن الدقة في اتجاه RTL و LTR
      slides[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      setActive(index);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isProgrammatic = false;
      }, 500); // مهلة كافية لانتهاء حركة التمرير
    }

    /* ===================================== */
    /* تحديث الشريحة النشطة عند التمرير      */
    /* ===================================== */
    function updateFromScroll() {
      if (isProgrammatic) return;

      const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
      const step = slides[0].offsetWidth + gap;

      // Math.abs تعالج اختلاف حساب scrollLeft في المتصفحات بوضع RTL
      let scrollPos = Math.abs(slider.scrollLeft);
      
      let index = Math.round(scrollPos / step);
      index = Math.max(0, Math.min(slides.length - 1, index));

      setActive(index);
    }

    /* إضافة مراقب التمرير (هذا ما كان ينقصك) */
    slider.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateFromScroll, 50);
    }, { passive: true });

    /* ===================================== */
    /* أزرار التنقل (الأسهم)                */
    /* ===================================== */
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        const nextIndex = btn.classList.contains('next') 
          ? activeIndex + 1 
          : activeIndex - 1;
        scrollToIndex(nextIndex);
      });
    });

    /* ===================================== */
    /* التهيئة الأولية                     */
    /* ===================================== */
    setActive(0);
    // تأكد من أن السلايدر يبدأ من الصفر
    slider.scrollLeft = 0;

  });

});