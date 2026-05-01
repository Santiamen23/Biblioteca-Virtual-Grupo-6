import type { SearchBarProps } from "@/models/search";
import styles from "./SearchBar.module.scss";

export default function SearchBar({
  searchType,
  query,
  onTypeChange,
  onQueryChange,
  onSubmit,
  disabled,
  queryError,
}: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <div className={styles.fieldGroup}>
        <label htmlFor="searchType" className={styles.label}>
          Buscar por
        </label>
        <select
          id="searchType"
          value={searchType}
          onChange={(event) =>
            onTypeChange(event.target.value as SearchBarProps["searchType"])
          }
          className={styles.select}
          disabled={disabled}
        >
          <option value="title">Título</option>
          <option value="author">Autor</option>
          <option value="q">Palabra clave</option>
        </select>
      </div>

      <div className={`${styles.fieldGroup} ${styles.inputGroup}`}>
        <label htmlFor="searchQuery" className={styles.label}>
          Término de búsqueda
        </label>
        <input
          id="searchQuery"
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Ejemplo: Don Quijote"
          className={`${styles.input} ${queryError ? styles.inputError : ""}`}
          disabled={disabled}
          aria-invalid={Boolean(queryError)}
          aria-describedby={queryError ? "searchQuery-error" : undefined}
        />
        {queryError && (
          <p id="searchQuery-error" className={styles.errorText}>
            {queryError}
          </p>
        )}
      </div>

      <button type="submit" className={styles.button} disabled={disabled}>
        {disabled ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
