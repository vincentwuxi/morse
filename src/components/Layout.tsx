import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Settings, MessageSquare, X, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings, TransmissionMode } from '../contexts/SettingsContext';
import { Language } from '../i18n/translations';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    const location = useLocation();
    const { t, language, setLanguage } = useLanguage();
    const { transmissionMode, setTransmissionMode } = useSettings();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const navItems = [
        { icon: Home, label: t('app.nav.home'), path: '/' },
        { icon: MessageSquare, label: t('app.nav.phrases'), path: '/phrases' },
        { icon: BookOpen, label: t('app.nav.tutorial'), path: '/tutorial' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            <header className="p-4 pt-safe border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {t('app.title')}
                </h1>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                    <Settings className="w-5 h-5 text-slate-400" />
                </button>
            </header>

            <main className="flex-1 p-4 pb-24 max-w-md mx-auto w-full">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 pb-safe">
                <div className="flex justify-around items-center p-2 max-w-md mx-auto">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path;
                        return (
                            <Link
                                key={path}
                                to={path}
                                className={clsx(
                                    "flex flex-col items-center p-2 rounded-lg transition-colors min-w-[64px]",
                                    isActive ? "text-blue-400" : "text-slate-500 hover:text-slate-300"
                                )}
                            >
                                <Icon className={clsx("w-6 h-6 mb-1", isActive && "fill-current/20")} />
                                <span className="text-xs font-medium">{label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xs p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-100">{t('settings.title')}</h2>
                            <button
                                onClick={() => setIsSettingsOpen(false)}
                                className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-200 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-400 mb-3 block">
                                    {t('settings.language')}
                                </label>
                                <div className="grid gap-2">
                                    {[
                                        { code: 'en', label: 'English' },
                                        { code: 'zh', label: '中文' }
                                    ].map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code as Language)}
                                            className={clsx(
                                                "flex items-center justify-between p-4 rounded-xl border transition-all",
                                                language === lang.code
                                                    ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                                            )}
                                        >
                                            <span className="font-medium">{lang.label}</span>
                                            {language === lang.code && <Check className="w-5 h-5" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-400 mb-3 block">
                                    {t('settings.transmissionMode')}
                                </label>
                                <div className="grid gap-2">
                                    {[
                                        { mode: 'flashlight', label: t('settings.flashlight') },
                                        { mode: 'screen', label: t('settings.screen') }
                                    ].map((option) => (
                                        <button
                                            key={option.mode}
                                            onClick={() => setTransmissionMode(option.mode as TransmissionMode)}
                                            className={clsx(
                                                "flex items-center justify-between p-4 rounded-xl border transition-all",
                                                transmissionMode === option.mode
                                                    ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                                            )}
                                        >
                                            <span className="font-medium">{option.label}</span>
                                            {transmissionMode === option.mode && <Check className="w-5 h-5" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
