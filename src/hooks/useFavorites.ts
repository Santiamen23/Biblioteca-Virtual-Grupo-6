"use client";

import { useCallback, useEffect, useState } from "react";
import type { Book } from "@/models/book";
import { getBookWorkId } from "@/models/book";
import { getFavorites, addFavorite, removeFavorite, isFavorite } from "@/utils/storage";

const FAVORITES_UPDATED_EVENT = "favorites-updated";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Book[]>(() => getFavorites());

  useEffect(() => {
    const syncFavorites = () => {
      setFavorites(getFavorites());
    };

    window.addEventListener("storage", syncFavorites);
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorites);
    };
  }, []);

  const toggleFavorite = useCallback((book: Book) => {
    const normalizedBook = {
      ...book,
      id: getBookWorkId(book.id),
    };

    if (isFavorite(normalizedBook.id)) {
      removeFavorite(normalizedBook.id);
    } else {
      addFavorite(normalizedBook);
    }

    setFavorites(getFavorites());
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  }, []);

  const checkIsFavorite = useCallback((id: string) => {
    return isFavorite(getBookWorkId(id));
  }, []);

  return { favorites, toggleFavorite, checkIsFavorite };
}
