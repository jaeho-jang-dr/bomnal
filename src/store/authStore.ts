import { create } from 'zustand';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AuthState {
    user: User | null;
    loading: boolean;
    initialize: () => () => void; // Returns unsubscribe function
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    initialize: () => {
        set({ loading: true });
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            set({ user, loading: false });
        });
        return unsubscribe;
    },
    signOut: async () => {
        await firebaseSignOut(auth);
        set({ user: null });
    },
}));
