export type SearchType = "title" | "author" | "q";

export type LanguageOption = {
  code: string;
  label: string;
};

export type Filters = {
  minYear: string;
  maxYear: string;
  language: string;
  author: string;
};

export type FilterValidationErrors = Partial<
  Record<"minYear" | "maxYear", string>
>;

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "afr", label: "Afrikáans" },
  { code: "alb", label: "Albanés" },
  { code: "ara", label: "Árabe" },
  { code: "arm", label: "Armenio" },
  { code: "ben", label: "Bengalí" },
  { code: "bos", label: "Bosnio" },
  { code: "bul", label: "Búlgaro" },
  { code: "cat", label: "Catalán" },
  { code: "chi", label: "Chino" },
  { code: "cze", label: "Checo" },
  { code: "dan", label: "Danés" },
  { code: "dut", label: "Holandés" },
  { code: "eng", label: "Inglés" },
  { code: "est", label: "Estonio" },
  { code: "fin", label: "Finlandés" },
  { code: "fre", label: "Francés" },
  { code: "geo", label: "Georgiano" },
  { code: "ger", label: "Alemán" },
  { code: "gla", label: "Gaélico escocés" },
  { code: "gle", label: "Irlandés" },
  { code: "glg", label: "Gallego" },
  { code: "grc", label: "Griego antiguo" },
  { code: "gre", label: "Griego" },
  { code: "heb", label: "Hebreo" },
  { code: "hin", label: "Hindi" },
  { code: "hrv", label: "Croata" },
  { code: "hun", label: "Húngaro" },
  { code: "ice", label: "Islandés" },
  { code: "ita", label: "Italiano" },
  { code: "jpn", label: "Japonés" },
  { code: "kal", label: "Groenlandés" },
  { code: "kor", label: "Coreano" },
  { code: "lat", label: "Latín" },
  { code: "lav", label: "Letón" },
  { code: "lit", label: "Lituano" },
  { code: "ltz", label: "Luxemburgués" },
  { code: "mar", label: "Maratí" },
  { code: "nep", label: "Nepalí" },
  { code: "nob", label: "Noruego Bokmål" },
  { code: "nor", label: "Noruego" },
  { code: "per", label: "Persa" },
  { code: "pol", label: "Polaco" },
  { code: "por", label: "Portugués" },
  { code: "rum", label: "Rumano" },
  { code: "rus", label: "Ruso" },
  { code: "spa", label: "Español" },
  { code: "srp", label: "Serbio" },
  { code: "swe", label: "Sueco" },
  { code: "tha", label: "Tailandés" },
  { code: "tib", label: "Tibetano" },
  { code: "tur", label: "Turco" },
  { code: "ukr", label: "Ucraniano" },
  { code: "und", label: "Indeterminado / Desconocido" },
  { code: "urd", label: "Urdu" },
  { code: "vie", label: "Vietnamita" },
  { code: "wel", label: "Galés" },
  { code: "yid", label: "Yidis" },
];

export type SearchBarProps = {
  searchType: SearchType;
  query: string;
  onTypeChange: (value: SearchType) => void;
  onQueryChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
  queryError?: string;
};

export type FilterPanelProps = {
  filters: Filters;
  onChange: (field: keyof Filters, value: string) => void;
  onReset: () => void;
  errors?: FilterValidationErrors;
};
