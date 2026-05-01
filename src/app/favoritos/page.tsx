"use client";

import { useFavorites } from "@/hooks/useFavorites";
import BookCard from "@/components/BookCard";
import type { Book } from "@/models/book";
import styles from "./Favorites.module.css";
import Link from "next/link";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>No tienes favoritos</h2>
        <p className={styles.emptyText}>
          Explora libros y agrégalos a tu colección
        </p>
        <Link href="/buscar" className={styles.emptyLink}>
          Explorar libros
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Mis Favoritos</h1>
      <p className={styles.count}>{favorites.length} libro(s) guardado(s)</p>

      <div className={styles.grid}>
        {favorites.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}