import { useState, useEffect } from 'react';

export function useInternships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchInternships() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://internshala.com/hiring/search', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Failed to fetch internships`);
        }

        const data = await response.json();
        const meta = data.internships_meta || {};
        const ids = data.internship_ids || [];
        const normalized = ids.map((id) => meta[id]).filter(Boolean);

        setInternships(normalized);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchInternships();

    return () => controller.abort();
  }, []);

  return { internships, loading, error };
}
