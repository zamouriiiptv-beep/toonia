'use strict';

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.slider').forEach(slider => {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const sliderId = slider.id;
    const dotsWrapper = document.querySelector(`.slider-dots[data-slider="${sliderId}"]`);
    if (!slides.length || !dotsWrapper) return;

    const arrows = document.querySelectorAll(`.arrow[data-target="${sliderId}"]`);

    let activeIndex = 0;
    let isProgrammatic = false; // لمنع التحديث أثناء النقر على النقاط أو الأسهم

    /* 1. إنشاء النقاط */
    dotsWrapper.innerHTML = '';
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot';
      dot.addEventListener('click', () => {
        isProgrammatic = true;
        scrollToIndex(i);
      });
      dotsWrapper.appendChild(dot);
      return dot;
    });

    function setActive(index) {
      activeIndex = index;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function scrollToIndex(index) {
      index = Math.max(0, Math.min(slides.length - 1, index));
      slides[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      setActive(index);
      
      // إعادة تفعيل المراقبة اليدوية بعد انتهاء التمرير
      setTimeout(() => { isProgrammatic = false; }, 600);
    }

    /* 2. المحرك الأساسي: مراقبة العناصر الظاهرة (Intersection Observer) */
    // هذه الطريقة لا تعتمد على الأرقام، بل على ما يراه المستخدم فعلياً
    const observerOptions = {
      root: slider,
      threshold: 0.6 // إذا ظهر 60% من الصورة، تعتبر هي النشطة
    };

    const observer = new IntersectionObserver((entries) => {
      if (isProgrammatic) return; // تجاهل التحديث إذا كان التمرير ناتج عن نقرة زر

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = slides.indexOf(entry.target);
          setActive(index);
        }
      });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    /* 3. الأسهم */
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        isProgrammatic = true;
        const nextIndex = btn.classList.contains('next') ? activeIndex + 1 : activeIndex - 1;
        scrollToIndex(nextIndex);
      });
    });

    setActive(0);
  });
});