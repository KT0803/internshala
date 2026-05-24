import React from 'react';
import styles from './FilterChips.module.css';

function FilterChips({ chips, resultCount, onRemoveChip, onClearAll }) {
  return (
    <div className={styles.container}>
      <span className={styles.resultCount}>
        Showing {resultCount} internship{resultCount !== 1 ? 's' : ''}
      </span>

      {chips.map((chip, index) => (
        <span className={styles.chip} key={`${chip.type}-${chip.value}-${index}`}>
          <span className={styles.chipLabel}>{chip.label}</span>
          <button
            className={styles.chipRemove}
            onClick={() => onRemoveChip({ type: chip.type, value: chip.value })}
            aria-label={`Remove filter: ${chip.label}`}
          >
            ×
          </button>
        </span>
      ))}

      {chips.length > 0 && (
        <button className={styles.clearAll} onClick={onClearAll}>
          Clear all
        </button>
      )}
    </div>
  );
}

export default FilterChips;
