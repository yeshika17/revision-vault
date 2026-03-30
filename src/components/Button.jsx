import styles from './Button.module.css';

export default function Button({ children, variant = 'default', size = 'md', onClick, type = 'button', disabled, className = '' }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
