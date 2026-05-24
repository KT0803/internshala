import { useState } from 'react';
import styles from './FilterSidebar.module.css';

function FilterSidebar({
  profiles,
  locations,
  selectedProfiles,
  selectedLocations,
  maxDuration,
  minStipend,
  onProfileChange,
  onLocationChange,
  onDurationChange,
  onStipendChange,
  sortBy,
  onSortChange,
  isMobile,
}) {
  const [profileSearch, setProfileSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  const filteredProfiles = profiles.filter((p) =>
    p.toLowerCase().includes(profileSearch.toLowerCase())
  );

  const sortedLocations = [...locations].sort((a, b) => {
    if (a === 'Work from Home') return -1;
    if (b === 'Work from Home') return 1;
    return 0;
  });

  const filteredLocations = sortedLocations.filter((l) =>
    l.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleDurationChange = (e) => {
    const val = e.target.value;
    onDurationChange(val === '' ? null : Number(val));
  };

  const formatStipend = (value) => {
    return '\u20B9' + Number(value).toLocaleString('en-IN');
  };

  return (
    <aside className={`${styles.sidebar} ${isMobile ? styles.sidebarMobile : ''}`}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Sort By</h3>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="stipend_high">Stipend: High to Low</option>
          <option value="duration_short">Duration: Short to Long</option>
        </select>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Profile / Category</h3>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search profile..."
          value={profileSearch}
          onChange={(e) => setProfileSearch(e.target.value)}
        />
        <div className={styles.checkboxList}>
          {filteredProfiles.map((profile) => (
            <label key={profile} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedProfiles.includes(profile)}
                onChange={() => onProfileChange(profile)}
              />
              <span className={styles.checkboxCustom} />
              <span className={styles.labelText}>{profile}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Location</h3>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search location..."
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
        />
        <div className={styles.checkboxList}>
          {filteredLocations.map((location) => (
            <label key={location} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedLocations.includes(location)}
                onChange={() => onLocationChange(location)}
              />
              <span className={styles.checkboxCustom} />
              <span className={styles.labelText}>{location}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Duration</h3>
        <select
          className={styles.select}
          value={maxDuration === null ? '' : String(maxDuration)}
          onChange={handleDurationChange}
        >
          <option value="">Any</option>
          <option value="1">1 Month</option>
          <option value="2">2 Months</option>
          <option value="3">3 Months</option>
          <option value="4">4 Months</option>
          <option value="5">5 Months</option>
          <option value="6">6 Months</option>
        </select>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Stipend</h3>
        <input
          type="range"
          className={styles.rangeSlider}
          min={0}
          max={50000}
          step={1000}
          value={minStipend}
          onChange={(e) => onStipendChange(Number(e.target.value))}
        />
        <div className={styles.stipendValue}>{formatStipend(minStipend)}</div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
