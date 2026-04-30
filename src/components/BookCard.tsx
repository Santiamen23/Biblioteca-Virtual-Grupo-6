import type { Book } from "../models/Books";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
};

const getCoverUrl = (coverId: number | null) =>
    coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://placehold.co/280x420/e5e7eb/6b7280?text=No+img";

export default function BookCard({ book }: BookCardProps) {
    return (
        <article className="{styles.card}">
            <img
                src={getCoverUrl(book.coverId)}
                alt={book.title}
                className={styles.cover}
            />

            <div className="styles.body">
                <h3 className={styles.title}>{book.title}</h3>
                <p className={styles.author}>
                    {book.authors.length > 0 
                    ? book.authors.join(", ") 
                    : "Autor no disponible"}
                </p>
                <div className={styles.meta}>
                    <span>Año: {book.firstPublishYear || "No disponible"}</span>
                    <span>Ediciones: {book.editionCount}</span>
                </div>
                <div className={styles.actions}>
                    <button type="button" className={styles.detailButton}>
                        Ver detalles
                    </button>
                    <button type="button" className={styles.favoriteButton}>
                        Agregar
                    </button>                    
                </div>
            </div>
       </article>    
    );
}
