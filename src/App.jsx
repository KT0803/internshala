import { useState, useMemo, useCallback, useEffect } from 'react';
import styles from './App.module.css';

import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import FilterChips from './components/FilterChips/FilterChips';
import InternshipCard from './components/InternshipCard/InternshipCard';
import SkeletonCard from './components/SkeletonCard/SkeletonCard';
import SavedTab from './components/SavedTab/SavedTab';

import { useInternships } from './hooks/useInternships';
import { useSavedInternships } from './hooks/useSavedInternships';
import { useDebounce } from './hooks/useDebounce';

import {
  extractProfiles,
  extractLocations,
  applyFilters,
  sortInternships,
  buildFilterChips,
} from './utils/filterHelpers';

const THEME_KEY = 'internshala_theme';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleToggleTheme = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const { internships, loading, error } = useInternships();

  const { savedIds, toggleSave, isSaved, savedCount } =
    useSavedInternships();

  const [showSaved, setShowSaved] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [maxDuration, setMaxDuration] = useState(null);
  const [minStipend, setMinStipend] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const debouncedSearch = useDebounce(searchInput, 300);

  const profiles = useMemo(() => extractProfiles(internships), [internships]);
  const locations = useMemo(() => extractLocations(internships), [internships]);

  const filters = useMemo(
    () => ({
      profiles: selectedProfiles,
      locations: selectedLocations,
      maxDuration,
      minStipend,
      searchQuery: debouncedSearch,
    }),
    [selectedProfiles, selectedLocations, maxDuration, minStipend, debouncedSearch]
  );

  const filteredInternships = useMemo(() => {
    const filtered = applyFilters(internships, filters);
    return sortInternships(filtered, sortBy);
  }, [internships, filters, sortBy]);

  const savedInternships = useMemo(
    () => internships.filter((i) => savedIds.has(i.id)),
    [internships, savedIds]
  );

  const chips = useMemo(() => buildFilterChips(filters), [filters]);

  const activeFilterCount = chips.length;

  const handleProfileChange = useCallback((profile) => {
    setSelectedProfiles((prev) =>
      prev.includes(profile)
        ? prev.filter((p) => p !== profile)
        : [...prev, profile]
    );
  }, []);

  const handleLocationChange = useCallback((location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  }, []);

  const handleDurationChange = useCallback((duration) => {
    setMaxDuration(duration);
  }, []);

  const handleStipendChange = useCallback((stipend) => {
    setMinStipend(stipend);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
  }, []);

  const handleRemoveChip = useCallback(({ type, value }) => {
    switch (type) {
      case 'profile':
        setSelectedProfiles((prev) => prev.filter((p) => p !== value));
        break;
      case 'location':
        setSelectedLocations((prev) => prev.filter((l) => l !== value));
        break;
      case 'duration':
        setMaxDuration(null);
        break;
      case 'stipend':
        setMinStipend(0);
        break;
      case 'search':
        setSearchInput('');
        break;
      default:
        break;
    }
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedProfiles([]);
    setSelectedLocations([]);
    setMaxDuration(null);
    setMinStipend(0);
    setSearchInput('');
    setSortBy('default');
  }, []);

  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileFiltersOpen]);

  return (
    <div className={styles.app}>
      <Header
        savedCount={savedCount}
        showSaved={showSaved}
        onToggleSaved={() => setShowSaved((prev) => !prev)}
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
      />

      {showSaved ? (
        <div className={styles.mainContainer}>
          <div className={styles.content}>
            <SavedTab
              savedInternships={savedInternships}
              onToggleSave={toggleSave}
              isSaved={isSaved}
              onBack={() => setShowSaved(false)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.sidebarDesktop}>
            <FilterSidebar
              profiles={profiles}
              locations={locations}
              selectedProfiles={selectedProfiles}
              selectedLocations={selectedLocations}
              maxDuration={maxDuration}
              minStipend={minStipend}
              onProfileChange={handleProfileChange}
              onLocationChange={handleLocationChange}
              onDurationChange={handleDurationChange}
              onStipendChange={handleStipendChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />
          </div>

          {mobileFiltersOpen && (
            <div className={styles.mobileOverlay} onClick={() => setMobileFiltersOpen(false)}>
              <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
                <div className={styles.drawerHeader}>
                  <span className={styles.drawerTitle}>Filters</span>
                  <button className={styles.drawerClose} onClick={() => setMobileFiltersOpen(false)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar
                  profiles={profiles}
                  locations={locations}
                  selectedProfiles={selectedProfiles}
                  selectedLocations={selectedLocations}
                  maxDuration={maxDuration}
                  minStipend={minStipend}
                  onProfileChange={handleProfileChange}
                  onLocationChange={handleLocationChange}
                  onDurationChange={handleDurationChange}
                  onStipendChange={handleStipendChange}
                  sortBy={sortBy}
                  onSortChange={handleSortChange}
                  isMobile
                />
              </div>
            </div>
          )}

          <div className={styles.content}>
            <div className={styles.topBar}>
              <div className={styles.searchWrapper}>
                <SearchBar value={searchInput} onChange={setSearchInput} />
              </div>
              <button
                className={styles.filterToggleBtn}
                onClick={() => setMobileFiltersOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="14" y2="12" />
                  <line x1="4" y1="18" x2="10" y2="18" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className={styles.filterBadge}>{activeFilterCount}</span>
                )}
              </button>
            </div>

            <FilterChips
              chips={chips}
              resultCount={filteredInternships.length}
              onRemoveChip={handleRemoveChip}
              onClearAll={handleClearAll}
            />

            <div className={styles.cardGrid}>
              {loading ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : error ? (
                <div className={styles.errorState}>
                  <div className={styles.errorIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <p>{error}</p>
                  <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : filteredInternships.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <p className={styles.emptyTitle}>No internships found</p>
                  <p className={styles.emptyText}>
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    isSaved={isSaved(internship.id)}
                    onToggleSave={toggleSave}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
