# AGENTS.md — AI Assistant Context File
# The Somatic Library — Tarun Mankar's Book Storefront

This file is specifically written for AI coding assistants (Claude, Gemini, GPT, etc.)
to understand this codebase instantly without reading every file.

---

## PROJECT IDENTITY

- **Project name:** The Somatic Library
- **Owner/Author:** Tarun Mankar
- **Purpose:** Author storefront website selling somatic psychology books & audiobooks
- **Tech:** Pure HTML + CSS + Vanilla JavaScript (NO frameworks, NO build tools, NO npm)
- **Hosting target:** GitHub Pages, Netlify, or Vercel (static hosting)

---

## ABSOLUTE RULES — READ BEFORE MAKING CHANGES

1. **DO NOT introduce React, Vue, Angular, or any framework.** This is intentionally vanilla JS.
2. **DO NOT add npm/package.json/node_modules.** No build process allowed.
3. **DO NOT use TailwindCSS.** Custom CSS with CSS variables is the design system.
4. **ALWAYS update BOTH `books_data.json` AND `INLINE_DATA` in `app.js`** when adding books.
5. **DO NOT break the fallback mechanism** in `loadBooks()` — it's essential for local previewing.
6. **Preserve all CSS variable names** in `:root` — they are referenced throughout the file.

---

## CODEBASE MAP

```
index.html        ← Static shell, 9 sections, references style.css + app.js
style.css         ← All styling, ~400 lines, CSS variables in :root
app.js            ← All JS, ~200 lines, INLINE_DATA + fetch + render + modal + search
books_data.json   ← Book data (author info + array of book objects)
covers/*.jpg      ← Book cover images, referenced by relative path in books_data.json
```

---

## CRITICAL: DUAL DATA SOURCE PATTERN

`app.js` has a built-in dual data source:

```javascript
// PRIMARY: fetches from books_data.json (works on deployed servers)
const res = await fetch('books_data.json');

// FALLBACK: INLINE_DATA constant at top of file (works on local file:// protocol)
const INLINE_DATA = { author: {...}, books: [...] };
```

**Why this exists:** Browsers block `fetch()` on `file://` protocol (CORS). The inline fallback
makes the site work when a user simply double-clicks `index.html`.

**Implication:** When you add a new book, you MUST update BOTH sources.

---

## BOOK OBJECT SCHEMA (books_data.json)

```typescript
interface Book {
  id: number;                    // Unique integer, auto-increment
  title: string;                 // Full book title
  subtitle: string;              // Short descriptor shown on card
  hook: string;                  // Visceral emotional question (the main CRO hook)
  hook_sub: string;              // Follow-up hook sentence
  description: string;           // 2-3 sentences, shown in buy modal
  category: "anxiety" | "burnout" | "focus" | "money" | "emotional";  // Filter key
  category_label: string;        // Human-readable badge text
  cover: string;                 // Relative path: "covers/filename.jpg"
  keywords: string[];            // For search bar matching
  links: {
    amazon_ebook: string;        // mybook.to universal redirect
    amazon_paperback: string;    // mybook.to redirect
    google_ebook: string;        // play.google.com/store/books/details/...
    google_audio: string;        // play.google.com/store/audiobooks/details?id=...
    elevenreader: string;        // elevenreader.io/audiobooks/...
  }
}
```

---

## KEY JAVASCRIPT FUNCTIONS

### `loadBooks()` — async
- Tries `fetch('books_data.json')`, parses JSON
- On failure, uses `INLINE_DATA` constant
- Calls `renderBooks()` and `updateStats()`

### `renderBooks(books: Book[])` — sync
- Clears `#books-grid` innerHTML
- Maps books to card HTML template strings
- Injects via innerHTML
- Shows `#no-results` if array is empty

### `filterBooks(category: string)` — sync
- Updates `.filter-btn.active` class
- Sets `activeFilter` global
- Calls `applyFilters()`

### `applyFilters()` — sync
- Filters `allBooks` by `activeFilter` AND `searchQuery`
- Calls `renderBooks()` with result

### `openModal(bookId: number)` — sync
- Finds book in `allBooks` by id
- Populates `#modal-cover`, `#modal-title`, `#modal-hook`, `#modal-desc`
- Calls `buildBuyOptions(book.links)` → injects into `#buy-grid`
- Shows `#modal-overlay` by adding `.open` class

### `closeModal()` — sync
- Removes `.open` from `#modal-overlay`
- Restores `document.body.style.overflow`

---

## KEY HTML IDs (for DOM manipulation)

| ID | Element | Purpose |
|---|---|---|
| `#navbar` | `<nav>` | Gets `.scrolled` class on scroll |
| `#books-grid` | `<div>` | Target for renderBooks() injection |
| `#search-input` | `<input>` | Search text field |
| `#search-clear-btn` | `<button>` | Clear search, shown/hidden by JS |
| `#filter-tabs` | `<div>` | Container of filter buttons |
| `#modal-overlay` | `<div>` | Full-screen modal backdrop |
| `#buy-modal` | `<div>` | Modal content box |
| `#modal-cover` | `<img>` | Book cover in modal |
| `#modal-title` | `<h3>` | Book title in modal |
| `#modal-hook` | `<p>` | Hook quote in modal |
| `#modal-desc` | `<p>` | Description in modal |
| `#buy-grid` | `<div>` | Container for buy option links |
| `#no-results` | `<div>` | Shown when search has 0 results |
| `#stat-books` | `<span>` | Books count in stats bar |
| `#stat-audio` | `<span>` | Audiobooks count in stats bar |

---

## CSS DESIGN SYSTEM

### Color Palette (CSS Variables)
```
--bg-deep:      #080a10   (page background)
--gold:         #d4af37   (PRIMARY accent — all CTAs, highlights)
--gold-light:   #f0d060   (gradient top end)
--gold-dim:     rgba(212,175,55,0.15)  (hover backgrounds)
--text-bright:  #f5f0e8   (primary text)
--text-mid:     #a8a0b8   (secondary text)
--text-dim:     #5a5470   (muted/placeholder text)
--border-glow:  rgba(212,175,55,0.3)  (hover borders)
```

### Key CSS Patterns
- **Glassmorphism:** `background: rgba(255,255,255,0.06); backdrop-filter: blur(12px);`
- **Smooth hover lift:** `transform: translateY(-6px);` on `.book-card:hover`
- **Gold gradient button:** `background: linear-gradient(135deg, #c9a227, #e8c84a);`
- **Animated background:** `.orb` elements use `@keyframes drift` with blur filter

---

## BOOK COVER IMAGE SOURCE

Covers are downloaded from Google Play Books at high resolution:

```
https://play.google.com/books/publisher/content/images/frontcover/{GOOGLE_BOOK_ID}?fife=w1200-h1800
```

Where `GOOGLE_BOOK_ID` = the `id=` param from the Google Play Books URL.

**Example:**
- Google Play URL: `https://play.google.com/store/books/details/...?id=QvkZEgAAQBAJ`
- Cover download URL: `https://play.google.com/books/publisher/content/images/frontcover/QvkZEgAAQBAJ?fife=w1200-h1800`

**PowerShell to download:**
```powershell
$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
Invoke-WebRequest -Uri "COVER_URL" -Headers $headers -OutFile "covers\book_name.jpg"
```

---

## AUTHOR STORE LINKS

| Platform | URL |
|---|---|
| Amazon Author Store | https://www.amazon.com/stores/Tarun-Mankar/author/B0BTBLH2SN |
| Google Play Books | https://play.google.com/store/search?q=Tarun+Mankar&c=books |
| ElevenReader Author Hub | https://elevenreader.io/authors/tarun-mankar-audiobooks/i0rp0wAezs9Jt1lGd2un |

---

## HOW TO ADD A NEW BOOK (AI TASK STEPS)

When the user says "add Book 5" or "nai book add karo":

**Step 1:** Download cover image
```powershell
$headers = @{ "User-Agent" = "Mozilla/5.0" }
Invoke-WebRequest -Uri "https://play.google.com/books/publisher/content/images/frontcover/{ID}?fife=w1200-h1800" -Headers $headers -OutFile "d:\my-apps\The-Somatic-Library\covers\new_book.jpg"
```

**Step 2:** Edit `books_data.json` — append new book object to `"books"` array

**Step 3:** Edit `app.js` — append the SAME object to `INLINE_DATA.books` array

**Step 4:** If new category needed, add filter button to `index.html` in `#filter-tabs`

---

## DEPLOYMENT

```bash
# Firebase Hosting
firebase deploy --only hosting

# GitHub Pages
git add . && git commit -m "Update site" && git push

# Netlify drag & drop: netlify.com → drag folder
# Vercel: npx vercel deploy
```

No build needed. Upload folder as-is.

---

## WHAT NOT TO DO

- ❌ Don't add a backend/API
- ❌ Don't add a database
- ❌ Don't add authentication
- ❌ Don't minify/bundle files (keep readable for easy editing)
- ❌ Don't use external CSS frameworks
- ❌ Don't change the `file://` fallback mechanism
- ❌ Don't remove element IDs (used for testing and automation)
