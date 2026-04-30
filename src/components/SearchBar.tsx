import type { SearchBarProps } from "@/models/search";
import styles from "./SearchBar.module.css";

export default function SearchBar({
                                      searchType,
                                      query,
                                      onTypeChange,
                                      onQueryChange,
                                      onSubmit,
                                      disabled,
                                  }: SearchBarProps) {
    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.fieldGroup}>
                <label htmlFor="searchType" className={styles.label}>
                    Buscar por
                </label>
                <select
                    id="searchType"
                    value={searchType}
                    onChange={(event) => onTypeChange(event.target.value as SearchBarProps["searchType"])}
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
                    className={styles.input}
                    disabled={disabled}
                />
            </div>

            <button type="submit" className={styles.button} disabled={disabled}>
                {disabled ? "Buscando..." : "Buscar"}
            </button>
        </form>
    );
}
