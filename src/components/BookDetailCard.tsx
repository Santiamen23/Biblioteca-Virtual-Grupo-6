"use client";

import { useFavorites } from "@/hooks/useFavorites";
import type { Book, BookDetail } from "@/models/book";
import { getCoverUrl } from "@/services/openLibraryService";
import styles from "./BookDetailCard.module.css";

type BookDetailCardProps = {
  book: BookDetail;
};

export default function BookDetailCard({ book }: BookDetailCardProps) {
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  const favoriteBook: Book = {
    id: book.id,
    title: book.title,
    authors: book.authors,
    firstPublishYear: null,
    languages: [],
    languageNames: [],
    coverId: book.coverId,
    editionCount: 0,
    publisher: "Desconocido",
  };

  const isBookFavorite = checkIsFavorite(book.id);

  return (
    <div className={styles.content}>
      <div className={styles.coverContainer}>
        {book.coverId ? (
          <img
            src={getCoverUrl(book.coverId)}
            alt={book.title}
            className={styles.cover}
          />
        ) : (
          <div className={styles.noCover}>Sin portada disponible</div>
        )}
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{book.title}</h1>

        <div className={styles.meta}>
          <p>
            <span className={styles.label}>Autores:</span>{" "}
            {book.authors.length > 0
              ? book.authors.join(", ")
              : "Autor no disponible"}
          </p>

          {book.firstPublishDate && (
            <p>
              <span className={styles.label}>Primera publicación:</span>{" "}
              {book.firstPublishDate}
            </p>
          )}

          <p>
            <span className={styles.label}>Open Library:</span>{" "}
            <a
              href={`https://openlibrary.org/works/${book.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Ver en Open Library
            </a>
          </p>
        </div>

        {book.description && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Descripción</h2>
            <p className={styles.description}>{book.description}</p>
          </div>
        )}

        {book.subjects.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Temas</h2>
            <div className={styles.tags}>
              {book.subjects.map((subject) => (
                <span key={subject} className={styles.tag}>
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => toggleFavorite(favoriteBook)}
          className={`${styles.favBtn} ${
            isBookFavorite ? styles.favActive : styles.favInactive
          }`}
        >
          {isBookFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    </div>
  );
}
