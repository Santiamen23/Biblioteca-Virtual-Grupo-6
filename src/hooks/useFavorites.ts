"use client";

import { useState, useEffect, useCallback } from "react";
import type { Book } from "@/models/book";
import { getFavorites, addFavorite, removeFavorite, isFavorite } from "@/utils/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const toggleFavorite = useCallback((book: Book) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
    setFavorites(getFavorites());
  }, []);

  const checkIsFavorite = useCallback((id: string) => {
    return isFavorite(id);
  }, []);

  return { favorites, toggleFavorite, checkIsFavorite };
}