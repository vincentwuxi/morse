import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { textToMorse } from '../utils/morse';
import { useLanguage } from '../contexts/LanguageContext';
import { PHRASE_CATEGORIES } from '../data/phraseData';

export function Phrases() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleSelect = (text: string) => {
        navigate('/', { state: { initialText: text } });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-100">{t('phrases.title')}</h2>
                    <p className="text-slate-400 text-sm">{t('phrases.subtitle')}</p>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                {PHRASE_CATEGORIES.map((category) => (
                    <div key={category.id} className="flex flex-col gap-2">
                        {/* Category Header */}
                        <div className="flex items-center gap-2 px-1">
                            <span className="text-lg">{category.icon}</span>
                            <span className="text-sm font-semibold text-slate-300">
                                {t(`phrases.categories.${category.id}`)}
                            </span>
                        </div>

                        {/* Phrase Grid */}
                        <div className="grid grid-cols-2 gap-2">
                            {category.phrases.map((key) => {
                                const label = t(`phrases.items.${key}`);

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleSelect(key)}
                                        className="group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-3 rounded-xl flex flex-col items-start gap-1 transition-all active:scale-[0.98]"
                                    >
                                        <div className="w-full flex items-center justify-between">
                                            <span className="font-bold text-slate-200 text-sm">{label}</span>
                                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                                        </div>
                                        <span className="text-xs font-mono text-blue-400/80 tracking-wider truncate w-full">
                                            {textToMorse(key)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
