'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================== */
  /*  حساب خطوة السلايدر (عرض الشريحة)     */
  /* ===================================== */
  function getStep(slider) {
    const slide = slider.querySelector('.slide');
    if (!slide) return 0;

    const slideRect = slide.getBoundingClientRect();
    const styles = getComputedStyle(slide);

    const marginRight = parseFloat(styles.marginRight) || 0;

    return slideRect.width + marginRight;
  }

  /* ===================================== */
  /*  مزامنة النقاط مع التمرير الحقيقي     */
  /* ===================================== */
  function syncDots(slider) {
    const dotsContainer = document.querySelector(
      `.slider-dots[data-slider="${slider.id}"]`
    );
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll('button');
    if (!dots.length) return;

    const step = getStep(slider);
    if (!step) return;

    // الحساب الصحيح (منتصف الشريحة)
    const rawIndex = Math.floor(
      (slider.scrollLeft + step / 2) / step
    );

    const index = Math.max(0, Math.min(dots.length - 1, rawIndex));

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* ===================================== */
  /*  الأسهم (التالي / السابق)             */
  /* ===================================== */
  document.querySelectorAll('.section-arrows .arrow').forEach(btn => {

    btn.addEventListener('click', () => {

      const slider = document.getElementById(btn.dataset.target);
      if (!slider) return;

      const step = getStep(slider);
      if (!step) return;

      const direction = btn.classList.contains('next') ? 1 : -1;

      slider.scrollTo({
        left: slider.scrollLeft + step * direction,
        behavior: 'smooth'
      });

    });

  });

  /* ===================================== */
  /*  إنشاء النقاط + التمرير               */
  /* ===================================== */
  document.querySelectorAll('.slider-dots').forEach(dotsContainer => {

    const slider = document.getElementById(dotsContainer.dataset.slider);
    if (!slider) return;

    function createDots() {
      dotsContainer.innerHTML = '';

      const slides = slider.querySelectorAll('.slide');
      const count = slides.length;

      if (count <= 1) {
        dotsContainer.style.display = 'none';
        return;
      }

      dotsContainer.style.display = 'flex';

      const step = getStep(slider);
      if (!step) return;

      for (let i = 0; i < count; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';

        dot.addEventListener('click', () => {
          slider.scrollTo({
            left: i * step,
            behavior: 'smooth'
          });
        });

        dotsContainer.appendChild(dot);
      }

      syncDots(slider);
    }

    /* ===================================== */
    /*  التمرير (سحب / عجلة / touch)        */
    /* ===================================== */
    let rafId = null;

    function onScroll() {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        syncDots(slider);
        rafId = null;
      });
    }

    createDots();

    slider.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', createDots);

  });

});