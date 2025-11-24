import { BookOpen, Lightbulb, ShieldAlert } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Tutorial() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-100">{t('tutorial.title')}</h2>
                    <p className="text-slate-400 text-sm">{t('tutorial.subtitle')}</p>
                </div>
            </div>

            <div className="space-y-6">
                <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        {t('tutorial.basic.title')}
                    </h3>
                    <ul className="space-y-3 text-slate-400 text-sm leading-relaxed">
                        <li className="flex gap-3">
                            <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                            <span>{t('tutorial.basic.step1')}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                            <span>{t('tutorial.basic.step2')}</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                            <span>{t('tutorial.basic.step3')}</span>
                        </li>
                    </ul>
                </section>

                <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        {t('tutorial.emergency.title')}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                        {t('tutorial.emergency.desc')}
                    </p>
                    <div className="bg-slate-950 rounded-lg p-4 flex items-center justify-center gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-200">S</div>
                            <div className="text-blue-400 font-mono text-xl">...</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-200">O</div>
                            <div className="text-blue-400 font-mono text-xl">---</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-slate-200">S</div>
                            <div className="text-blue-400 font-mono text-xl">...</div>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                    <h3 className="text-lg font-bold text-slate-200 mb-3">{t('tutorial.tips.title')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-400 text-sm">
                        <li>{t('tutorial.tips.tip1')}</li>
                        <li>{t('tutorial.tips.tip2')}</li>
                        <li>{t('tutorial.tips.tip3')}</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
