"use client";

import { useEffect, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import {
  searchBooks,
  type Book,
  type SearchType,
} from "../services/openLibraryService";
import styles from "./Search.module.css";

type Filters = {
  minYear: string;
  maxYear: string;
  language: string;
  author: string;
};

const initialFilters: Filters = {
  minYear: "",
  maxYear: "",
  language: "",
  author: "",
};

const getCoverUrl = (coverId: number | null) =>
  coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://placehold.co/280x420/e5e7eb/6b7280?text=No+Cover";

export default function Search() {
  const [searchType, setSearchType] = useState<SearchType>("q");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    document.title = "Biblioteca Inteligente | Búsqueda avanzada";
  }, []);

  const normalizedLanguage = filters.language.trim().toLowerCase();
  const normalizedAuthor = filters.author.trim().toLowerCase();
  const minYear = filters.minYear ? Number(filters.minYear) : null;
  const maxYear = filters.maxYear ? Number(filters.maxYear) : null;

  const filteredBooks = books.filter((book) => {
    const matchesMinYear =
      minYear === null ||
      (book.firstPublishYear !== null && book.firstPublishYear >= minYear);
    const matchesMaxYear =
      maxYear === null ||
      (book.firstPublishYear !== null && book.firstPublishYear <= maxYear);
    const matchesAuthor =
      !normalizedAuthor ||
      book.authors.some((author) =>
        author.toLowerCase().includes(normalizedAuthor),
      );
    const matchesLanguage =
      !normalizedLanguage ||
      book.languages.some((language) =>
        language.toLowerCase().includes(normalizedLanguage),
      ) ||
      book.languageNames.some((language) =>
        language.toLowerCase().includes(normalizedLanguage),
      );

    return (
      matchesMinYear && matchesMaxYear && matchesAuthor && matchesLanguage
    );
  });

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSearched(true);
    setLoading(true);
    setError("");

    try {
      const results = await searchBooks({ type: searchType, query });
      setBooks(results);
    } catch (searchError) {
      setBooks([]);
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Ocurrió un error al buscar libros.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <span className={styles.badge}>Biblioteca Inteligente</span>
          <h1 className={styles.title}>Módulo de búsqueda avanzada</h1>
          <p className={styles.description}>
            Busca libros en Open Library por título, autor o palabras clave y
            después filtra los resultados localmente.
          </p>
        </section>

        <SearchBar
          searchType={searchType}
          query={query}
          onTypeChange={setSearchType}
          onQueryChange={setQuery}
          onSubmit={handleSearch}
          disabled={loading}
        />

        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Resultados</h2>
            <span className={styles.resultsCount}>
              {filteredBooks.length} libro(s)
            </span>
          </div>

          {loading && (
            <div className={styles.messageBox}>Cargando resultados...</div>
          )}

          {!loading && error && (
            <div className={styles.errorBox}>{error}</div>
          )}

          {!loading && !error && hasSearched && filteredBooks.length === 0 && (
            <div className={styles.messageBox}>
              No se encontraron libros con esos criterios.
            </div>
          )}

          {!loading && !error && !hasSearched && (
            <div className={styles.messageBox}>
              Realiza una búsqueda para ver resultados.
            </div>
          )}

          {!loading && !error && filteredBooks.length > 0 && (
            <div className={styles.grid}>
              {filteredBooks.map((book) => (
                <article key={book.id} className={styles.card}>
                  <img
                    src={getCoverUrl(book.coverId)}
                    alt={book.title}
                    className={styles.cover}
                  />

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{book.title}</h3>
                    <p className={styles.cardText}>
                      {book.authors.length > 0
                        ? book.authors.join(", ")
                        : "Autor no disponible"}
                    </p>
                    <p className={styles.cardMeta}>
                      Año: {book.firstPublishYear || "No disponible"}
                    </p>
                    <p className={styles.cardMeta}>
                      Idioma:{" "}
                      {book.languageNames[0] ||
                        book.languages[0] ||
                        "No disponible"}
                    </p>
                    <p className={styles.cardMeta}>
                      Editorial: {book.publisher}
                    </p>
                    <p className={styles.cardMeta}>
                      Ediciones: {book.editionCount}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
