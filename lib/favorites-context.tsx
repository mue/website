'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useFavorites } from './use-favorites';

type FavoritesContextType = {
  favorites: Array<{ type: string; name: string }>;
  toggleFavorite: (type: string, name: string) => void;
  isFavorite: (type: string, name: string) => boolean;
  loaded: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favoritesData = useFavorites();

  return <FavoritesContext.Provider value={favoritesData}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}
