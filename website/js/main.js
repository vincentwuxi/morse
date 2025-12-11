/**
 * Morse Light Website - Main JavaScript
 * Handles language detection and switching
 */

// Supported languages
const SUPPORTED_LANGUAGES = [
    'en', 'zh', 'zh-TW', 'es', 'ja', 'it', 'de', 'fr',
    'ru', 'ar', 'pt', 'hi', 'nl', 'tr', 'ko', 'ms'
];

// Detect browser language and map to supported language
function detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage || 'en';
    const langCode = browserLang.toLowerCase();

    // Traditional Chinese
    if (langCode.startsWith('zh-tw') || langCode.startsWith('zh-hant') ||
        langCode === 'zh-hk' || langCode === 'zh-mo') {
        return 'zh-TW';
    }
    // Simplified Chinese
    if (langCode.startsWith('zh')) {
        return 'zh';
    }

    // Check other languages
    const langPrefix = langCode.split('-')[0];
    const languageMap = {
        'es': 'es', 'ja': 'ja', 'it': 'it', 'de': 'de', 'fr': 'fr',
        'ru': 'ru', 'ar': 'ar', 'pt': 'pt', 'hi': 'hi', 'nl': 'nl',
        'tr': 'tr', 'ko': 'ko', 'ms': 'ms', 'id': 'ms' // Indonesian maps to Malay
    };

    return languageMap[langPrefix] || 'en';
}

// Get nested object value by path
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Apply translations to the page
function applyTranslations(lang) {
    const langData = translations[lang] || translations['en'];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedValue(langData, key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // Update page title
    if (langData.app && langData.app.title) {
        document.title = `${langData.app.title} - ${langData.hero.tagline}`;
    }

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && langData.hero && langData.hero.description) {
        metaDesc.setAttribute('content', langData.hero.description);
    }

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.style.textAlign = 'right';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.style.textAlign = 'left';
    }
}

// Set language and save preference
function setLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        lang = 'en';
    }

    // Save to localStorage
    localStorage.setItem('morse-website-language', lang);

    // Update language selector
    const selector = document.getElementById('language-select');
    if (selector) {
        selector.value = lang;
    }

    // Apply translations
    applyTranslations(lang);

    // Update html lang attribute
    document.documentElement.lang = lang;
}

// Get current language
function getCurrentLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem('morse-website-language');
    if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
    }

    // Auto-detect from browser
    return detectLanguage();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    // Get initial language
    const lang = getCurrentLanguage();

    // Set language selector value
    const selector = document.getElementById('language-select');
    if (selector) {
        selector.value = lang;

        // Listen for language changes
        selector.addEventListener('change', function (e) {
            setLanguage(e.target.value);
        });
    }

    // Apply translations
    applyTranslations(lang);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and steps
    document.querySelectorAll('.feature-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
