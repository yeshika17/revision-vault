// ── ID Generator ──
export const uid = () => Math.random().toString(36).slice(2, 9);

// ── LocalStorage helpers ──
const STORAGE_KEY = 'revvault_v1';

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

// ── Progress calculator ──
export function calcProgress(subject) {
  let done = 0, total = 0;
  subject.topics.forEach(t =>
    t.subtopics.forEach(st => { total++; if (st.done) done++; })
  );
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// ── Seed data ──
export function createSeedData() {
  return [
    {
      id: uid(),
      name: 'Data Structures & Algorithms',
      emoji: '🧮',
      topics: [
        {
          id: uid(),
          name: 'Arrays & Strings',
          subtopics: [
            { id: uid(), name: 'Two Pointer Technique', done: false, note: '' },
            { id: uid(), name: 'Sliding Window Pattern', done: false, note: '' },
            { id: uid(), name: 'Prefix Sum Array', done: false, note: '' },
          ],
        },
        {
          id: uid(),
          name: 'Sorting Algorithms',
          subtopics: [
            { id: uid(), name: 'Merge Sort — O(n log n)', done: false, note: '' },
            { id: uid(), name: 'Quick Sort — avg O(n log n)', done: false, note: '' },
            { id: uid(), name: 'Heap Sort', done: false, note: '' },
          ],
        },
        {
          id: uid(),
          name: 'Dynamic Programming',
          subtopics: [
            { id: uid(), name: 'Memoization vs Tabulation', done: false, note: '' },
            { id: uid(), name: 'Knapsack Problem', done: false, note: '' },
            { id: uid(), name: 'Longest Common Subsequence', done: false, note: '' },
          ],
        },
      ],
    },
    {
      id: uid(),
      name: 'Operating Systems',
      emoji: '⚙️',
      topics: [
        {
          id: uid(),
          name: 'Process Management',
          subtopics: [
            { id: uid(), name: 'Process vs Thread', done: false, note: '' },
            { id: uid(), name: 'CPU Scheduling Algorithms', done: false, note: '' },
            { id: uid(), name: 'Deadlock & Prevention', done: false, note: '' },
          ],
        },
        {
          id: uid(),
          name: 'Memory Management',
          subtopics: [
            { id: uid(), name: 'Paging & Segmentation', done: false, note: '' },
            { id: uid(), name: 'Virtual Memory & Page Faults', done: false, note: '' },
          ],
        },
      ],
    },
  ];
}
