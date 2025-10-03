'use client';

import { useState, useEffect, useCallback } from 'react';

type FavoriteItem = {
  type: string;
  name: string;
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('mkt_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // ignore errors
    }
    setLoaded(true);
  }, []);

  const toggleFavorite = (type: string, name: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.type === type && f.name === name);
      const newFavorites = exists
        ? prev.filter((f) => !(f.type === type && f.name === name))
        : [...prev, { type, name }];

      try {
        window.localStorage.setItem('mkt_favorites', JSON.stringify(newFavorites));
      } catch {
        // ignore errors
      }

      return newFavorites;
    });
  };

  const isFavorite = useCallback(
    (type: string, name: string) => {
      return favorites.some((f) => f.type === type && f.name === name);
    },
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    loaded,
  };
}
