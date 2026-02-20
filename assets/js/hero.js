'use strict';

/* ===================================== */
/*  hero.js                              */
/*  سلايدر الهيرو                        */
/* ===================================== */

document.addEventListener('DOMContentLoaded', () => {

  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dots button');

  if (!slides.length || !dots.length) return;

  let index = 0;
  let timer = null;

  function show(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[i].classList.add('active');
    dots[i].classList.add('active');
    index = i;
  }

  function next() {
    show((index + 1) % slides.length);
  }

  // auto-play
  function start() {
    stop();
    timer = setInterval(next, 6000);
  }

  function stop() {
    if (timer) clearInterval(timer);
  }

  // ربط dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      start();
    });
  });

  start();

});