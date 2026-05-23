import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.searchIcon}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        className={styles.input}
        type="text"
        placeholder="Search by title, company, or skills..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          className={styles.clearBtn}
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;
