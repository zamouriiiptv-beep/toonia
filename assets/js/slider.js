function updateActiveFromScroll() {

  const scrollLeft = slider.scrollLeft;

  const slideWidth = slides[0].offsetWidth;
  const gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
  const startLimit = slideWidth * 0.25; // ✔️ ربع شريحة فقط

  let index = 0;
  let minDistance = Infinity;

  slides.forEach((slide, i) => {
    const distance = Math.abs(slide.offsetLeft - scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      index = i;
    }
  });

  /* 🔒 تثبيت البداية فقط إذا كنا فعلاً في البداية */
  if (scrollLeft <= startLimit) {
    index = 0;
  }

  setActive(index);
}

slider.addEventListener(
  'scroll',
  () => {
    requestAnimationFrame(updateActiveFromScroll);
  },
  { passive: true }
);