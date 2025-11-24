export const MORSE_MAP: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
    ' ': '/',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
    '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
    ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
    '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

export const REVERSE_MORSE_MAP: Record<string, string> = Object.entries(MORSE_MAP).reduce((acc, [char, code]) => {
    acc[code] = char;
    return acc;
}, {} as Record<string, string>);

export function textToMorse(text: string): string {
    return text.toUpperCase().split('').map(char => MORSE_MAP[char] || '').join(' ').trim();
}

export function morseToText(morse: string): string {
    return morse.split(' ').map(code => REVERSE_MORSE_MAP[code] || '').join('');
}

// Timing constants (in ms)
export const DOT_DURATION = 200;
export const DASH_DURATION = DOT_DURATION * 3;
export const SYMBOL_SPACE = DOT_DURATION;
export const LETTER_SPACE = DOT_DURATION * 3;
export const WORD_SPACE = DOT_DURATION * 7;

export async function transmit(
    morse: string,
    onSignal: (state: boolean) => void,
    signalRef: { current: boolean } // To allow cancellation
): Promise<void> {
    const symbols = morse.split('');

    for (let i = 0; i < symbols.length; i++) {
        if (!signalRef.current) break;

        const symbol = symbols[i];

        if (symbol === '.') {
            onSignal(true);
            await new Promise(r => setTimeout(r, DOT_DURATION));
            onSignal(false);
            await new Promise(r => setTimeout(r, SYMBOL_SPACE));
        } else if (symbol === '-') {
            onSignal(true);
            await new Promise(r => setTimeout(r, DASH_DURATION));
            onSignal(false);
            await new Promise(r => setTimeout(r, SYMBOL_SPACE));
        } else if (symbol === ' ') {
            // Space between letters is 3 units, but we already waited 1 unit (SYMBOL_SPACE) after the last symbol.
            // So we wait 2 more units.
            // However, if it's a slash '/', it means a word space (7 units).
            // Let's handle spaces and slashes carefully.
            await new Promise(r => setTimeout(r, LETTER_SPACE - SYMBOL_SPACE));
        } else if (symbol === '/') {
            // Word space: 7 units. We already waited 1 unit. So wait 6 more.
            await new Promise(r => setTimeout(r, WORD_SPACE - SYMBOL_SPACE));
        }
    }
    onSignal(false);
}
