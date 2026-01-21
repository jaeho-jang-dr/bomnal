import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteStore {
    favorites: string[]; // List of Product IDs
    toggleFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (productId) => set((state) => {
                const isFav = state.favorites.includes(productId);
                return {
                    favorites: isFav
                        ? state.favorites.filter(id => id !== productId)
                        : [...state.favorites, productId]
                };
            }),
            isFavorite: (productId) => get().favorites.includes(productId),
        }),
        {
            name: 'bomnal-favorites-storage',
        }
    )
);
