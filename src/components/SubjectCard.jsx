import { calcProgress } from '../utils/helpers';
import styles from './SubjectCard.module.css';

export default function SubjectCard({ subject, onClick, onDelete }) {
  const { done, total, pct } = calcProgress(subject);

  return (
    <div className={styles.card} onClick={onClick}>
      <button
        className={styles.deleteBtn}
        onClick={(e) => { e.stopPropagation(); onDelete(); }}
        aria-label="Delete subject"
      >
        ✕
      </button>

      <div className={styles.emoji}>{subject.emoji}</div>
      <div className={styles.name}>{subject.name}</div>
      <div className={styles.meta}>
        {subject.topics.length} topic{subject.topics.length !== 1 ? 's' : ''} · {total} subtopic{total !== 1 ? 's' : ''}
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressLabel}>
          {done}/{total} done &nbsp;·&nbsp; {pct}%
        </div>
      </div>
    </div>
  );
}
