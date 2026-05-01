"use client";

import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "theme";

function getStoredTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme: "light" | "dark") {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.dataset.theme === "dark";
    }

    return getStoredTheme() === "dark";
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleDarkMode };
}
