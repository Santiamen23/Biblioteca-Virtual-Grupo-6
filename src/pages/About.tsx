import styles from "./About.module.css";

export default function About() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.card}>
          <span className={styles.badge}>Biblioteca Inteligente</span>

          <h1 className={styles.title}>Acerca del proyecto</h1>

          <p className={styles.description}>
            Biblioteca Inteligente es una aplicación web desarrollada con React y
            Next.js que permite buscar libros utilizando la API pública de Open
            Library. El objetivo del proyecto es facilitar la exploración de
            libros, consulta de información básica y organización de favoritos.
          </p>
        </section>

        <section className={styles.card}>
          <h2 className={styles.subtitle}>Funcionalidades principales</h2>

          <ul className={styles.list}>
            <li>Búsqueda de libros por título, autor o palabra clave.</li>
            <li>Visualización de portada, título, autor, año y ediciones.</li>
            <li>Filtros locales para refinar los resultados.</li>
            <li>Gestión de favoritos usando almacenamiento local.</li>
          </ul>
        </section>

        <section className={styles.card}>
          <h2 className={styles.subtitle}>Tecnologías utilizadas</h2>

          <div className={styles.tags}>
            <span>React</span>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>Open Library API</span>
            <span>localStorage</span>
          </div>
        </section>
      </div>
    </main>
  );
}