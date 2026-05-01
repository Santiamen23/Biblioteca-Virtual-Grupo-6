"use client";

import Link from "next/link";
import BookCard from "@/components/BookCard";
import { useFavorites } from "@/hooks/useFavorites";
import type { Book } from "@/models/book";
import styles from "./Favorites.module.css";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <section className={styles.section}>
            <div className={styles.empty}>
              <h2 className={styles.emptyTitle}>No tienes favoritos</h2>
              <p className={styles.emptyText}>
                Explora libros y agrégalos a tu colección
              </p>
              <Link href="/buscar" className={styles.emptyLink}>
                Explorar libros
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.badge}>Biblioteca Inteligente</span>
          <h1 className={styles.heading}>Mis Favoritos</h1>
          <p className={styles.description}>
            Revisa tu colección guardada y administra tus libros favoritos con
            el mismo formato visual del catálogo principal.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Libros guardados</h2>
            <p className={styles.count}>{favorites.length} libro(s) guardado(s)</p>
          </div>

          <div className={styles.grid}>
            {favorites.map((book: Book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
