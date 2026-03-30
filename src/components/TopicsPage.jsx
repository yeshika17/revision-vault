import { calcProgress } from '../utils/helpers';
import TopicBlock from './TopicBlock';
import Button from './Button';
import styles from './TopicsPage.module.css';

export default function TopicsPage({
  subject,
  onBack,
  onAddTopic,
  onDeleteTopic,
  onAddSubtopic,
  onDeleteSubtopic,
  onToggleTopic,
  onToggleSubtopic,
  onOpenNote,
  onReset,
}) {
  const { done, total, pct } = calcProgress(subject);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.emojiWrap}>{subject.emoji}</div>
        <div className={styles.headerText}>
          <div className={styles.tag}>// {subject.topics.length} topics</div>
          <h1 className={styles.title}>{subject.name}</h1>
          <div className={styles.progressArea}>
            <div className={styles.barWrap}>
              <div className={styles.barFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.progressLabel}>
              {done}/{total} subtopics · {pct}% complete
            </span>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <Button variant="primary" onClick={onAddTopic}>+ Add Topic</Button>
        <Button variant="danger" onClick={onReset}>↺ Reset Checkpoints</Button>
        <Button variant="default" onClick={onBack}>← Back</Button>
      </div>

      {subject.topics.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🗂️</div>
          <p className={styles.emptyText}>No topics yet — add your first one above</p>
        </div>
      ) : (
        <div className={styles.topicsList}>
          {subject.topics.map(topic => (
            <TopicBlock
              key={topic.id}
              subject={subject}
              topic={topic}
              onToggleTopic={(topicId) => onToggleTopic(subject.id, topicId)}
              onToggle={(topicId, stId) => onToggleSubtopic(subject.id, topicId, stId)}
              onAddSubtopic={(topicId, name) => onAddSubtopic(subject.id, topicId, name)}
              onDeleteSubtopic={(topicId, stId) => onDeleteSubtopic(subject.id, topicId, stId)}
              onDeleteTopic={(topicId) => onDeleteTopic(subject.id, topicId)}
              onOpenNote={(topicId, stId, topicName, subName, note) =>
                onOpenNote(subject.id, topicId, stId, topicName, subName, note)
              }
            />
          ))}
        </div>
      )}

      <div className={styles.glowA} />
    </div>
  );
}