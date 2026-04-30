"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./NavBar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          Biblioteca Inteligente
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen((current) => !current)}
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${open ? styles.open : ""}`}>
          <Link
            href="/"
            onClick={closeMenu}
            className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
          >
            Inicio
          </Link>

          <Link
            href="/buscar"
            onClick={closeMenu}
            className={`${styles.link} ${
              isActive("/buscar") ? styles.active : ""
            }`}
          >
            Buscar
          </Link>

          <Link
            href="/favoritos"
            onClick={closeMenu}
            className={`${styles.link} ${
              isActive("/favoritos") ? styles.active : ""
            }`}
          >
            Favoritos
          </Link>

          <Link
            href="/acerca"
            onClick={closeMenu}
            className={`${styles.link} ${
              isActive("/acerca") ? styles.active : ""
            }`}
          >
            Acerca
          </Link>
        </nav>
      </div>
    </header>
  );
}