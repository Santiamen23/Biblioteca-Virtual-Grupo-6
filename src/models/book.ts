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
