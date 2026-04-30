import type { SearchType } from "@/models/search";

export type OpenLibraryDoc = {
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

export type OpenLibraryResponse = {
  docs?: OpenLibraryDoc[];
};

export type SearchBooksParams = {
  type?: SearchType;
  query?: string;
  limit?: number;
};
