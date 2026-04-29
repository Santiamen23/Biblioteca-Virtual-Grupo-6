import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cover} />
          <div className={styles.body}>
            <div className={styles.lineLarge} />
            <div className={styles.lineMedium} />
            <div className={styles.lineSmall} />
          </div>
        </div>
      ))}
    </div>
  );
}