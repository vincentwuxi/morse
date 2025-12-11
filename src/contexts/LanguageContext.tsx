import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, LANGUAGE_OPTIONS } from '../i18n/translations';

// Helper to get nested object values
function getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || path;
}

// Detect browser/device language and map to supported language
function detectLanguage(): Language {
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    const langCode = browserLang.toLowerCase();

    // Map browser language codes to our supported languages
    if (langCode.startsWith('zh-tw') || langCode.startsWith('zh-hant') || langCode === 'zh-hk' || langCode === 'zh-mo') {
        return 'zh-TW';
    }
    if (langCode.startsWith('zh')) {
        return 'zh';
    }
    if (langCode.startsWith('es')) {
        return 'es';
    }
    if (langCode.startsWith('ja')) {
        return 'ja';
    }
    if (langCode.startsWith('it')) {
        return 'it';
    }
    if (langCode.startsWith('de')) {
        return 'de';
    }
    if (langCode.startsWith('fr')) {
        return 'fr';
    }
    if (langCode.startsWith('ru')) {
        return 'ru';
    }
    if (langCode.startsWith('ar')) {
        return 'ar';
    }
    if (langCode.startsWith('pt')) {
        return 'pt';
    }
    if (langCode.startsWith('hi')) {
        return 'hi';
    }
    if (langCode.startsWith('nl')) {
        return 'nl';
    }
    if (langCode.startsWith('tr')) {
        return 'tr';
    }
    if (langCode.startsWith('ko')) {
        return 'ko';
    }
    if (langCode.startsWith('ms') || langCode.startsWith('id')) {
        return 'ms';
    }

    return 'en';
}

// Validate if a language code is supported
function isValidLanguage(lang: string): lang is Language {
    return LANGUAGE_OPTIONS.some(opt => opt.code === lang);
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('morse-app-language');
        if (saved && isValidLanguage(saved)) {
            return saved;
        }
        // Auto-detect language from device/browser
        return detectLanguage();
    });

    useEffect(() => {
        localStorage.setItem('morse-app-language', language);
    }, [language]);

    const t = (key: string): string => {
        const value = getNestedValue(translations[language], key);
        // Fallback to English if key not found in current language
        if (value === key && language !== 'en') {
            return getNestedValue(translations['en'], key);
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
