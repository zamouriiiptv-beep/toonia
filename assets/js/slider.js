/**
 * سكريبت السلايدر الاحترافي - نسخة Toonia المعدلة
 * يحل مشكلة البداية من الصورة الأولى والوصول لآخر صورة بدقة
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.slider').forEach(slider => {
        
        const slides = Array.from(slider.querySelectorAll('.slide'));
        const sliderId = slider.id;
        const dotsWrapper = document.querySelector(`.slider-dots[data-slider="${sliderId}"]`);
        
        if (!slides.length || !dotsWrapper) return;

        const arrows = document.querySelectorAll(`.arrow[data-target="${sliderId}"]`);
        let activeIndex = 0;
        let isProgrammatic = false; // لمنع التضارب أثناء النقر على الأزرار

        /* ===================================== */
        /* 1. بناء نقاط التنقل                   */
        /* ===================================== */
        dotsWrapper.innerHTML = '';
        const dots = slides.map((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            dot.addEventListener('click', () => scrollToIndex(i));
            dotsWrapper.appendChild(dot);
            return dot;
        });

        /* ===================================== */
        /* 2. تحديث النقطة النشطة                 */
        /* ===================================== */
        function setActive(index) {
            if (index < 0 || index >= dots.length) return;
            activeIndex = index;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }

        /* ===================================== */
        /* 3. وظيفة التمرير (عند الضغط)          */
        /* ===================================== */
        function scrollToIndex(index) {
            isProgrammatic = true; 
            const targetIndex = Math.max(0, Math.min(slides.length - 1, index));
            
            // نستخدم inline: 'start' لضمان محاذاة الصورة بدقة مع حافة السلايدر
            slides[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start' 
            });

            setActive(targetIndex);
            
            // انتظار انتهاء الأنميشن قبل السماح للمراقب بالتدخل ثانية
            setTimeout(() => { isProgrammatic = false; }, 600);
        }

        /* ===================================== */
        /* 4. محرك المراقبة الذكي (Intersection) */
        /* ===================================== */
        // هذا الجزء هو المسؤول عن حركة النقطة عند السحب باليد
        const observerOptions = {
            root: slider,
            // نستخدم هامش ضيق جداً في البداية لضمان رصد أول صورة وآخر صورة فور ظهورها
            rootMargin: '0px -2px 0px -2px', 
            threshold: 0.6 // يجب أن يظهر 60% من الصورة لتعتبر هي النشطة
        };

        const observer = new IntersectionObserver((entries) => {
            if (isProgrammatic) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = slides.indexOf(entry.target);
                    setActive(index);
                }
            });
        }, observerOptions);

        // البدء بمراقبة كل شريحة/بوستر أنمي
        slides.forEach(slide => observer.observe(slide));

        /* ===================================== */
        /* 5. التحكم بالأسهم                     */
        /* ===================================== */
        arrows.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = btn.classList.contains('next') ? 1 : -1;
                scrollToIndex(activeIndex + step);
            });
        });

        // تشغيل النقطة الأولى عند تحميل الصفحة
        setActive(0);
    });
});