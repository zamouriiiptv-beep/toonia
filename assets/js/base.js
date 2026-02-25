'use strict';

/* ===================================== */
/*  base.js                              */
/*  تهيئة عامة (محجوز للتوسّع)           */
/* ===================================== */

document.addEventListener("DOMContentLoaded", function () {

  const stars = document.querySelectorAll("#starRating i");
  const ratingValue = document.getElementById("ratingValue");
  const ratingCount = document.getElementById("ratingCount");

  let currentRating = 0;
  let totalVotes = 0;

  stars.forEach(star => {

    // تأثير عند المرور
    star.addEventListener("mouseenter", function () {
      const value = this.dataset.value;
      highlightStars(value, "hovered");
    });

    star.addEventListener("mouseleave", function () {
      removeHighlight("hovered");
    });

    // عند الضغط
    star.addEventListener("click", function () {
      currentRating = parseInt(this.dataset.value);
      totalVotes++;

      highlightStars(currentRating, "active");

      ratingValue.textContent = currentRating.toFixed(1);
      ratingCount.textContent = totalVotes + " تقييم";
    });

  });

  function highlightStars(value, className) {
    removeHighlight(className);
    stars.forEach(star => {
      if (star.dataset.value <= value) {
        star.classList.add(className);
      }
    });
  }

  function removeHighlight(className) {
    stars.forEach(star => star.classList.remove(className));
  }

});