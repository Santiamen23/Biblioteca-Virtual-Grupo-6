import type { Book, BookDetail } from "@/models/book";
import { getBookWorkId } from "@/models/book";
import type {
  OpenLibraryDoc,
  OpenLibraryResponse,
  OpenLibraryWorkResponse,
  SearchBooksParams,
} from "@/models/open-library";

const BASE_URL = "https://openlibrary.org/search.json";
const COVERS_BASE_URL = "https://covers.openlibrary.org/b/id";
const DEFAULT_HOME_QUERY = "programming languages";
const DEFAULT_SEARCH_QUERY = "library";
const FALLBACK_COVER_URL =
  "https://placehold.co/280x420/e5e7eb/6b7280?text=No+img";
const SEARCH_RESULTS_LIMIT = 200;

const normalizeBooks = (docs: OpenLibraryDoc[] = []): Book[] =>
  docs.map((book, index) => ({
    id:
      (book.key ? getBookWorkId(book.key) : undefined) ||
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

async function getAuthorName(authorKey: string): Promise<string | null> {
  const response = await fetch(`https://openlibrary.org${authorKey}.json`);

  if (!response.ok) {
    return null;
  }

  const data: { name?: string } = await response.json();
  return data.name || null;
}

export async function getBookDetail(workId: string): Promise<BookDetail> {
  const normalizedWorkId = getBookWorkId(workId);
  const response = await fetch(
    `https://openlibrary.org/works/${normalizedWorkId}.json`,
  );

  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle del libro.");
  }

  const data: OpenLibraryWorkResponse = await response.json();
  const authorKeys = data.authors?.map((entry) => entry.author.key) || [];
  const authorNames = await Promise.all(authorKeys.map(getAuthorName));

  return {
    id: normalizedWorkId,
    title: data.title || "Sin título",
    authors: authorNames.filter((author): author is string => Boolean(author)),
    description:
      typeof data.description === "string"
        ? data.description
        : data.description?.value || "",
    firstPublishDate: data.first_publish_date || null,
    subjects: data.subjects?.slice(0, 8) || [],
    coverId: data.covers?.[0] || null,
  };
}

export async function searchBooks({
  type = "q",
  query = "",
  limit = SEARCH_RESULTS_LIMIT,
}: SearchBooksParams = {}): Promise<Book[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const params = new URLSearchParams();

  if (type === "title") {
    params.set("title", trimmedQuery);
  } else if (type === "author") {
    params.set("author", trimmedQuery);
  } else {
    params.set("q", trimmedQuery);
  }

  params.set("limit", String(limit));

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

export async function getInitialSearchBooks(): Promise<Book[]> {
  return searchBooks({
    type: "title",
    query: DEFAULT_SEARCH_QUERY,
  });
}

export function getCoverUrl(coverId: number | null): string {
  return coverId ? `${COVERS_BASE_URL}/${coverId}-M.jpg` : FALLBACK_COVER_URL;
}
