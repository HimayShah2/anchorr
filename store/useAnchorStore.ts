import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Safe haptics wrapper - won't crash if native module is unavailable
const safeHaptics = {
    notification: async () => {
        try {
            if (Platform.OS !== 'web') {
                const Haptics = require('expo-haptics');
                await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
        } catch { }
    },
    impact: async () => {
        try {
            if (Platform.OS !== 'web') {
                const Haptics = require('expo-haptics');
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }
        } catch { }
    },
};

interface JournalEntry {
    id: string;
    timestamp: number;
    content: string;
    type: 'ANCHOR' | 'RESET';
}

interface AnchorState {
    currentAnchor: string;
    lastLogTime: number;
    currentTarget: string;
    history: JournalEntry[];

    // Actions
    logAnchor: (text: string) => void;
    setTarget: (task: string) => void;
    panicReset: () => void;
    clearHistory: () => void;
}

export const useAnchorStore = create<AnchorState>()(
    persist(
        (set, get) => ({
            currentAnchor: "Ready to work",
            lastLogTime: Date.now(),
            currentTarget: "Set a goal",
            history: [],

            logAnchor: (text) => {
                safeHaptics.notification();
                const newEntry: JournalEntry = {
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    content: text,
                    type: 'ANCHOR'
                };

                set((state) => ({
                    currentAnchor: text,
                    lastLogTime: Date.now(),
                    history: [newEntry, ...state.history].slice(0, 100)
                }));
            },

            setTarget: (task) => set({ currentTarget: task }),

            panicReset: () => {
                safeHaptics.impact();
                const newEntry: JournalEntry = {
                    id: Date.now().toString(),
                    timestamp: Date.now(),
                    content: "CONTEXT RESET",
                    type: 'RESET'
                };

                set((state) => ({
                    currentAnchor: "CONTEXT RESET",
                    lastLogTime: Date.now(),
                    currentTarget: "Breathe. One small step.",
                    history: [newEntry, ...state.history].slice(0, 100)
                }));
            },

            clearHistory: () => set({ history: [] })
        }),
        {
            name: 'anchor-local-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
