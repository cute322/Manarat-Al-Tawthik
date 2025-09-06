/**
 * =======================================================================================
 * | الملف البرمجي الرئيسي لمشروع "منارة التوثيق"                                        |
 * |                                                                                     |
 * | الإصدار: 1.0.0                                                                      |
 * | المطور: دليلة شريف سليمان                                                            |
 * | تاريخ التحديث: 6 سبتمبر 2025                                                        |
 * |                                                                                     |
 * | يحتوي هذا الملف على جميع الوظائف التفاعلية للموقع:                                  |
 * | 1. نظام التبويبات (Tabs) للتنقل بين أنظمة التوثيق.                                   |
 * | 2. نظام الوضع المظلم (Dark Mode) مع حفظ تفضيلات المستخدم.                          |
 * | 3. نظام النافذة المنبثقة (Modal) لعرض سياسة الخصوصية.                               |
 * =======================================================================================
 */

// ننتظر حتى يتم تحميل كامل محتوى الصفحة (HTML) قبل تشغيل أي كود برمجي.
// هذا يضمن أن جميع العناصر (الأزرار، الأقسام) موجودة وجاهزة للتفاعل.
document.addEventListener('DOMContentLoaded', function () {

    // ===============================================
    //           1. الكود الخاص بنظام التبويبات (Tabs)
    // ===============================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const contentSections = document.querySelectorAll('.content-section');

    // المرور على كل زر من أزرار التبويب
    tabButtons.forEach(button => {
        // إضافة مستمع لحدث "النقر"
        button.addEventListener('click', () => {
            // إزالة حالة "النشاط" من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة حالة "النشاط" للزر الذي تم النقر عليه فقط
            button.classList.add('active');

            // الحصول على مُعرّف القسم المستهدف من السمة 'data-target'
            const targetId = button.getAttribute('data-target');
            
            // إخفاء جميع أقسام المحتوى
            contentSections.forEach(section => section.classList.remove('visible'));
            
            // إظهار القسم المستهدف فقط
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('visible');
            }
        });
    });

    // ===============================================
    //           2. الكود الخاص بالوضع المظلم
    // ===============================================
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    // وظيفة لتطبيق الثيم المحفوظ في ذاكرة المتصفح أو الثيم المفضل للنظام
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            body.classList.add('dark-mode');
            themeToggleButton.textContent = '☀️'; // تغيير الأيقونة إلى الشمس
        } else {
            body.classList.remove('dark-mode');
            themeToggleButton.textContent = '🌙'; // تغيير الأيقونة إلى القمر
        }
    }

    // التأكد من وجود زر تغيير الثيم قبل إضافة المستمع
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            // تبديل الكلاس 'dark-mode' على عنصر الـ body
            body.classList.toggle('dark-mode');
            
            // حفظ اختيار المستخدم في ذاكرة المتصفح (localStorage)
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeToggleButton.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleButton.textContent = '🌙';
            }
        });
    }
    // استدعاء الوظيفة عند تحميل الصفحة لتطبيق الثيم الصحيح مباشرة
    applySavedTheme();

    // ===============================================
    //           3. الكود الرسمي لتشغيل نافذة الخصوصية
    // ===============================================
    const privacyModal = document.getElementById('privacy-modal');
    const privacyPolicyLink = document.getElementById('privacy-policy-link');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // وظيفة لإظهار النافذة المنبثقة
    function openModal() {
        if (privacyModal) privacyModal.classList.add('visible');
    }

    // وظيفة لإخفاء النافذة المنبثقة
    function closeModal() {
        if (privacyModal) privacyModal.classList.remove('visible');
    }

    // إضافة مستمع لحدث النقر على رابط "سياسة الخصوصية"
    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', function(event) {
            // منع السلوك الافتراضي للرابط (وهو القفز لأعلى الصفحة)
            event.preventDefault();
            openModal();
        });
    }

    // إضافة مستمع لحدث النقر على زر الإغلاق (×)
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // إضافة مستمع لإغلاق النافذة عند النقر على الخلفية المعتمة
    if (privacyModal) {
        privacyModal.addEventListener('click', function(event) {
            // إذا كان العنصر الذي تم النقر عليه هو الخلفية نفسها وليس المحتوى
            if (event.target === privacyModal) {
                closeModal();
            }
        });
    }

}); // نهاية المستمع الرئيسي لـ DOMContentLoaded