import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Flashlight, FlashlightOff, XCircle } from 'lucide-react';
import { textToMorse, transmit } from '../utils/morse';
import { useFlashlight } from '../hooks/useFlashlight';
import { clsx } from 'clsx';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';

export function Home() {
    const location = useLocation();
    const { t } = useLanguage();
    const { transmissionMode } = useSettings();
    const [input, setInput] = useState('');
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isFullScreenMode, setIsFullScreenMode] = useState(false);

    useEffect(() => {
        if (location.state?.initialText) {
            setInput(location.state.initialText);
            // Clear state so it doesn't persist on refresh/back
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const [currentSignal, setCurrentSignal] = useState(false);
    const { isSupported, toggle } = useFlashlight();
    const signalRef = useRef(false);

    const morseCode = textToMorse(input);

    // Determine if we should use flashlight based on setting and support
    const shouldUseFlashlight = transmissionMode === 'flashlight' && isSupported;
    const shouldUseScreenFlash = transmissionMode === 'screen' || !isSupported;

    // Function to start countdown
    const startCountdown = useCallback((): Promise<void> => {
        return new Promise((resolve) => {
            let count = 3;
            setCountdown(count);

            const interval = setInterval(() => {
                count--;
                if (count > 0) {
                    setCountdown(count);
                } else {
                    clearInterval(interval);
                    setCountdown(null);
                    resolve();
                }
            }, 1000);
        });
    }, []);

    const handleTransmit = async () => {
        if (!input.trim() || isTransmitting) return;

        setIsTransmitting(true);
        signalRef.current = true;

        try {
            // If using screen flash mode, show countdown first
            if (shouldUseScreenFlash) {
                await startCountdown();
                // Check if user stopped during countdown
                if (!signalRef.current) {
                    setIsTransmitting(false);
                    return;
                }
                // Enter fullscreen mode with black background
                setIsFullScreenMode(true);
            }

            await transmit(
                morseCode,
                (state) => {
                    setCurrentSignal(state);
                    if (shouldUseFlashlight) {
                        toggle(state);
                    }
                },
                signalRef
            );
        } catch (error) {
            console.error("Transmission error:", error);
        } finally {
            setIsTransmitting(false);
            setCurrentSignal(false);
            setIsFullScreenMode(false);
            setCountdown(null);
            if (shouldUseFlashlight) {
                toggle(false);
            }
            signalRef.current = false;
        }
    };

    const handleStop = () => {
        signalRef.current = false;
        setCountdown(null);
        setIsFullScreenMode(false);
    };

    return (
        <>
            {/* Countdown Overlay */}
            {countdown !== null && (
                <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center">
                    <div className="text-center">
                        <div
                            key={countdown}
                            className="text-[200px] font-bold text-white animate-countdown"
                            style={{
                                textShadow: '0 0 60px rgba(59, 130, 246, 0.8), 0 0 120px rgba(59, 130, 246, 0.5)',
                            }}
                        >
                            {countdown}
                        </div>
                        <button
                            onClick={handleStop}
                            className="mt-8 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all mx-auto"
                        >
                            <XCircle className="w-5 h-5" />
                            {t('home.stop')}
                        </button>
                    </div>
                </div>
            )}

            {/* Full Screen Flash Mode */}
            {isFullScreenMode && countdown === null && (
                <div
                    className={clsx(
                        "fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-75",
                        currentSignal ? "bg-white" : "bg-black"
                    )}
                >
                    <button
                        onClick={handleStop}
                        className={clsx(
                            "absolute bottom-10 left-1/2 -translate-x-1/2 font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all",
                            currentSignal
                                ? "bg-slate-800 text-white hover:bg-slate-700"
                                : "bg-red-600 text-white hover:bg-red-500"
                        )}
                    >
                        <XCircle className="w-5 h-5" />
                        {t('home.stop')}
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-6">
                {/* Input Section */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-lg">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t('home.placeholder')}
                        className="w-full bg-transparent text-slate-100 placeholder-slate-500 resize-none outline-none text-lg min-h-[120px]"
                        disabled={isTransmitting}
                    />
                    <div className="mt-2 flex justify-between items-center text-slate-500 text-sm">
                        <span>{input.length} {t('home.chars')}</span>
                        <button
                            onClick={() => setInput('')}
                            className="hover:text-slate-300 transition-colors"
                            disabled={isTransmitting}
                        >
                            {t('home.clear')}
                        </button>
                    </div>
                </div>

                {/* Morse Preview */}
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 min-h-[80px] flex items-center justify-center text-center">
                    {morseCode ? (
                        <p className="text-2xl font-mono text-blue-400 tracking-wider break-all leading-relaxed">
                            {morseCode}
                        </p>
                    ) : (
                        <p className="text-slate-600 italic">{t('home.preview')}</p>
                    )}
                </div>

                {/* Controls */}
                <div className="mt-auto">
                    {!isTransmitting ? (
                        <button
                            onClick={handleTransmit}
                            disabled={!input.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20"
                        >
                            <Send className="w-6 h-6" />
                            {t('home.start')}
                        </button>
                    ) : (
                        <button
                            onClick={handleStop}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] animate-pulse"
                        >
                            <XCircle className="w-6 h-6" />
                            {t('home.stop')}
                        </button>
                    )}

                    <div className="mt-4 flex justify-center items-center gap-2 text-slate-500 text-sm">
                        {shouldUseFlashlight ? (
                            <>
                                <Flashlight className="w-4 h-4 text-green-500" />
                                <span>{t('home.flashlightReady')}</span>
                            </>
                        ) : (
                            <>
                                <FlashlightOff className="w-4 h-4 text-yellow-500" />
                                <span>{t('home.screenFlash')}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Visual Indicator for flashlight mode */}
                {shouldUseFlashlight && (
                    <div className={clsx(
                        "fixed inset-0 pointer-events-none z-50 transition-opacity duration-75 flex items-center justify-center",
                        currentSignal ? "opacity-100" : "opacity-0"
                    )}>
                        <div className="w-64 h-64 rounded-full blur-3xl bg-blue-500/20" />
                    </div>
                )}
            </div>
        </>
    );
}
