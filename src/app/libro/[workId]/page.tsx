"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";
import type { Book } from "@/models/book";
import type { OpenLibraryDoc } from "@/models/open-library";
import { getCoverUrl } from "@/services/openLibraryService";
import styles from "./BookDetail.module.css";

const BASE_URL = "https://openlibrary.org";

async function getBookDetail(workId: string): Promise<OpenLibraryDoc> {
  const response = await fetch(`${BASE_URL}/works/${workId}.json`);
  if (!response.ok) throw new Error("Error al obtener el libro");
  return response.json();
}

export default function BookDetailPage() {
  const params = useParams<{ workId: string }>();
  const workId = params?.workId || "";
  const router = useRouter();
  const [book, setBook] = useState<OpenLibraryDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, checkIsFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        const data = await getBookDetail(workId);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [workId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => router.back()} className={styles.backBtn}>
          Volver
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.error}>
        <p>Libro no encontrado</p>
      </div>
    );
  }

  const favoriteBook: Book = {
    id: workId,
    title: book.title || "Sin título",
    authors: book.author_name || [],
    firstPublishYear: book.first_publish_year || null,
    languages: book.language || [],
    languageNames: book.language_name || [],
    coverId: book.cover_i || null,
    editionCount: book.edition_count || 0,
    publisher: book.publisher?.[0] || "Desconocido",
  };

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        ← Volver
      </button>

      <div className={styles.content}>
        <div className={styles.coverContainer}>
          {book.cover_i ? (
            <img
              src={getCoverUrl(book.cover_i)}
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
            {book.first_publish_year && (
              <p>
                <span className={styles.label}>Publicación:</span>{" "}
                {book.first_publish_year}
              </p>
            )}
            <p>
              <span className={styles.label}>Open Library:</span>{" "}
              <a
                href={`https://openlibrary.org/works/${workId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                Ver en Open Library
              </a>
            </p>
          </div>

          <button
            onClick={() => toggleFavorite(favoriteBook)}
            className={`${styles.favBtn} ${
              checkIsFavorite(workId) ? styles.favActive : styles.favInactive
            }`}
          >
            {checkIsFavorite(workId)
              ? "Quitar de favoritos"
              : "Agregar a favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}