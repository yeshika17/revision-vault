import { useState, useCallback } from 'react';
import { useStore } from './hooks/useStore';
import { useToast } from './hooks/useToast';

import Navbar from './components/Navbar';
import SubjectsPage from './components/SubjectsPage';
import TopicsPage from './components/TopicsPage';
import AddSubjectModal from './components/AddSubjectModal';
import AddTopicModal from './components/AddTopicModal';
import NoteModal from './components/NoteModal';
import Toast from './components/Toast';

export default function App() {
  const store = useStore();
  const { toast, showToast } = useToast();

  // ── Navigation ──
  const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const currentSubject = store.subjects.find(s => s.id === currentSubjectId) ?? null;

  // ── Modals ──
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [topicModalOpen, setTopicModalOpen] = useState(false);
  const [noteModal, setNoteModal] = useState({ open: false, data: null });

  // ── Handlers: Subjects ──
  const handleToggleTopic = useCallback((subjectId, topicId) => {
    store.toggleTopic(subjectId, topicId);
  }, [store]);

  // ── Handlers: Subtopics ──
  const handleAddSubject = useCallback((name, emoji) => {
    store.addSubject(name, emoji);
    showToast(`"${name}" added ✓`);
  }, [store, showToast]);

  const handleDeleteSubject = useCallback((id) => {
    const subj = store.subjects.find(s => s.id === id);
    if (!confirm(`Delete "${subj?.name}" and all its data?`)) return;
    store.deleteSubject(id);
    showToast('Subject deleted');
  }, [store, showToast]);

  // ── Handlers: Topics ──
  const handleAddTopic = useCallback((name) => {
    store.addTopic(currentSubjectId, name);
    showToast(`Topic "${name}" added ✓`);
  }, [store, currentSubjectId, showToast]);

  const handleDeleteTopic = useCallback((subjectId, topicId) => {
    if (!confirm('Delete this topic and all its subtopics?')) return;
    store.deleteTopic(subjectId, topicId);
    showToast('Topic deleted');
  }, [store, showToast]);

  // ── Handlers: Subtopics ──
  const handleAddSubtopic = useCallback((subjectId, topicId, name) => {
    store.addSubtopic(subjectId, topicId, name);
    showToast('Subtopic added ✓');
  }, [store, showToast]);

  const handleDeleteSubtopic = useCallback((subjectId, topicId, stId) => {
    store.deleteSubtopic(subjectId, topicId, stId);
    showToast('Subtopic removed');
  }, [store, showToast]);

  const handleToggle = useCallback((subjectId, topicId, stId) => {
    store.toggleSubtopic(subjectId, topicId, stId);
  }, [store]);

  // ── Handlers: Notes ──
  const handleOpenNote = useCallback((subjectId, topicId, subtopicId, topicName, subtopicName, note) => {
    setNoteModal({
      open: true,
      data: { subjectId, topicId, subtopicId, topicName, subtopicName, note },
    });
  }, []);

  const handleSaveNote = useCallback((subjectId, topicId, subtopicId, note) => {
    store.saveNote(subjectId, topicId, subtopicId, note);
    showToast(note.trim() ? 'Note saved ✓' : 'Note cleared');
  }, [store, showToast]);

  // ── Handlers: Reset ──
  const handleReset = useCallback(() => {
    if (!confirm('Reset ALL checkpoints for this subject?')) return;
    store.resetCheckpoints(currentSubjectId);
    showToast('All checkpoints reset ↺');
  }, [store, currentSubjectId, showToast]);

  return (
    <>
      <Navbar
        currentSubject={currentSubject}
        onHome={() => setCurrentSubjectId(null)}
      />

      {currentSubject ? (
        <TopicsPage
          subject={currentSubject}
          onBack={() => setCurrentSubjectId(null)}
          onAddTopic={() => setTopicModalOpen(true)}
          onDeleteTopic={handleDeleteTopic}
          onAddSubtopic={handleAddSubtopic}
          onDeleteSubtopic={handleDeleteSubtopic}
          onToggleTopic={handleToggleTopic}
          onToggleSubtopic={handleToggle}
          onOpenNote={handleOpenNote}
          onReset={handleReset}
        />
      ) : (
        <SubjectsPage
          subjects={store.subjects}
          onSelect={setCurrentSubjectId}
          onDelete={handleDeleteSubject}
          onAdd={() => setSubjectModalOpen(true)}
        />
      )}

      {/* Modals */}
      <AddSubjectModal
        open={subjectModalOpen}
        onClose={() => setSubjectModalOpen(false)}
        onAdd={handleAddSubject}
      />

      <AddTopicModal
        open={topicModalOpen}
        onClose={() => setTopicModalOpen(false)}
        subjectName={currentSubject?.name ?? ''}
        onAdd={handleAddTopic}
      />

      <NoteModal
        open={noteModal.open}
        onClose={() => setNoteModal({ open: false, data: null })}
        noteData={noteModal.data}
        onSave={handleSaveNote}
      />

      <Toast visible={toast.visible} message={toast.message} />
    </>
  );
}
