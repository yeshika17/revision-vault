import styles from './Toast.module.css';

export default function Toast({ visible, message }) {
  return (
    <div className={`${styles.toast} ${visible ? styles.show : ''}`}>
      <span className={styles.dot} />
      {message}
    </div>
  );
}
