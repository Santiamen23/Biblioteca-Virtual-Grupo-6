import {
  LANGUAGE_OPTIONS,
  type FilterPanelProps,
} from "../models/search";
import styles from "./FilterPanel.module.css";

export default function FilterPanel({
  filters,
  onChange,
  onReset,
}: FilterPanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filtros locales</h2>
        <button type="button" onClick={onReset} className={styles.resetButton}>
          Limpiar
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="minYear" className={styles.label}>
            Año mínimo
          </label>
          <input
            id="minYear"
            type="number"
            value={filters.minYear}
            onChange={(event) => onChange("minYear", event.target.value)}
            className={styles.input}
            placeholder="1900"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="maxYear" className={styles.label}>
            Año máximo
          </label>
          <input
            id="maxYear"
            type="number"
            value={filters.maxYear}
            onChange={(event) => onChange("maxYear", event.target.value)}
            className={styles.input}
            placeholder="2024"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="language" className={styles.label}>
            Idioma
          </label>
          <select
            id="language"
            value={filters.language}
            onChange={(event) => onChange("language", event.target.value)}
            className={styles.input}
          >
            <option value="">Todos los idiomas</option>
            {LANGUAGE_OPTIONS.map((language) => (
              <option key={language.code} value={language.code}>
               {language.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="authorFilter" className={styles.label}>
            Autor
          </label>
          <input
            id="authorFilter"
            type="text"
            value={filters.author}
            onChange={(event) => onChange("author", event.target.value)}
            className={styles.input}
            placeholder="Cervantes"
          />
        </div>
      </div>
    </section>
  );
}
