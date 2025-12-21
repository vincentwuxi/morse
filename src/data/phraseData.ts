// Phrase categories and their items
export interface PhraseCategory {
    id: string;
    icon: string;
    phrases: string[];
}

export const PHRASE_CATEGORIES: PhraseCategory[] = [
    {
        id: 'emergency',
        icon: '🆘',
        phrases: ['SOS', 'HELP', 'MAYDAY', 'FIRE', 'MEDICAL', 'POLICE'],
    },
    {
        id: 'responses',
        icon: '✅',
        phrases: ['YES', 'NO', 'OK', 'WAIT', 'STOP', 'GO'],
    },
    {
        id: 'status',
        icon: '📍',
        phrases: ['SAFE', 'DANGER', 'LOST', 'TRAPPED', 'INJURED', 'HERE'],
    },
    {
        id: 'needs',
        icon: '🎒',
        phrases: ['WATER', 'FOOD', 'SHELTER', 'RESCUE', 'BATTERY', 'SIGNAL'],
    },
    {
        id: 'messages',
        icon: '💬',
        phrases: ['HELLO', 'THANKS', 'SORRY', 'GOODBYE', 'LOVE', 'COME'],
    },
];

// Flat list of all phrases for backwards compatibility
export const ALL_PHRASES = PHRASE_CATEGORIES.flatMap((cat) => cat.phrases);
