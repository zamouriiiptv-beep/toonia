document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".hero-slider .slide");
  const dotsContainer = document.querySelector(".hero-slider .dots");

  let current = 0;
  const intervalTime = 5000;  // مدة عرض كل شريحة
  const transitionTime = 800; // مجرد مرجع، غير مستخدم برمجياً هنا

  // لا يوجد أكثر من شريحة واحدة؟ لا نفعل شيئاً.
  if (slides.length < 2) return;

  // إنشاء نقاط بناءً على عدد الشرائح
  slides.forEach((_, idx) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (idx === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  // عرض شريحة معينة
  function showSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
  }

  // الانتقال للشريحة التالية
  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  // تشغيل تلقائي
  let auto = setInterval(nextSlide, intervalTime);

  // التحكم بالنقاط
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      clearInterval(auto);
      showSlide(idx);
      // إعادة تشغيل التلقائي بعد التفاعل
      auto = setInterval(nextSlide, intervalTime);
    });
  });

});
