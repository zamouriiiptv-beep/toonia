'use strict';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {

    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) return;

    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(
      `.slider-dots[data-slider="${sliderId}"]`
    );
    if (!dotsWrapper) return;

    const section = slider.closest('section');
    const prevBtn = section.querySelector('.arrow.prev');
    const nextBtn = section.querySelector('.arrow.next');

    /* ============================= */
    /*  إنشاء النقاط                 */
    /* ============================= */

    dotsWrapper.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';

      dot.addEventListener('click', () => {
        slides[i].scrollIntoView({
          behavior: 'smooth',
          inline: 'start'
        });
      });

      dotsWrapper.appendChild(dot);
    });

    const dots = Array.from(dotsWrapper.children);

    /* ============================= */
    /*  تفعيل النقطة حسب الرؤية      */
    /* ============================= */

    function setActiveDot(index) {
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = slides.indexOf(entry.target);
            setActiveDot(index);
          }
        });
      },
      {
        root: slider,
        threshold: 0.6
      }
    );

    slides.forEach(slide => observer.observe(slide));

    /* ============================= */
    /*  الأسهم                       */
    /* ============================= */

    function scrollByOne(direction) {
      const currentIndex = dots.findIndex(dot =>
        dot.classList.contains('active')
      );
      const nextIndex = Math.max(
        0,
        Math.min(slides.length - 1, currentIndex + direction)
      );

      slides[nextIndex].scrollIntoView({
        behavior: 'smooth',
        inline: 'start'
      });
    }

    nextBtn?.addEventListener('click', () => scrollByOne(1));
    prevBtn?.addEventListener('click', () => scrollByOne(-1));

    /* ============================= */
    /*  تهيئة أولية                  */
    /* ============================= */

    setActiveDot(0);

  });

});