# Internshala Internship Search Page Clone

A fully functional clone of the Internshala internship search page built with **React.js (Vite)**. Features real-time filtering, keyword search, bookmarking, dark mode, and a clean component-based architecture.

---

## Special Features

### Dark / Light Mode Toggle

- One-click theme switch via the **moon/sun icon** in the header
- Smooth 0.3s CSS transitions across all UI elements
- Theme preference **persists across page refreshes** using `localStorage`
- Powered by CSS custom properties (`var(--bg-card)`, `var(--text-primary)`, etc.) — no JS-based style injection
- Full dark palette with carefully chosen contrast ratios for readability

### Save & Shortlist

- **Bookmark icon** on every internship card — click to save, click again to unsave
- Saved internships count shown as **"Saved (n)"** pill button in the header
- Click the Saved button to view **only your bookmarked internships** in a dedicated tab
- Unsaving from the saved view **removes the card instantly**
- All saved data **persists across page refreshes** via `localStorage`
- Entire logic encapsulated in a custom `useSavedInternships()` hook — zero save logic in components

### Real-Time Combined Filtering (AND Logic)

All 4 filters work **simultaneously in combination** — results update live on every change, no submit button needed:

| Filter             | Type                          | Behavior                                      |
|--------------------|-------------------------------|-----------------------------------------------|
| **Profile**        | Searchable multi-select checkboxes | Dynamically extracted from API response       |
| **Location**       | Searchable multi-select checkboxes | Includes "Work from Home" as a separate option|
| **Duration**       | Dropdown (1–6 months)         | Filters internships with duration ≤ selected  |
| **Stipend**        | Range slider (₹0–₹50,000)    | Filters internships with stipend ≥ selected   |

### Debounced Keyword Search

- Searches across **internship title, company name, and profile** simultaneously
- Debounced at **300ms** using a custom `useDebounce(value, delay)` hook
- Works in combination with all active filters
- Clear button (×) to reset search instantly

### Active Filter Chips

- Each applied filter appears as a **dismissible chip** above results (e.g., "Mumbai ×", "₹5,000+ ×")
- Clicking × removes only that specific filter
- **"Clear all"** button resets every filter at once
- Live result count — **"Showing X internship(s)"** — updates on every filter change

### Sort Options

- **Default** — preserves original API order
- **Stipend: High to Low** — highest paying internships first
- **Duration: Short to Long** — shortest internships first
- Sort works in combination with all active filters

### Skeleton Loading Cards

- Animated **shimmer placeholder cards** displayed while API data loads
- Skeleton layout matches the exact shape of a real internship card
- No spinners — clean, modern loading UX

### Fully Responsive Design

The entire UI adapts seamlessly across **desktop, tablet, and mobile** devices:

- **Mobile filter drawer** — on screens below 900px, the sidebar is replaced by a **slide-in drawer** triggered by a "Filters" button next to the search bar. An active filter count badge shows how many filters are applied
- **Backdrop overlay** with body scroll lock when the drawer is open — tap outside or hit the X to close
- **Touch-optimized controls** inside the drawer — larger checkboxes (18px), taller dropdowns (44px), bigger search inputs for comfortable thumb tapping
- **Cards adapt** — reduced padding, smaller fonts, wrapping tags and bottom row on small screens
- **Header collapses** — navigation links hide on tablet, logo and buttons shrink on phone
- **Filter chips reflow** — result count takes its own row, chips shrink for narrow viewports
- **Skeleton cards match** — loading placeholders adapt to the same responsive layout as real cards
- All responsive behavior is **pure CSS** — no JavaScript resize listeners, just clean `@media` breakpoints at **900px**, **768px**, **600px**, and **480px**

---

## Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| Framework   | React 19                  |
| Build Tool  | Vite 8                    |
| Styling     | CSS Modules (`.module.css`) |
| Font        | Inter (Google Fonts)      |
| State       | React Hooks only          |
| Storage     | localStorage              |
| Libraries   | None (zero external deps) |

---

## Folder Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx            # Sticky header with nav, saved button, theme toggle
│   │   └── Header.module.css
│   ├── SearchBar/
│   │   ├── SearchBar.jsx          # Debounced keyword search input
│   │   └── SearchBar.module.css
│   ├── FilterSidebar/
│   │   ├── FilterSidebar.jsx      # All 4 filters + sort dropdown
│   │   └── FilterSidebar.module.css
│   ├── FilterChips/
│   │   ├── FilterChips.jsx        # Active filter chips + result count
│   │   └── FilterChips.module.css
│   ├── InternshipCard/
│   │   ├── InternshipCard.jsx     # Individual internship card with bookmark
│   │   └── InternshipCard.module.css
│   ├── SkeletonCard/
│   │   ├── SkeletonCard.jsx       # Shimmer loading placeholder
│   │   └── SkeletonCard.module.css
│   └── SavedTab/
│       ├── SavedTab.jsx           # Saved internships view
│       └── SavedTab.module.css
├── hooks/
│   ├── useDebounce.js             # Reusable debounce hook
│   ├── useInternships.js          # API fetching, loading, error state
│   └── useSavedInternships.js     # Bookmark logic + localStorage sync
├── utils/
│   └── filterHelpers.js           # All filter, sort, search, and chip logic
├── App.jsx                        # Root component — holds all global state
├── App.module.css
└── main.jsx                       # Entry point
```

---

## Architecture Decisions

- **All filter/sort/search logic lives in `filterHelpers.js`** — zero filtering inside components or hooks
- **All stateful logic inside custom hooks** — components only receive props and render UI
- **`App.jsx` is the single source of truth** — holds global state, passes props down
- **No inline styles** — CSS Modules only
- **No external UI libraries** — pure React + vanilla CSS
- **Functional components only** — no class components

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd internshala

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173/**

### Production Build

```bash
npm run build
npm run preview
```

---

## API

Internship data is fetched from the Internshala hiring API:

```
GET https://internshala.com/hiring/search
```

The response contains `internships_meta` (object keyed by ID) and `internship_ids` (ordered array). The `useInternships` hook normalizes this into an ordered array on load.

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+
