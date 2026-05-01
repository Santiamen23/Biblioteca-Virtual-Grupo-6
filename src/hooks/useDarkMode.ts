"use client";

import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "theme";
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function useDarkMode(initialTheme: "light" | "dark" = "light") {
  const [isDark, setIsDark] = useState(initialTheme === "dark");

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.cookie = `theme=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; samesite=lax`;
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleDarkMode };
}
