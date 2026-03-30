import { useState, useRef } from 'react';
import Button from './Button';
import styles from './TopicBlock.module.css';

export default function TopicBlock({
  subject,
  topic,
  onToggleTopic,
  onToggle,
  onAddSubtopic,
  onDeleteSubtopic,
  onDeleteTopic,
  onOpenNote,
}) {
  const [open, setOpen] = useState(false);
  const [newSub, setNewSub] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const inputRef = useRef(null);

  const doneSubs = topic.subtopics.filter(s => s.done).length;
  const totalSubs = topic.subtopics.length;

  const handleAddSubtopic = () => {
    const name = newSub.trim();
    if (!name) return;
    onAddSubtopic(topic.id, name);
    setNewSub('');
    inputRef.current?.focus();
  };

  const handleShowAdd = (e) => {
    e.stopPropagation();
    setOpen(true);
    setShowAddInput(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className={`${styles.block} ${open ? styles.blockOpen : ''} ${topic.done ? styles.blockDone : ''}`}>

      {/* Topic Header */}
      <div className={styles.header}>

        <span
          className={`${styles.arrow} ${open ? styles.arrowOpen : ''} ${totalSubs === 0 ? styles.arrowHidden : ''}`}
          onClick={() => totalSubs > 0 && setOpen(o => !o)}
        >▶</span>

        <span
          className={`${styles.title} ${topic.done ? styles.titleDone : ''}`}
          onClick={() => totalSubs > 0 && setOpen(o => !o)}
        >
          {topic.name}
        </span>

        {totalSubs > 0 && (
          <span className={styles.badge}>{doneSubs}/{totalSubs}</span>
        )}

        <div className={styles.actions}>
          <button className={styles.addSubBtn} onClick={handleShowAdd}>+ sub</button>
          <button className={styles.delTopicBtn} onClick={() => onDeleteTopic(topic.id)}>✕</button>
        </div>

        {/* Topic checkpoint — RIGHT */}
        <label className={styles.topicCheckLabel} onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={!!topic.done}
            onChange={() => onToggleTopic(topic.id)}
            className={styles.checkInput}
          />
          <span className={styles.topicCheckBox}>
            {topic.done && <span className={styles.checkMark}>✓</span>}
          </span>
        </label>
      </div>

      {/* Subtopics Panel */}
      {open && (
        <div className={styles.panel}>
          {topic.subtopics.map(st => (
            <div key={st.id} className={`${styles.subRow} ${st.done ? styles.subDone : ''}`}>

              <span className={`${styles.subName} ${st.done ? styles.subNameDone : ''}`}>
                {st.name}
              </span>

              <button
                className={`${styles.noteBtn} ${st.note?.trim() ? styles.noteBtnActive : ''}`}
                onClick={() => onOpenNote(topic.id, st.id, topic.name, st.name, st.note)}
              >
                📝 {st.note?.trim() ? 'edit' : 'note'}
              </button>

              <button className={styles.delSubBtn} onClick={() => onDeleteSubtopic(topic.id, st.id)}>✕</button>

              {/* Subtopic checkpoint — RIGHT */}
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
            </div>
          ))}

          {showAddInput && (
            <div className={styles.addRow}>
              <input
                ref={inputRef}
                className={styles.addInput}
                value={newSub}
                onChange={e => setNewSub(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleAddSubtopic();
                  if (e.key === 'Escape') { setShowAddInput(false); setNewSub(''); }
                }}
                placeholder="Subtopic name… (Enter to add, Esc to cancel)"
                maxLength={80}
              />
              <Button size="sm" onClick={handleAddSubtopic}>Add</Button>
              <Button size="sm" onClick={() => { setShowAddInput(false); setNewSub(''); }}>✕</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}