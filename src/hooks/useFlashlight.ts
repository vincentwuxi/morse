import { useState, useEffect, useCallback } from 'react';
import { registerPlugin } from '@capacitor/core';

export interface FlashlightPlugin {
    isAvailable(): Promise<{ value: boolean }>;
    switchOn(options?: { intensity?: number }): Promise<void>;
    switchOff(): Promise<void>;
    isSwitchedOn(): Promise<{ value: boolean }>;
}

const Flashlight = registerPlugin<FlashlightPlugin>('Flashlight');

export function useFlashlight() {
    const [isSupported, setIsSupported] = useState(false);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        async function checkSupport() {
            try {
                const result = await Flashlight.isAvailable();
                setIsSupported(result.value);
            } catch (err) {
                console.error('Flashlight check failed:', err);
                setIsSupported(false);
            }
        }

        checkSupport();

        // Cleanup: ensure flashlight is off when unmounting
        return () => {
            Flashlight.switchOff().catch(() => { });
        };
    }, []);

    const toggle = useCallback(async (state: boolean) => {
        if (!isSupported) return;

        try {
            if (state) {
                await Flashlight.switchOn({ intensity: 1.0 });
                setIsOn(true);
            } else {
                await Flashlight.switchOff();
                setIsOn(false);
            }
        } catch (err) {
            console.error('Failed to toggle flashlight:', err);
        }
    }, [isSupported]);

    return { isSupported, isOn, toggle };
}
