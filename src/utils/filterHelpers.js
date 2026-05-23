export function extractProfiles(internships) {
  const profiles = new Set();
  internships.forEach((i) => {
    if (i.profile_name) profiles.add(i.profile_name);
  });
  return [...profiles].sort();
}

export function extractLocations(internships) {
  const locations = new Set();
  internships.forEach((i) => {
    if (i.work_from_home) {
      locations.add('Work from Home');
    }
    if (i.location_names && i.location_names.length > 0) {
      i.location_names.forEach((loc) => locations.add(loc));
    }
  });
  return [...locations].sort();
}

export function parseDuration(durationStr) {
  if (!durationStr) return 0;
  const match = durationStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

export function applyFilters(internships, filters) {
  const { profiles, locations, maxDuration, minStipend, searchQuery } = filters;

  return internships.filter((internship) => {
    if (profiles.length > 0) {
      if (!profiles.includes(internship.profile_name)) return false;
    }

    if (locations.length > 0) {
      const internLocs = internship.location_names || [];
      const isWFH = internship.work_from_home;
      const hasMatchingLocation = locations.some((loc) => {
        if (loc === 'Work from Home') return isWFH;
        return internLocs.includes(loc);
      });
      if (!hasMatchingLocation) return false;
    }

    if (maxDuration !== null && maxDuration > 0) {
      const months = parseDuration(internship.duration);
      if (months > maxDuration) return false;
    }

    if (minStipend > 0) {
      const stipendVal = internship.stipend?.salaryValue1 || 0;
      if (stipendVal < minStipend) return false;
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const title = (internship.title || '').toLowerCase();
      const company = (internship.company_name || '').toLowerCase();
      const profile = (internship.profile_name || '').toLowerCase();
      if (!title.includes(q) && !company.includes(q) && !profile.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

export function sortInternships(internships, sortBy) {
  if (sortBy === 'default') return internships;

  const sorted = [...internships];

  if (sortBy === 'stipend_high') {
    sorted.sort((a, b) => {
      const sa = a.stipend?.salaryValue1 || 0;
      const sb = b.stipend?.salaryValue1 || 0;
      return sb - sa;
    });
  }

  if (sortBy === 'duration_short') {
    sorted.sort((a, b) => {
      const da = parseDuration(a.duration);
      const db = parseDuration(b.duration);
      return da - db;
    });
  }

  return sorted;
}

export function buildFilterChips(filters) {
  const chips = [];
  const { profiles, locations, maxDuration, minStipend, searchQuery } = filters;

  profiles.forEach((p) => {
    chips.push({ type: 'profile', label: p, value: p });
  });

  locations.forEach((l) => {
    chips.push({ type: 'location', label: l, value: l });
  });

  if (maxDuration !== null && maxDuration > 0) {
    chips.push({
      type: 'duration',
      label: `≤ ${maxDuration} month${maxDuration > 1 ? 's' : ''}`,
      value: String(maxDuration),
    });
  }

  if (minStipend > 0) {
    chips.push({
      type: 'stipend',
      label: `₹${minStipend.toLocaleString('en-IN')}+`,
      value: String(minStipend),
    });
  }

  if (searchQuery && searchQuery.trim() !== '') {
    chips.push({
      type: 'search',
      label: `"${searchQuery.trim()}"`,
      value: searchQuery.trim(),
    });
  }

  return chips;
}
