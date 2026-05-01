import type { Book } from "@/models/book";

const FAVORITES_KEY = "biblioteca_favoritos";

export function getFavorites(): Book[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavorite(book: Book): void {
  const favorites = getFavorites();
  if (favorites.some((b) => b.id === book.id)) return;
  favorites.push(book);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function removeFavorite(id: string): void {
  const favorites = getFavorites();
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.filter((b) => b.id !== id)));
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((b) => b.id === id);
}