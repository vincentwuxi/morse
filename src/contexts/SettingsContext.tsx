import React, { createContext, useContext, useState, useEffect } from 'react';

export type TransmissionMode = 'flashlight' | 'screen';

interface SettingsContextType {
    transmissionMode: TransmissionMode;
    setTransmissionMode: (mode: TransmissionMode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [transmissionMode, setTransmissionMode] = useState<TransmissionMode>(() => {
        const saved = localStorage.getItem('morse-app-transmission-mode');
        return (saved === 'flashlight' || saved === 'screen') ? saved : 'flashlight';
    });

    useEffect(() => {
        localStorage.setItem('morse-app-transmission-mode', transmissionMode);
    }, [transmissionMode]);

    return (
        <SettingsContext.Provider value={{ transmissionMode, setTransmissionMode }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
