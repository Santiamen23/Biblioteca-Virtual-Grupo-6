"use client";

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import type { Book } from "../models/book";
import { searchBooks } from "../services/openLibraryService";
import styles from "./Home.module.css";

const DEFAULT_QUERY = "programming languages";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Biblioteca Inteligente | Inicio";

    const loadBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await searchBooks({
          type: "q",
          query: DEFAULT_QUERY,
          limit: 12,
        });

        setBooks(results);
      } catch (homeError) {
        setBooks([]);
        setError(
          homeError instanceof Error
            ? homeError.message
            : "Ocurrió un error al cargar los libros.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.badge}>Biblioteca Inteligente</span>

          <h1 className={styles.title}>
            Explora libros populares desde Open Library
          </h1>

          <p className={styles.description}>
            Encuentra libros de programación, bases de datos, ingeniería de
            software y tecnología. Esta página muestra una selección inicial de
            libros cargados automáticamente desde la API pública de Open Library.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Libros recomendados</h2>
              
            </div>

            <span className={styles.count}>{books.length} libro(s)</span>
          </div>

          {loading && <Loading />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && books.length === 0 && (
            <div className={styles.emptyState}>
              No se encontraron libros para mostrar.
            </div>
          )}

          {!loading && !error && books.length > 0 && (
            <div className={styles.grid}>
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
