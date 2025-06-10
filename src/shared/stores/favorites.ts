import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "../types/character";

interface FavoritesState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (character) =>
        set((state) => ({
          favorites: state.favorites.some((fav) => fav.id === character.id)
            ? state.favorites
            : [...state.favorites, character],
        })),

      removeFavorite: (characterId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== characterId),
        })),

      isFavorite: (characterId) =>
        get().favorites.some((fav) => fav.id === characterId),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "rick-morty-favorites",
    }
  )
);
