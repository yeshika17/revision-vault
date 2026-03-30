import { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import styles from './NoteModal.module.css';

export default function NoteModal({ open, onClose, noteData, onSave }) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (open && noteData) setText(noteData.note || '');
  }, [open, noteData]);

  const handleSave = () => {
    onSave(noteData.subjectId, noteData.topicId, noteData.subtopicId, text);
    onClose();
  };

  const handleClear = () => {
    setText('');
    onSave(noteData.subjectId, noteData.topicId, noteData.subtopicId, '');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="📝 Notes"
      subtitle={noteData ? `// ${noteData.topicName} → ${noteData.subtopicName}` : ''}
      footer={
        <>
          <Button variant="danger" size="sm" onClick={handleClear}>Clear</Button>
          <Button variant="default" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSave}>Save Note</Button>
        </>
      }
    >
      <textarea
        className={styles.textarea}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={`Type your quick revision notes here...\n\n→ key concepts\n→ tricky edge cases\n→ formulas / pseudocode\n→ things to remember`}
        autoFocus
      />
      <div className={styles.hint}>
        {text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Empty note'}
      </div>
    </Modal>
  );
}
