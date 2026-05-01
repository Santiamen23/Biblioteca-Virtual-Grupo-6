"use client";

import { useState, useEffect } from "react";

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      applyDarkMode(true);
    }
  }, []);

  const applyDarkMode = (dark: boolean) => {
    const bg = dark ? "#0a0a0a" : "#ffffff";
    const fg = dark ? "#ededed" : "#171717";

    document.documentElement.style.setProperty("--background", bg);
    document.documentElement.style.setProperty("--foreground", fg);

    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.body.style.backgroundColor = bg;
    document.body.style.color = fg;

    document.querySelectorAll("main, section, div.bg-white, [class*='bg-white']").forEach((el) => {
      (el as HTMLElement).style.backgroundColor = dark ? "#0a0a0a" : "";
      (el as HTMLElement).style.color = dark ? "#ededed" : "";
    });
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const next = !prev;
      applyDarkMode(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return { isDark, toggleDarkMode };
}