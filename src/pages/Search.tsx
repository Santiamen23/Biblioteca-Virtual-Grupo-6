"use client";

import { useEffect, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import type { Book } from "../models/book";
import type { Filters, SearchType } from "../models/search";
import { searchBooks } from "../services/openLibraryService";
import styles from "./Search.module.css";

const initialFilters: Filters = {
  minYear: "",
  maxYear: "",
  language: "",
  author: "",
};

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
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
