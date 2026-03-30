import { useState, useRef } from 'react';
import Button from './Button';
import styles from './TopicBlock.module.css';

export default function TopicBlock({ subject, topic, onToggle, onAddSubtopic, onDeleteSubtopic, onDeleteTopic, onOpenNote }) {
  const [open, setOpen] = useState(false);
  const [newSub, setNewSub] = useState('');
  const inputRef = useRef(null);

  const doneSubs = topic.subtopics.filter(s => s.done).length;

  const handleAddSubtopic = () => {
    const name = newSub.trim();
    if (!name) return;
    onAddSubtopic(topic.id, name);
    setNewSub('');
    inputRef.current?.focus();
  };

  const handleToggle = () => {
    setOpen(o => !o);
  };

  return (
    <div className={`${styles.block} ${open ? styles.blockOpen : ''}`}>
      {/* Header */}
      <div className={styles.header} onClick={handleToggle}>
        <span className={`${styles.arrow} ${open ? styles.arrowOpen : ''}`}>▶</span>
        <span className={styles.title}>{topic.name}</span>
        <span className={styles.badge}>{doneSubs}/{topic.subtopics.length}</span>
        <div className={styles.actions} onClick={e => e.stopPropagation()}>
          <button
            className={styles.delTopicBtn}
            onClick={() => onDeleteTopic(topic.id)}
            title="Delete topic"
          >
            ✕ remove
          </button>
        </div>
      </div>

      {/* Subtopics panel */}
      {open && (
        <div className={styles.panel}>
          {topic.subtopics.length === 0 && (
            <div className={styles.emptyPanel}>No subtopics yet — add one below ↓</div>
          )}
          {topic.subtopics.map(st => (
            <div key={st.id} className={`${styles.subRow} ${st.done ? styles.subDone : ''}`}>
              {/* Checkbox */}
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  checked={st.done}
                  onChange={() => onToggle(topic.id, st.id)}
                  className={styles.checkInput}
                />
                <span className={styles.checkBox}>
                  {st.done && <span className={styles.checkMark}>✓</span>}
                </span>
              </label>

              {/* Name */}
              <span className={`${styles.subName} ${st.done ? styles.subNameDone : ''}`}>
                {st.name}
              </span>

              {/* Note button */}
              <button
                className={`${styles.noteBtn} ${st.note?.trim() ? styles.noteBtnActive : ''}`}
                onClick={() => onOpenNote(topic.id, st.id, topic.name, st.name, st.note)}
                title="Notes"
              >
                📝 {st.note?.trim() ? 'edit note' : 'note'}
              </button>

              {/* Delete subtopic */}
              <button
                className={styles.delSubBtn}
                onClick={() => onDeleteSubtopic(topic.id, st.id)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add subtopic input */}
          <div className={styles.addRow}>
            <input
              ref={inputRef}
              className={styles.addInput}
              value={newSub}
              onChange={e => setNewSub(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddSubtopic()}
              placeholder="+ add subtopic…"
              maxLength={80}
            />
            <Button size="sm" onClick={handleAddSubtopic}>Add</Button>
          </div>
        </div>
      )}
    </div>
  );
}
