"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookDetailCard from "@/components/BookDetailCard";
import ErrorMessage from "@/components/ErrorMessage";
import type { BookDetail as BookDetailModel } from "@/models/book";
import { getBookWorkId } from "@/models/book";
import { getBookDetail } from "@/services/openLibraryService";
import styles from "./BookDetail.module.scss";

export default function BookDetail() {
  const params = useParams<{ workId: string }>();
  const workId = getBookWorkId(params?.workId || "");
  const router = useRouter();
  const [book, setBook] = useState<BookDetailModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError(null);
        const data = await getBookDetail(workId);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [workId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <ErrorMessage message={error} />
        <button onClick={() => router.back()} className={styles.backBtn}>
          Volver
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.errorState}>
        <ErrorMessage message="Libro no encontrado" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => router.back()} className={styles.backBtn}>
        ← Volver
      </button>

      <BookDetailCard book={book} />
    </div>
  );
}
