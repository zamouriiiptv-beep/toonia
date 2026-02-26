<script>
'use strict';

/**
 * سلايدر مسلسلات مشابهة – نسخة موحّدة مع باقي السلايدرات
 */

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    const arrows = document.querySelectorAll(
      `.arrow[data-target="${sliderId}"]`
    );

    if (!slides.length || !dotsWrapper) return;

    let activeIndex = 0;
    let isProgrammatic = false;

    /* =============================== */
    /* 1. إنشاء النقاط                */
    /* =============================== */
    dotsWrapper.innerHTML = '';
    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.addEventListener('click', () => scrollToIndex(index));
      dotsWrapper.appendChild(dot);
      return dot;
    });

    /* =============================== */
    /* 2. تحديث النقطة النشطة         */
    /* =============================== */
    function setActive(index) {
      if (index < 0 || index >= dots.length) return;
      activeIndex = index;
      dots.forEach((dot, i) =>
        dot.classList.toggle('active', i === index)
      );
    }

    /* =============================== */
    /* 3. التمرير إلى شريحة           */
    /* =============================== */
    function scrollToIndex(index) {
      isProgrammatic = true;

      const target = Math.max(0, Math.min(slides.length - 1, index));
      slides[target].scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'nearest'
      });

      setActive(target);

      setTimeout(() => {
        isProgrammatic = false;
      }, 600);
    }

    /* =============================== */
    /* 4. مراقبة السحب باللمس          */
    /* =============================== */
    const observer = new IntersectionObserver(entries => {
      if (isProgrammatic) return;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = slides.indexOf(entry.target);
          if (index !== -1) {
            setActive(index);
          }
        }
      });
    }, {
      root: slider,
      rootMargin: '0px -2px 0px -2px',
      threshold: 0.6
    });

    slides.forEach(slide => observer.observe(slide));

    /* =============================== */
    /* 5. الأسهم                      */
    /* =============================== */
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.classList.contains('next') ? 1 : -1;
        scrollToIndex(activeIndex + step);
      });
    });

    /* =============================== */
    /* 6. البداية                     */
    /* =============================== */
    setActive(0);
  });

});
</script>