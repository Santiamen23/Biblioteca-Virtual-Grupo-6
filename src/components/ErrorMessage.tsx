import type { ErrorMessageProps } from "@/models/ui";
import styles from "./ErrorMessage.module.scss";

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.errorBox}>
      <strong>Error:</strong> {message}
    </div>
  );
}
