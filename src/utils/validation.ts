import type { FilterValidationErrors, Filters } from "@/models/search";

const CURRENT_YEAR = new Date().getFullYear();

function validateYearValue(value: string, label: string): string | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const year = Number(value);

  if (!Number.isInteger(year)) {
    return `${label} debe ser un número entero.`;
  }

  if (year < 0) {
    return `${label} no puede ser negativo.`;
  }

  if (year > CURRENT_YEAR) {
    return `${label} no puede ser mayor a ${CURRENT_YEAR}.`;
  }

  return undefined;
}

export function validateSearchQuery(query: string): string | undefined {
  if (!query.trim()) {
    return "Ingresa un término de búsqueda.";
  }

  return undefined;
}

export function validateSearchFilters(
  filters: Filters,
): FilterValidationErrors {
  const errors: FilterValidationErrors = {};
  const minYearError = validateYearValue(filters.minYear, "El año mínimo");
  const maxYearError = validateYearValue(filters.maxYear, "El año máximo");

  if (minYearError) {
    errors.minYear = minYearError;
  }

  if (maxYearError) {
    errors.maxYear = maxYearError;
  }

  if (errors.minYear || errors.maxYear) {
    return errors;
  }

  if (filters.minYear && filters.maxYear) {
    const minYear = Number(filters.minYear);
    const maxYear = Number(filters.maxYear);

    if (minYear > maxYear) {
      const message = "El año mínimo no puede ser mayor que el año máximo.";
      errors.minYear = message;
      errors.maxYear = message;
    }
  }

  return errors;
}
