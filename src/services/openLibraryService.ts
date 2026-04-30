import { Book } from "../models/Books";

const BASE_URL = "https://openlibrary.org/search.json";

type OpenLibraryDoc = {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  language?: string[];
  language_name?: string[];
  cover_i?: number;
  edition_count?: number;
  publisher?: string[];
};

type OpenLibraryResponse = {
  docs?: OpenLibraryDoc[];
};

export type SearchType = "title" | "author" | "q";

type SearchBooksParams = {
  type?: SearchType;
  query?: string;
  limit?: number;
};

const normalizeBooks = (docs: OpenLibraryDoc[] = []): Book[] =>
  docs.map((book, index) => ({
    id:
      book.key ||
      `${book.title || "book"}-${book.first_publish_year || "unknown"}-${index}`,
    title: book.title || "Untitled",
    authors: book.author_name || [],
    firstPublishYear: book.first_publish_year || null,
    languages: book.language || [],
    languageNames: book.language_name || [],
    coverId: book.cover_i || null,
    editionCount: book.edition_count || 0,
    publisher: book.publisher?.[0] || "Unknown publisher",
  }));

export async function searchBooks({
  type = "q",
  query = "",
  limit = 24,
}: SearchBooksParams = {}): Promise<Book[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (type === "title") {
    params.set("title", trimmedQuery);
  } else if (type === "author") {
    params.set("author", trimmedQuery);
  } else {
    params.set("q", trimmedQuery);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la informacion de Open Library.");
  }

  const data: OpenLibraryResponse = await response.json();

  return normalizeBooks(data.docs);
}
