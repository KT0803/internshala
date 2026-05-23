import styles from './Header.module.css';

function Header({ savedCount, showSaved, onToggleSaved, darkMode, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <div className={styles.logo}>
            <span className={styles.logoText}>Internshala</span>
          </div>

          <nav className={styles.nav}>
            <a href="#internships" className={styles.navLink}>Internships</a>
            <a href="#jobs" className={styles.navLink}>Jobs</a>
            <a href="#courses" className={styles.navLink}>Courses</a>
          </nav>
        </div>

        <div className={styles.rightGroup}>
          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          <button
            className={`${styles.savedBtn} ${showSaved ? styles.savedBtnActive : ''}`}
            onClick={onToggleSaved}
          >
            <svg
              className={styles.savedIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={showSaved ? '#fff' : 'none'}
              stroke={showSaved ? '#fff' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Saved ({savedCount})
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
