# 📚 The Somatic Library — Author Storefront Website

> **A high-converting, dark-luxury book storefront for author Tarun Mankar.**  
> Built with vanilla HTML + CSS + JavaScript. Zero frameworks. Zero build tools.  
> Add a new book in 10 seconds by editing one JSON file.

---

## 🗂️ Project Structure

```
The-Somatic-Library/
│
├── index.html            ← Single-page website (all sections inside)
├── style.css             ← Complete design system (dark luxury theme)
├── app.js                ← All interactivity logic
├── books_data.json       ← ⭐ MASTER DATA FILE — edit this to add/update books
│
├── covers/               ← Book cover images for all 17 books
│   ├── stop_spiraling.jpg
│   ├── somatic_pacing.jpg
│   ├── scarcity_mindset.jpg
│   ├── dopamine_reset.jpg
│   ├── courage_to_disappoint.jpg
│   ├── wired_for_security.jpg
│   ├── mastering_the_storm.jpg
│   ├── procrastination_loop.jpg
│   ├── thawing_the_freeze.jpg
│   ├── inability_to_rest.jpg
│   ├── midnight_nervous_system.jpg
│   ├── shame_collapse.jpg
│   ├── phantom_alarm.jpg
│   ├── social_hangover.jpg
│   ├── braced_body.jpg
│   ├── imposter_alarm.jpg
│   └── calm_alarm.jpg
│
└── README.md             ← This file
```

---

## 🧠 Architecture Overview

This project follows a **data-driven architecture**:

```
books_data.json  ──→  app.js reads it  ──→  Dynamically renders book cards & modals
```

- `app.js` fetches `books_data.json` on page load
- If `fetch()` fails (e.g., local `file://` protocol, CORS), it falls back to **inline embedded data** inside `app.js` itself
- This means the site works **both locally (double-click index.html)** and when **deployed on any host**

### Data Flow Diagram

```
User opens index.html
        │
        ▼
app.js: DOMContentLoaded
        │
        ├──→ fetch('books_data.json')
        │         ├── SUCCESS → use JSON data
        │         └── FAIL   → use INLINE_DATA fallback in app.js
        │
        ▼
renderBooks(allBooks)  →  injects HTML cards into #books-grid
        │
        ├──→ filterBooks(category)  →  shows/hides cards
        ├──→ search input listener  →  filters by keyword
        └──→ openModal(bookId)      →  shows buy options popup
```

---

## 📄 File-by-File Reference

### 1. `books_data.json` — The Only File You Need to Edit

This is the **single source of truth** for all book data.

**Top-level structure:**
```json
{
  "author": { ... },   ← Author info, stats, profile links
  "books": [ ... ]     ← Array of book objects
}
```

**Book object structure:**
```json
{
  "id": 1,                          ← Unique integer (increment for new books)
  "title": "Book Title",            ← Full book title
  "subtitle": "Short subtitle",     ← Displayed under title on card
  "hook": "Emotional hook line?",   ← The #1 conversion driver — make it visceral
  "hook_sub": "Follow-up line.",    ← Optional second hook sentence
  "description": "Full paragraph.", ← Shown in the buy modal
  "category": "anxiety",            ← Filter key: anxiety | burnout | focus | money | emotional
  "category_label": "Display Name", ← Shown as badge on card
  "cover": "covers/filename.jpg",   ← Relative path to cover image
  "keywords": ["word1", "word2"],   ← Used by the search bar
  "links": {
    "amazon_ebook":      "https://mybook.to/ASIN",
    "amazon_paperback":  "https://mybook.to/PAPERBACK_ASIN",
    "google_ebook":      "https://play.google.com/store/books/details/...",
    "google_audio":      "https://play.google.com/store/audiobooks/details?id=...",
    "elevenreader":      "https://elevenreader.io/audiobooks/..."
  }
}
```

> ⚠️ **Important:** If `app.js` is also updated (for new categories or features), you must **also update the `INLINE_DATA` constant** at the top of `app.js` to keep the local fallback in sync.

---

### 2. `index.html` — Page Structure

The HTML is divided into these sections (in order):

| Section | ID | Description |
|---|---|---|
| Animated background | `.bg-orbs` | 3 floating gradient blobs (CSS only) |
| Navigation bar | `#navbar` | Fixed top bar, scrolls to gold border |
| Hero | `#hero` | Title, tagline, CTA buttons, platform links |
| Stats bar | `#stats-bar` | Books count, audiobooks, platforms, rating |
| Books section | `#books` | Search bar + filter tabs + dynamic grid |
| Author section | `#author` | Bio + 3 platform profile links |
| Footer | `#footer` | Copyright + platform links |
| Buy modal | `#modal-overlay` | Popup with 5 buy options, opened by JS |

**Key IDs used by `app.js`:**
- `#books-grid` — where book cards are injected
- `#search-input` — search text input
- `#search-clear-btn` — clear button for search
- `#filter-tabs` → `.filter-btn[data-filter]` — category filter buttons
- `#modal-overlay`, `#buy-modal` — the buy popup
- `#modal-cover`, `#modal-title`, `#modal-hook`, `#modal-desc`, `#buy-grid` — modal content slots

---

### 3. `style.css` — Design System

**CSS Variables (`:root`):**
```css
--bg-deep       /* #080a10 — main page background */
--bg-card       /* semi-transparent card background */
--bg-glass      /* glassmorphism surface */
--border        /* subtle white border */
--border-glow   /* amber/gold glow border */
--gold          /* #d4af37 — primary accent color */
--gold-light    /* #f0d060 — lighter gold for gradients */
--gold-dim      /* rgba gold — used for hover backgrounds */
--text-bright   /* #f5f0e8 — primary text */
--text-mid      /* #a8a0b8 — secondary text */
--text-dim      /* #5a5470 — muted text */
--violet        /* #7c5cbf — used in background orbs */
--radius-*      /* 8px / 16px / 24px / 32px */
--shadow-card   /* deep card shadow */
--shadow-glow   /* gold ambient glow */
--transition    /* cubic-bezier smooth transition */
```

**Typography:**
- Headings: `'Playfair Display'` (Google Fonts — serif, premium feel)
- Body/UI: `'Outfit'` (Google Fonts — modern geometric sans)

**Key CSS sections (use ctrl+F to find):**
- `/* ── Animated Background Orbs ── */`
- `/* ── NAVBAR ── */`
- `/* ── HERO ── */`
- `/* ── STATS BAR ── */`
- `/* ── BOOKS SECTION ── */`
- `/* Book Card */`
- `/* ── MODAL ── */`
- `/* ── RESPONSIVE ── */`

---

### 4. `app.js` — JavaScript Logic

**Key functions:**

| Function | Purpose |
|---|---|
| `loadBooks()` | Fetches `books_data.json`; falls back to `INLINE_DATA` |
| `renderBooks(books)` | Generates all book card HTML and injects into `#books-grid` |
| `filterBooks(category)` | Filters by category string, updates active tab UI |
| `applyFilters()` | Combines current filter + search query and calls `renderBooks()` |
| `openModal(bookId)` | Finds book by ID, populates modal fields, shows overlay |
| `buildBuyOptions(links)` | Returns HTML string of 5 buy option rows for the modal |
| `closeModal()` | Hides modal overlay, restores body scroll |
| `initSearch()` | Attaches `input` listener to `#search-input` |
| `initNavScroll()` | Adds `.scrolled` class to navbar when page scrolls past 40px |
| `updateStats(stats)` | Updates stat numbers in the stats bar |
| `clearSearch()` | Resets search input and re-renders all books |

**`INLINE_DATA` constant** — At the top of `app.js`, this is a full copy of `books_data.json` embedded directly. This ensures the site works on `file://` protocol (double-click preview) where `fetch()` is blocked by CORS.

> 🔁 **Keep `INLINE_DATA` in sync with `books_data.json`** when adding new books!

---

## 👤 Author: Tarun Mankar

| Platform | URL |
|---|---|
| Amazon Author Store | https://www.amazon.com/stores/Tarun-Mankar/author/B0BTBLH2SN |
| ElevenReader Hub (16 audiobooks) | https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un |
| Google Play Books | https://play.google.com/store/search?q=Tarun+Mankar&c=books |

---

## 📚 Complete Book Catalog (All Published Titles)

### Amazon + Google Play + ElevenReader (5 flagship titles)

| # | Title | Amazon Kindle | Amazon PB | Google eBook | Google Audio | ElevenReader |
|---|---|---|---|---|---|---|
| 1 | **Stop Spiraling** | [Kindle](https://mybook.to/B0HN23T4GD) | [PB](https://mybook.to/B0HN2V5MK9) | [eBook](https://play.google.com/store/books/details/Tarun_Mankar_Stop_Spiraling?id=QvkZEgAAQBAJ) | [Audio](https://play.google.com/store/audiobooks/details?id=AQAAAEBGJm1mOM) | [Listen](https://elevenreader.io/audiobooks/stop-spiraling-audiobook/upo1o3x59kDS52xOIg6B) |
| 2 | **Somatic Pacing** | [Kindle](https://mybook.to/B0HN53MBXP) | [PB](https://mybook.to/B0HN54HSS4) | [eBook](https://play.google.com/store/books/details/Tarun_Mankar_Somatic_Pacing?id=xXcbEgAAQBAJ) | [Audio](https://play.google.com/store/audiobooks/details?id=AQAAAEBGllTWAM) | [Listen](https://elevenreader.io/audiobooks/somatic-pacing-audiobook/oh8YwXf7nPdM42c4amjG) |
| 3 | **Healing The Scarcity Mindset** | [Kindle](https://mybook.to/B0HNJVFK7S) | [PB](https://mybook.to/B0HNJYXX62) | [eBook](https://play.google.com/store/books/details/Tarun_Mankar_Healing_The_Scarcity_Mindset?id=NZcbEgAAQBAJ) | [Audio](https://play.google.com/store/audiobooks/details?id=AQAAAEBGfi8-eM) | [Listen](https://elevenreader.io/audiobooks/healing-the-scarcity-mindset-audiobook/gbsUy9RuUMREED5fuFTb) |
| 4 | **Dopamine Reset and Deep Focus** | [Kindle](https://mybook.to/B0HNXS4H2Q) | [PB](https://mybook.to/B0HNXWCKQK) | [eBook](https://play.google.com/store/books/details/Tarun_Mankar_Dopamine_Reset_and_Deep_Focus?id=jxcdEgAAQBAJ) | [Audio](https://play.google.com/store/audiobooks/details?id=AQAAAEBGAVhBDM) | [Listen](https://elevenreader.io/audiobooks/dopamine-reset-and-deep-focus-audiobook/0OoDHxWEdG2lNNbpAUjY) |
| 5 | **The Courage to Disappoint** | [Kindle](https://www.amazon.com/dp/B0HP8D7JRT) | [PB](https://www.amazon.com/dp/B0HP8MQL2P/ref=tmm_pap_swatch_0) | [eBook](https://play.google.com/store/books/details?id=1WIhEgAAQBAJ) | [Audio](https://play.google.com/store/audiobooks/details?id=AQAAAEBGXVkdDM) | [Listen](https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un) |

### ElevenReader-Only Audiobooks (12 additional titles)

| # | Title | Duration | Price | ElevenReader Link |
|---|---|---|---|---|
| 6 | **Wired for Security** | 2h 51m | Free | [Listen](https://elevenreader.io/audiobooks/wired-for-security-audiobook/We5ZO64fc78yTgapRRMp) |
| 7 | **Mastering the Emotional Storm** | 2h 58m | Free | [Listen](https://elevenreader.io/audiobooks/mastering-the-emotional-storm-audiobook/5Y6hOQqRHU1zSc4a2vid) |
| 8 | **The Procrastination Loop** | 2h 56m | Free | [Listen](https://elevenreader.io/audiobooks/the-procrastination-loop-audiobook/J6A32ugNYybFvpQ6Yn4e) |
| 9 | **Thawing the Freeze** | 2h 50m | Free | [Listen](https://elevenreader.io/audiobooks/thawing-the-freeze-audiobook/Q4N4nQufjtoEZGY8lokC) |
| 10 | **The Inability to Rest** | 3h 01m | Ultra only | [Listen](https://elevenreader.io/audiobooks/the-inability-to-rest-audiobook/qBubDX1BrUqKzykGhR48) |
| 11 | **The Midnight Nervous System** | 2h 58m | $2.99 | [Listen](https://elevenreader.io/audiobooks/the-midnight-nervous-system-audiobook/6yrBCzAWhxVJRY05oWn5) |
| 12 | **The Shame Collapse** | 2h 49m | $2.99 | [Listen](https://elevenreader.io/audiobooks/the-shame-collapse-audiobook/xVjNhuNLLotGmkw8ZqFl) |
| 13 | **The Phantom Alarm** | 3h 38m | $4.99 | [Listen](https://elevenreader.io/audiobooks/the-phantom-alarm-audiobook/k6Ou7tzSkcXbcz8Tvlfq) |
| 14 | **The Social Hangover** | 3h 04m | Free | [Listen](https://elevenreader.io/audiobooks/the-social-hangover-audiobook/Isl2ldQ1r3KtFN6hTTpu) |
| 15 | **The Braced Body** | 2h 54m | Free | [Listen](https://elevenreader.io/audiobooks/the-braced-body-audiobook/JmIsSXo9af01O77XRBG8) |
| 16 | **The Imposter Alarm** | 3h 12m | Free | [Listen](https://elevenreader.io/audiobooks/the-imposter-alarm-audiobook/jiZpOzGMWHEVK2zNC4Q1) |
| 17 | **The Calm Alarm** | 2h 55m | Free | [Listen](https://elevenreader.io/audiobooks/the-calm-alarm-audiobook/yUJBhW1HG0U6Jj9pLSxg) |

> 📌 **Note:** Books 6–17 are currently ElevenReader-only. To add them to the website grid, add their cover images in `covers/` and create entries in `books_data.json` with only `elevenreader` link populated (amazon/google links can be omitted or set to `""` — the buy modal only shows platforms with valid links).

---

## ➕ How to Add a New Book (Step-by-Step)

### Step 1: Get the cover image
Download from Google Play Books (high-res):
```
https://play.google.com/books/publisher/content/images/frontcover/{GOOGLE_BOOK_ID}?fife=w1200-h1800
```
Save as `covers/your_book_name.jpg`

### Step 2: Add entry to `books_data.json`

Open `books_data.json` and add a new object to the `"books"` array:

```json
{
  "id": 5,
  "title": "Your Book Title",
  "subtitle": "Short tagline for the card",
  "hook": "One visceral emotional question that hits the reader?",
  "hook_sub": "One follow-up sentence that twists the knife.",
  "description": "2-3 sentence description for the buy modal.",
  "category": "anxiety",
  "category_label": "Relationship Anxiety & Attachment",
  "cover": "covers/your_book_name.jpg",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "links": {
    "amazon_ebook":      "https://mybook.to/YOUR_KINDLE_ASIN",
    "amazon_paperback":  "https://mybook.to/YOUR_PAPERBACK_ASIN",
    "google_ebook":      "https://play.google.com/store/books/details/...",
    "google_audio":      "https://play.google.com/store/audiobooks/details?id=...",
    "elevenreader":      "https://elevenreader.io/audiobooks/your-book-slug/ID"
  }
}
```

### Step 3: Mirror the same entry in `app.js`

Open `app.js`, find the `INLINE_DATA` constant at the top, and paste the **same JSON object** into its `"books"` array. This keeps the local fallback in sync.

### Step 4: Done! ✅

Open `index.html` in browser — the new card appears automatically.

---

## 🎨 Available Book Categories

| `category` value | `category_label` | Filter Tab |
|---|---|---|
| `anxiety` | Relationship Anxiety & Attachment | "Anxiety & Attachment" |
| `burnout` | Burnout & Energy Pacing | "Burnout & Energy" |
| `focus` | Dopamine & Focus | "Dopamine & Focus" |
| `money` | Money Panic & Scarcity | "Money & Scarcity" |

**To add a new category:**
1. Use a new `category` string in the book object (e.g., `"grief"`)
2. Add a new filter button in `index.html`:
   ```html
   <button class="filter-btn" data-filter="grief" onclick="filterBooks('grief')">Grief & Loss</button>
   ```
3. Done — no JS changes needed.

---

## 🚀 Deployment Guide

### Option 1: GitHub Pages (Free, Recommended)
```bash
git add .
git commit -m "Website launch"
git push origin main
# Go to: GitHub repo > Settings > Pages > Source: main branch
# Live at: https://yourusername.github.io/The-Somatic-Library/
```

### Option 2: Netlify (Drag & Drop, Easiest)
1. Go to [netlify.com](https://netlify.com) → Log in
2. Drag the entire `The-Somatic-Library/` folder onto the deploy area
3. Get instant live URL (e.g., `tarun-books.netlify.app`)
4. Optional: Add custom domain

### Option 3: Vercel
```bash
npm install -g vercel
vercel deploy
```

> ✅ No build step needed. No `node_modules`. No `package.json`. Pure HTML/CSS/JS — works on ANY static host.

---

## 🧪 Local Development

**Method 1: Double-click** `index.html` — Opens in browser immediately. The inline data fallback ensures everything works.

**Method 2: Local server** (if you want `fetch()` to work from JSON file):
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# Then open: http://localhost:8080
```

---

## 🔧 Common Maintenance Tasks

| Task | What to edit |
|---|---|
| Change book hook/description | `books_data.json` → find the book → update `hook` or `description` |
| Update a buy link | `books_data.json` → find the book → update the relevant `links.*` URL |
| Change author bio | `index.html` → find `#author-bio-text` → edit the `<p>` content |
| Change hero tagline | `index.html` → find `#hero-title` → edit the `<h1>` content |
| Change color scheme | `style.css` → edit CSS variables in `:root {}` |
| Change fonts | `index.html` → update Google Fonts `<link>` URL + update `style.css` font-family references |
| Add a new cover image | Drop `.jpg` into `covers/` folder, reference in `books_data.json` as `"cover": "covers/filename.jpg"` |

---

## 🤖 Notes for AI Assistants

If you are an AI model helping maintain or extend this project, here is what you need to know:

1. **This is a static website.** No React, no Vue, no build tools, no `node_modules`. Pure HTML + CSS + JS.

2. **The data layer is `books_data.json`.** Adding new books = adding JSON entries here. No template changes needed.

3. **`app.js` has two data sources:**
   - Primary: `books_data.json` (fetched via `fetch()`) — used when deployed
   - Fallback: `INLINE_DATA` constant at top of file — used when opened locally as `file://`
   - **Both must be kept in sync** when books are added.

4. **Design system uses CSS variables in `:root`.** To change colors or spacing, edit variables — not individual rules.

5. **The modal is pre-rendered in HTML** (`#modal-overlay`). `app.js` just populates its fields and toggles `.open` class.

6. **Book cover images** are sourced from Google Play Books using this URL pattern:
   ```
   https://play.google.com/books/publisher/content/images/frontcover/{BOOK_ID}?fife=w1200-h1800
   ```
   Where `BOOK_ID` is the `id=` parameter from the Google Play Books URL.

7. **Unique element IDs** are on every interactive element for easy browser testing and automation.

---

## 📜 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Structure |
| CSS3 | — | Styling, animations, glassmorphism |
| Vanilla JavaScript | ES6+ | Interactivity, data rendering |
| Google Fonts | — | `Outfit` + `Playfair Display` |
| JSON | — | Book data storage |

No npm. No build step. No dependencies to install.

---

## 📝 Changelog

| Date | Change |
|---|---|
| Oct 2026 | Full catalog expansion — 17 books, 17 audiobooks, 5 emotional categories, high-res covers & multi-retailer buy options |
| Oct 2025 | Initial launch — 4 books, dark luxury design |

---

*Made for Tarun Mankar — The Somatic Library*
