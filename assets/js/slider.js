'use strict';

const slider = document.getElementById('slider');
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let activeIndex = 0;
let slideWidth = 0;
let gap = 0;
let isProgrammaticScroll = false;
let scrollTimeout;

/* ============================= */
/*  تحديث القياسات               */
/* ============================= */
function updateMetrics() {
  const firstSlide = slider.querySelector('.slide');
  if (!firstSlide) return;

  slideWidth = firstSlide.offsetWidth;
  gap = parseInt(getComputedStyle(slider).gap, 10) || 0;
}

/* ============================= */
/*  تحديد الشريحة النشطة          */
/* ============================= */
function calculateActiveIndex(scrollLeft) {
  const START_THRESHOLD = slideWidth * 0.25;

  if (scrollLeft <= START_THRESHOLD) return 0;

  let closestIndex = 0;
  let minDistance = Infinity;

  Array.from(slider.children).forEach((slide, i) => {
    const distance = Math.abs(slide.offsetLeft - scrollLeft);
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  });

  return closestIndex;
}

/* ============================= */
/*  تحديث النقاط والأسهم          */
/* ============================= */
function setActive(index) {
  if (index === activeIndex) return;

  dots[activeIndex]?.classList.remove('active');
  dots[index]?.classList.add('active');

  activeIndex = index;
}

/* ============================= */
/*  التمرير إلى شريحة             */
/* ============================= */
function scrollToIndex(index) {
  index = Math.max(0, Math.min(index, slider.children.length - 1));

  const target = slider.children[index];
  if (!target) return;

  isProgrammaticScroll = true;

  slider.scrollTo({
    left: target.offsetLeft,
    behavior: 'smooth',
  });

  setActive(index);

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isProgrammaticScroll = false;
  }, 300);
}

/* ============================= */
/*  أحداث التمرير                */
/* ============================= */
slider.addEventListener(
  'scroll',
  () => {
    if (isProgrammaticScroll) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const index = calculateActiveIndex(slider.scrollLeft);
      setActive(index);
    }, 50);
  },
  { passive: true }
);

/* ============================= */
/*  الأسهم                        */
/* ============================= */
prevBtn.addEventListener('click', () => {
  scrollToIndex(activeIndex - 1);
});

nextBtn.addEventListener('click', () => {
  scrollToIndex(activeIndex + 1);
});

/* ============================= */
/*  النقاط                        */
/* ============================= */
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    scrollToIndex(i);
  });
});

/* ============================= */
/*  تهيئة                          */
/* ============================= */
window.addEventListener('resize', () => {
  updateMetrics();
  scrollToIndex(activeIndex);
});

updateMetrics();
setActive(0);
scrollToIndex(0);