import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'internshala_saved_internships';

export function useSavedInternships() {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch {
      return new Set();
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedIds]));
  }, [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id) => savedIds.has(id),
    [savedIds]
  );

  const clearAllSaved = useCallback(() => {
    setSavedIds(new Set());
  }, []);

  return {
    savedIds,
    toggleSave,
    isSaved,
    savedCount: savedIds.size,
    clearAllSaved,
  };
}
