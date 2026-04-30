import type { Book } from "../models/book";
import type {
  OpenLibraryDoc,
  OpenLibraryResponse,
  SearchBooksParams,
} from "../models/open-library";

const BASE_URL = "https://openlibrary.org/search.json";
const COVERS_BASE_URL = "https://covers.openlibrary.org/b/id";
const DEFAULT_HOME_QUERY = "programming languages";
const DEFAULT_SEARCH_QUERY = "library";
const FALLBACK_COVER_URL =
  "https://placehold.co/280x420/e5e7eb/6b7280?text=No+img";

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

export async function getHomeBooks(limit = 12): Promise<Book[]> {
  return searchBooks({
    type: "q",
    query: DEFAULT_HOME_QUERY,
    limit,
  });
}

export async function getInitialSearchBooks(limit = 24): Promise<Book[]> {
  return searchBooks({
    type: "title",
    query: DEFAULT_SEARCH_QUERY,
    limit,
  });
}

export function getCoverUrl(coverId: number | null): string {
  return coverId ? `${COVERS_BASE_URL}/${coverId}-M.jpg` : FALLBACK_COVER_URL;
}
