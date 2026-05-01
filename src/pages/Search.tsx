"use client";

import { useEffect, useState } from "react";
import FilterPanel from "@/components/FilterPanel";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import type { Book } from "@/models/book";
import type { Filters, SearchType } from "@/models/search";
import {
  getInitialSearchBooks,
  searchBooks,
} from "@/services/openLibraryService";
import {
  clampPage,
  getTotalPages,
  paginateItems,
  SEARCH_RESULTS_PER_PAGE,
} from "@/utils/pagination";
import {
  validateSearchFilters,
  validateSearchQuery,
} from "@/utils/validation";
import styles from "./Search.module.scss";

const initialFilters: Filters = {
  minYear: "",
  maxYear: "",
  language: "",
  author: "",
};

export default function Search() {
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Biblioteca Inteligente | Búsqueda avanzada";

    const loadInitialBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const results = await getInitialSearchBooks(24);

        setBooks(results);
      } catch (initialError) {
        setBooks([]);
        setError(
          initialError instanceof Error
            ? initialError.message
            : "Ocurrió un error al cargar los libros.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadInitialBooks();
  }, []);

  const normalizedLanguage = filters.language.trim().toLowerCase();
  const normalizedAuthor = filters.author.trim().toLowerCase();
  const minYear = filters.minYear ? Number(filters.minYear) : null;
  const maxYear = filters.maxYear ? Number(filters.maxYear) : null;
  const queryError = submitAttempted
    ? validateSearchQuery(query)
    : undefined;
  const filterErrors = validateSearchFilters(filters);
  const hasFilterErrors = Boolean(filterErrors.minYear || filterErrors.maxYear);

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

  const totalPages = getTotalPages(
    filteredBooks.length,
    SEARCH_RESULTS_PER_PAGE,
  );
  const safeCurrentPage = clampPage(currentPage, totalPages);
  const paginatedBooks = paginateItems(
    filteredBooks,
    safeCurrentPage,
    SEARCH_RESULTS_PER_PAGE,
  );

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSearched(true);
    setSubmitAttempted(true);
    setError("");

    const nextQueryError = validateSearchQuery(query);
    const nextFilterErrors = validateSearchFilters(filters);

    if (
      nextQueryError ||
      nextFilterErrors.minYear ||
      nextFilterErrors.maxYear
    ) {
      return;
    }

    setLoading(true);

    try {
      const results = await searchBooks({ type: searchType, query });
      setBooks(results);
      setCurrentPage(1);
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
    setCurrentPage(1);
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
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
          queryError={queryError}
        />

        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleResetFilters}
          errors={filterErrors}
        />

        <section className={styles.resultsSection}>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Resultados</h2>
            <span className={styles.resultsCount}>
              {filteredBooks.length} libro(s)
            </span>
          </div>

          {loading && <Loading />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && hasFilterErrors && (
            <ErrorMessage message={filterErrors.minYear || filterErrors.maxYear || ""} />
          )}

          {!loading &&
            !error &&
            !hasFilterErrors &&
            hasSearched &&
            filteredBooks.length === 0 && (
            <div className={styles.messageBox}>
              No se encontraron libros con esos criterios.
            </div>
            )}

          {!loading &&
            !error &&
            !hasFilterErrors &&
            !hasSearched &&
            filteredBooks.length === 0 && (
            <div className={styles.messageBox}>
              No hay libros disponibles para mostrar.
            </div>
            )}

          {!loading && !error && !hasFilterErrors && filteredBooks.length > 0 && (
            <>
              <div className={styles.grid}>
                {paginatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
              </div>

              <Pagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
