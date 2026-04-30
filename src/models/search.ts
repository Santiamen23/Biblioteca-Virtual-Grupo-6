export type SearchType = "title" | "author" | "q";

export type Filters = {
  minYear: string;
  maxYear: string;
  language: string;
  author: string;
};

export type SearchBarProps = {
  searchType: SearchType;
  query: string;
  onTypeChange: (value: SearchType) => void;
  onQueryChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
};

export type FilterPanelProps = {
  filters: Filters;
  onChange: (field: keyof Filters, value: string) => void;
  onReset: () => void;
};
