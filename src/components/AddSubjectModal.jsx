import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import styles from './AddSubjectModal.module.css';

const EMOJIS = [
  '📚','💻','🧮','🗃️','🌐','🔬','⚙️','📊',
  '🎯','🧠','📡','🛡️','🔧','📐','🧪','🏗️',
  '🔐','🌍','🎲','📈','🧬','🤖','☁️','⚡',
];

export default function AddSubjectModal({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('📚');

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, emoji);
    setName('');
    setEmoji('📚');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Subject"
      subtitle="// name it and pick an emoji"
      footer={
        <>
          <Button variant="default" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleAdd} disabled={!name.trim()}>
            Add Subject
          </Button>
        </>
      }
    >
      {/* Emoji picker */}
      <div className={styles.emojiGrid}>
        {EMOJIS.map(e => (
          <button
            key={e}
            className={`${styles.emojiBtn} ${emoji === e ? styles.emojiSelected : ''}`}
            onClick={() => setEmoji(e)}
            type="button"
          >
            {e}
          </button>
        ))}
      </div>

      {/* Name input */}
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="e.g. Data Structures & Algorithms"
        maxLength={50}
        autoFocus
      />
      <div className={styles.preview}>
        Preview: <span>{emoji} {name || 'Subject Name'}</span>
      </div>
    </Modal>
  );
}
