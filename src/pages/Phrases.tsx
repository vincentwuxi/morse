import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { textToMorse } from '../utils/morse';
import { useLanguage } from '../contexts/LanguageContext';

const COMMON_PHRASES = [
    'SOS', 'HELP', 'WATER', 'FOOD', 'MEDICAL', 'YES', 'NO', 'SAFE', 'DANGER', 'LOST'
];

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

            <div className="grid gap-3">
                {COMMON_PHRASES.map((key) => {
                    const label = t(`phrases.items.${key}`);
                    const transmissionText = key; // The key itself is the English text for Morse transmission

                    return (
                        <button
                            key={key}
                            onClick={() => handleSelect(transmissionText)}
                            className="group bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.99]"
                        >
                            <div className="flex flex-col items-start gap-1">
                                <span className="font-bold text-slate-200">{label}</span>
                                <span className="text-xs font-mono text-blue-400/80 tracking-wider">
                                    {textToMorse(transmissionText)}
                                </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
