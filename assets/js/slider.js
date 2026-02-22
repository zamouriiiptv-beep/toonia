/**
 * سكريبت التحكم في السلايدر - النسخة النهائية المستقرة
 * الميزات: يدعم RTL، يمنع قفز النقاط، أداء عالي جداً
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // اختيار جميع عناصر السلايدر في الصفحة
    document.querySelectorAll('.slider').forEach(slider => {
        
        const slides = Array.from(slider.querySelectorAll('.slide'));
        const sliderId = slider.id;
        
        // العثور على حاوية النقاط المرتبطة بهذا السلايدر عبر data-slider
        const dotsWrapper = document.querySelector(`.slider-dots[data-slider="${sliderId}"]`);
        
        // التحقق من وجود العناصر الأساسية
        if (!slides.length || !dotsWrapper) return;

        // العثور على الأسهم المرتبطة بهذا السلايدر
        const arrows = document.querySelectorAll(`.arrow[data-target="${sliderId}"]`);
        
        let activeIndex = 0;
        let isProgrammatic = false; // متغير لمنع تضارب التمرير التلقائي مع اليدوي

        /* ===================================== */
        /* 1. إنشاء نقاط التنقل (Dots)           */
        /* ===================================== */
        dotsWrapper.innerHTML = '';
        const dots = slides.map((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            
            // عند النقر على النقطة
            dot.addEventListener('click', () => {
                scrollToIndex(i);
            });
            
            dotsWrapper.appendChild(dot);
            return dot;
        });

        /* ===================================== */
        /* 2. وظيفة تحديث حالة النقطة النشطة     */
        /* ===================================== */
        function setActive(index) {
            if (index < 0 || index >= dots.length) return;
            activeIndex = index;
            
            // إزالة كلاس active من الجميع وإضافته للعنصر المحدد
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        /* ===================================== */
        /* 3. وظيفة التمرير إلى شريحة معينة      */
        /* ===================================== */
        function scrollToIndex(index) {
            isProgrammatic = true; // تفعيل وضع "التمرير البرمجي" لتعطيل المراقب مؤقتاً
            const targetIndex = Math.max(0, Math.min(slides.length - 1, index));
            
            // التمرير السلس للمركز لضمان الدقة
            slides[targetIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });

            setActive(targetIndex);
            
            // إعادة السماح للمراقب اليدوي بالعمل بعد انتهاء حركة التمرير
            setTimeout(() => {
                isProgrammatic = false;
            }, 600); 
        }

        /* ===================================== */
        /* 4. مراقب الصور (Intersection Observer) */
        /* يحل مشكلة القفز وتوافق RTL            */
        /* ===================================== */
        const observerOptions = {
            root: slider,
            // نحدد منطقة ضيقة جداً في منتصف السلايدر (5% فقط)
            // لضمان أن النقطة لا تتغير إلا إذا كانت الصورة في المنتصف تماماً
            rootMargin: '0px -47% 0px -47%', 
            threshold: 0 
        };

        const observer = new IntersectionObserver((entries) => {
            // إذا كنا نقوم بالتمرير عبر النقر (الأسهم/النقاط)، نتجاهل تحديث المراقب
            if (isProgrammatic) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = slides.indexOf(entry.target);
                    setActive(index);
                }
            });
        }, observerOptions);

        // تفعيل المراقب على كل صورة
        slides.forEach(slide => observer.observe(slide));

        /* ===================================== */
        /* 5. إعداد أزرار الأسهم                 */
        /* ===================================== */
        arrows.forEach(btn => {
            btn.addEventListener('click', () => {
                const step = btn.classList.contains('next') ? 1 : -1;
                // في RTL، المتصفحات تعكس الاتجاه برمجياً أحياناً، لكن scrollIntoView تعالج ذلك
                scrollToIndex(activeIndex + step);
            });
        });

        // تعيين الحالة الأولية
        setActive(0);
    });
});