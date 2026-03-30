import SubjectCard from './SubjectCard';
import styles from './SubjectsPage.module.css';

export default function SubjectsPage({ subjects, onSelect, onDelete, onAdd }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.tag}>// revision workspace</div>
        <h1 className={styles.title}>Your Subjects</h1>
        <p className={styles.sub}>
          {subjects.length === 0
            ? 'Start by adding your first subject below'
            : `${subjects.length} subject${subjects.length !== 1 ? 's' : ''} · click to open`}
        </p>
      </div>

      <div className={styles.grid}>
        {subjects.map(s => (
          <SubjectCard
            key={s.id}
            subject={s}
            onClick={() => onSelect(s.id)}
            onDelete={() => onDelete(s.id)}
          />
        ))}

        {/* Add card */}
        <button className={styles.addCard} onClick={onAdd}>
          <span className={styles.addIcon}>+</span>
          <span className={styles.addLabel}>Add Subject</span>
        </button>
      </div>

      {/* Ambient bg glow */}
      <div className={styles.glowA} />
      <div className={styles.glowB} />
    </div>
  );
}
