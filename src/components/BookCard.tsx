"use client";

import Link from "next/link";
import type { BookCardProps } from "@/models/book";
import { getBookWorkId } from "@/models/book";
import { useFavorites } from "@/hooks/useFavorites";
import { getCoverUrl } from "@/services/openLibraryService";
import styles from "./BookCard.module.scss";

export default function BookCard({ book }: BookCardProps) {
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  const workId = getBookWorkId(book.id);
  const isBookFavorite = checkIsFavorite(workId);

  return (
    <article className={styles.card}>
      <img
        src={getCoverUrl(book.coverId)}
        alt={book.title}
        className={styles.cover}
      />

      <div className={styles.body}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>
          {book.authors.length > 0
            ? book.authors.join(", ")
            : "Autor no disponible"}
        </p>
        <div className={styles.meta}>
          <span>Año: {book.firstPublishYear || "No disponible"}</span>
          <span>Ediciones: {book.editionCount}</span>
        </div>
        <div className={styles.actions}>
          <Link href={`/libro/${workId}`} className={styles.detailButton}>
            Ver detalles
          </Link>
          <button
            type="button"
            onClick={() => toggleFavorite(book)}
            className={styles.favoriteButton}
          >
            {isBookFavorite ? "Quitar" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
