import styles from './InternshipCard.module.css';

function InternshipCard({ internship, isSaved, onToggleSave }) {
  const {
    id,
    title,
    company_name,
    work_from_home,
    location_names,
    duration,
    stipend,
    application_deadline,
    start_date,
    is_ppo,
    posted_by_label,
  } = internship;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.companyName}>{company_name}</p>
        </div>
        <button
          className={`${styles.bookmarkBtn} ${isSaved ? styles.bookmarkSaved : ''}`}
          onClick={() => onToggleSave(id)}
          aria-label={isSaved ? 'Unsave internship' : 'Save internship'}
        >
          {isSaved ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1z" />
            </svg>
          )}
        </button>
      </div>

      <div className={styles.tagsRow}>
        {work_from_home && (
          <span className={styles.tag}>
            <svg className={styles.tagIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
            </svg>
            Work from Home
          </span>
        )}
        {location_names &&
          location_names.map((loc) => (
            <span className={styles.tag} key={loc}>
              <svg className={styles.tagIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {loc}
            </span>
          ))}
        {is_ppo && <span className={styles.ppoBadge}>PPO</span>}
      </div>

      <div className={styles.infoRow}>
        <div className={styles.infoItem}>
          <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <div>
            <span className={styles.infoLabel}>Start Date</span>
            <span className={styles.infoValue}>{start_date}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div>
            <span className={styles.infoLabel}>Duration</span>
            <span className={styles.infoValue}>{duration}</span>
          </div>
        </div>
        <div className={styles.infoItem}>
          <svg className={styles.infoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
          <div>
            <span className={styles.infoLabel}>Stipend</span>
            <span className={styles.infoValue}>{stipend?.salary || '—'}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        {posted_by_label && (
          <span className={styles.postedLabel}>{posted_by_label}</span>
        )}
        {application_deadline && (
          <span className={styles.applyBy}>Apply by {application_deadline}</span>
        )}
      </div>
    </div>
  );
}

export default InternshipCard;
