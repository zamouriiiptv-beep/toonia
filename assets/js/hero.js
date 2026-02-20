'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slides = hero.querySelectorAll('.hero-slide');
  const dotsWrapper = hero.querySelector('.hero-dots');

  if (slides.length < 2 || !dotsWrapper) return;

  let current = 0;
  const delay = 4000;

  slides.forEach(s => s.classList.remove('active'));
  slides[0].classList.add('active');

  dotsWrapper.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      goTo(i);
      reset();
    });

    dotsWrapper.appendChild(dot);
  });

  const dots = dotsWrapper.querySelectorAll('button');
  let interval = setInterval(next, delay);

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function reset() {
    clearInterval(interval);
    interval = setInterval(next, delay);
  }

});
