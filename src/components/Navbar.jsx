import styles from './Navbar.module.css';

export default function Navbar({ currentSubject, onHome }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={onHome}>RevisionVault</div>
      <div className={styles.breadcrumb}>
        {currentSubject ? (
          <>
            <span className={styles.crumbLink} onClick={onHome}>Home</span>
            <span className={styles.sep}>›</span>
            <span className={styles.crumbCurrent}>
              {currentSubject.emoji} {currentSubject.name}
            </span>
          </>
        ) : (
          <span className={styles.crumbHint}>// your revision workspace</span>
        )}
      </div>
    </nav>
  );
}
