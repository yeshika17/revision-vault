import { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from './Button';
import styles from './AddTopicModal.module.css';

export default function AddTopicModal({ open, onClose, subjectName, onAdd }) {
  const [name, setName] = useState('');

  useEffect(() => { if (open) setName(''); }, [open]);

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Topic"
      subtitle={`// adding to ${subjectName}`}
      footer={
        <>
          <Button variant="default" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleAdd} disabled={!name.trim()}>
            Add Topic
          </Button>
        </>
      }
    >
      <input
        className={styles.input}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="e.g. Sorting Algorithms"
        maxLength={80}
        autoFocus
      />
    </Modal>
  );
}
