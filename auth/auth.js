document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       السنة في الفوتر
    ========================= */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    /* =========================
       تسجيل الدخول الاجتماعي
    ========================= */
    document.querySelectorAll(".social-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const provider = btn.dataset.provider;
            alert(`جاري المتابعة عبر ${provider}`);
            // OAuth لاحقًا
        });
    });

    /* =========================
       Validation عام للنماذج
    ========================= */
    const form = document.querySelector(".auth-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {

        // حقول شائعة
        const email = form.querySelector('input[type="email"]');
        const password = form.querySelector('input[type="password"]');

        if (email && !isValidEmail(email.value)) {
            e.preventDefault();
            showError(email, "يرجى إدخال بريد إلكتروني صحيح");
            return;
        }

        if (password && password.value.length < 6) {
            e.preventDefault();
            showError(password, "كلمة المرور يجب أن تكون 6 أحرف على الأقل");
            return;
        }

        // خاص بصفحة signup
        const confirm = form.querySelector('input[name="confirm_password"]');
        if (confirm && password.value !== confirm.value) {
            e.preventDefault();
            showError(confirm, "كلمتا المرور غير متطابقتين");
            return;
        }
    });

    /* =========================
       أدوات مساعدة
    ========================= */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        removeErrors();

        const error = document.createElement("div");
        error.className = "form-error";
        error.textContent = message;

        input.parentElement.appendChild(error);
        input.focus();
    }

    function removeErrors() {
        document.querySelectorAll(".form-error").forEach(el => el.remove());
    }

});