"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Biblioteca Inteligente
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
          >
            Inicio
          </Link>

          <Link
            href="/buscar"
            className={`${styles.link} ${
              isActive("/buscar") ? styles.active : ""
            }`}
          >
            Buscar
          </Link>

          <Link
            href="/favoritos"
            className={`${styles.link} ${
              isActive("/favoritos") ? styles.active : ""
            }`}
          >
            Favoritos
          </Link>

          <Link
            href="/acerca"
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