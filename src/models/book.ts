export type Book = {
  id: string;
  title: string;
  authors: string[];
  firstPublishYear: number | null;
  languages: string[];
  languageNames: string[];
  coverId: number | null;
  editionCount: number;
  publisher: string;
};

export type BookCardProps = {
  book: Book;
};

export type BookDetail = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  firstPublishDate: string | null;
  subjects: string[];
  coverId: number | null;
};

export function getBookWorkId(id: string): string {
  return id.replace(/^\/works\//, "").trim();
}
