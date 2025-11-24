import { useState, useEffect, useCallback, useRef } from 'react';

export function useFlashlight() {
    const [isSupported, setIsSupported] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const trackRef = useRef<MediaStreamTrack | null>(null);

    useEffect(() => {
        async function initFlashlight() {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const cameras = devices.filter(device => device.kind === 'videoinput');

                if (cameras.length === 0) {
                    console.log('No cameras found');
                    return;
                }

                // Try to get the back camera
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: 'environment'
                    }
                });

                const track = stream.getVideoTracks()[0];
                const capabilities = track.getCapabilities();

                // Check if torch is supported
                // @ts-ignore - torch is not in standard types yet
                if (capabilities.torch) {
                    trackRef.current = track;
                    setIsSupported(true);
                } else {
                    // Clean up if no torch
                    track.stop();
                }
            } catch (err) {
                console.error('Flashlight initialization failed:', err);
            }
        }

        initFlashlight();

        return () => {
            if (trackRef.current) {
                trackRef.current.stop();
            }
        };
    }, []);

    const toggle = useCallback(async (state: boolean) => {
        setIsOn(state);
        if (trackRef.current && isSupported) {
            try {
                await trackRef.current.applyConstraints({
                    advanced: [{ torch: state }] as any
                });
            } catch (err) {
                console.error('Failed to toggle flashlight:', err);
            }
        }
    }, [isSupported]);

    return { isSupported, isOn, toggle };
}
