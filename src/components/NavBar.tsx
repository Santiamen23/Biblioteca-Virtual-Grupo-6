"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          Biblioteca Inteligente
        </Link>

        {/* Links */}
        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
          >
            Inicio
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