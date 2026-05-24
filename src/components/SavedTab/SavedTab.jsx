import styles from './SavedTab.module.css';
import InternshipCard from '../InternshipCard/InternshipCard';

function SavedTab({ savedInternships, onToggleSave, isSaved, onBack }) {
  const count = savedInternships.length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>
          Saved Internships ({count})
        </h2>
        <button className={styles.backBtn} onClick={onBack}>
          Back to all
        </button>
      </div>

      {count === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </span>
          <p className={styles.emptyText}>
            No saved internships yet. Bookmark internships to see them here.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {savedInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              isSaved={isSaved(internship.id)}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedTab;
