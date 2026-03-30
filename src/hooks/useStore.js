import { useState, useEffect, useCallback } from 'react';
import { uid, loadState, saveState, createSeedData } from '../utils/helpers';

export function useStore() {
  const [subjects, setSubjects] = useState(() => {
    const saved = loadState();
    if (saved && saved.subjects && saved.subjects.length) return saved.subjects;
    return createSeedData();
  });

  // Auto-save on every change
  useEffect(() => {
    saveState({ subjects });
  }, [subjects]);

  // ── Subject Actions ──
  const addSubject = useCallback((name, emoji) => {
    setSubjects(prev => [
      ...prev,
      { id: uid(), name, emoji, topics: [] },
    ]);
  }, []);

  const deleteSubject = useCallback((subjectId) => {
    setSubjects(prev => prev.filter(s => s.id !== subjectId));
  }, []);

  // ── Topic Actions ──
  const addTopic = useCallback((subjectId, name) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, topics: [...s.topics, { id: uid(), name, subtopics: [] }] }
          : s
      )
    );
  }, []);

  const deleteTopic = useCallback((subjectId, topicId) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, topics: s.topics.filter(t => t.id !== topicId) }
          : s
      )
    );
  }, []);

  // ── Subtopic Actions ──
  const addSubtopic = useCallback((subjectId, topicId, name) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map(t =>
                t.id === topicId
                  ? { ...t, subtopics: [...t.subtopics, { id: uid(), name, done: false, note: '' }] }
                  : t
              ),
            }
          : s
      )
    );
  }, []);

  const deleteSubtopic = useCallback((subjectId, topicId, subtopicId) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map(t =>
                t.id === topicId
                  ? { ...t, subtopics: t.subtopics.filter(st => st.id !== subtopicId) }
                  : t
              ),
            }
          : s
      )
    );
  }, []);

  const toggleSubtopic = useCallback((subjectId, topicId, subtopicId) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map(t =>
                t.id === topicId
                  ? {
                      ...t,
                      subtopics: t.subtopics.map(st =>
                        st.id === subtopicId ? { ...st, done: !st.done } : st
                      ),
                    }
                  : t
              ),
            }
          : s
      )
    );
  }, []);

  const saveNote = useCallback((subjectId, topicId, subtopicId, note) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map(t =>
                t.id === topicId
                  ? {
                      ...t,
                      subtopics: t.subtopics.map(st =>
                        st.id === subtopicId ? { ...st, note } : st
                      ),
                    }
                  : t
              ),
            }
          : s
      )
    );
  }, []);

  const resetCheckpoints = useCallback((subjectId) => {
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: s.topics.map(t => ({
                ...t,
                subtopics: t.subtopics.map(st => ({ ...st, done: false })),
              })),
            }
          : s
      )
    );
  }, []);

  return {
    subjects,
    addSubject,
    deleteSubject,
    addTopic,
    deleteTopic,
    addSubtopic,
    deleteSubtopic,
    toggleSubtopic,
    saveNote,
    resetCheckpoints,
  };
}
