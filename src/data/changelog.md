# Changelog

All notable changes to Arch Creator are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The `## [Unreleased]` section is what the next release ships; each published
release gets its own `## [x.y.z]` section. The release workflow reads this file
to populate the release notes.

## [Unreleased]

## [2.3.1] - 2026-08-15

**THE QUILL REBORN — the assistant returns, quiet and useful — plus a
compiled Arch Studio.**

### QUILL
- **On-demand analysis.** Quill no longer watches every keystroke — it
  analyzes when a chapter opens and via the **Analyze** button, so it can
  never stall the editor. Continuity, prose-craft, and spelling all flow
  through the same marks, tooltips, and pane.
- **Continuity name matcher returns** — misspelled character and world
  names are caught again (3-letter names, aliases, length-bucketed scan).
- **New Editor hat, engine-free:** hand-written, fiction-respecting prose
  rules — repeated words in a window, “said” overuse across dialogue
  tags, unclosed quotes — with filter-words and passive-voice opt-ins.
  No dictionaries, no WASM, and fantasy names are never flagged.
- **Native OS spellcheck in the tooltips:** a Rust bridge to the Windows
  spell checker routes misspellings + OS-dictionary suggestions into
  Quill's fix tooltips. Project names/aliases + your custom dictionary are
  fed in, so fantasy words stay quiet. Now checked **word-by-word** — no
  phantom word-joins across paragraph breaks, and the squiggles sit
  exactly on the flagged text.
- **Add to dictionary** — a tooltip button that adds a word to your custom
  dictionary so the OS spellchecker never flags it again. The native
  Chromium red squiggles are disabled — Quill's marks are the one
  spellchecker, fully under your control.
- The tooltip's blur backdrop was dropped for a solid background.

### ARCH STUDIO
- **Smart quotes** — curly quotes as you type, with an **auto-pair** toggle
  (an opening quote inserts its close; typing the close key skips over it).
- **Chapter status** — Draft / Revising / Polished / Complete on every
  chapter: a color-coded dot in the binder (click to cycle) and a status
  badge in the editor.
- **Change font** — bundled webfonts (Lora · Source Sans 3 · JetBrains Mono)
  plus system stacks; the Ribbon font picker and Studio Settings show the
  active font and live-preview each family.
- **Find & replace** — a bar over the editor (Ribbon Find), case-insensitive
  matches with the active one scrolled into view, replace one / all.
- **Mention hover cards** — hovering a @mention shows a quick entity
  summary (status, occupations, overview) from the world bible.
- **Jump to a finding** — clicking a Quill issue in the pane scrolls the
  editor to the exact flagged span with a brief flash.
- **Compile & export** — a 4-step Compile wizard with a live paginated
  preview: Contents (title, author, cover, front/back matter) · Chapters
  (include/exclude) · Typography & page setup (A4/Letter/6×9/A5) · Export to
  **DOCX · EPUB · RTF**. The Compile button lives in the header above the
  ribbon.

### UPDATES
- **Silent updates:** on launch, an available update downloads, installs
  (quiet NSIS installer), and relaunches automatically — no dialog.
- **"What's new" on the next launch:** after an update, a panel shows the
  new version's changelog (themed celebration for curated releases, plain
  panel otherwise).
- The frameless titlebar stays visible above update/release overlays.

## [2.2.1] - 2026-08-14

**THE SMOOTH WRITE — stability and quiet.**

### STABILITY
- Killed the freeze that built up around the 3rd–4th tooltip fix:
  - Autosave no longer re-serializes + structured-clones the whole project
    on every idle pause — gated to at most one write per 10s, deferred to
    idle time, and never stacked.
  - Format-toolbar state queries (`queryCommandState`) are cached — they no
    longer stall the main thread on every selection change.
  - Prose persistence is a single HTML parse per edit instead of two.
  - Selection refresh and inline-mark rendering coalesce to one pass per
    animation frame.
- The custom cursor is gone from the desktop app — it desynced WebView2's
  pointer tracking (invisible cursor, dead hover/click, frozen panels). The
  native OS cursor rules now; the custom cursor remains in browser dev.

### QUILL
- Removed the offline grammar/spell engine (Harper) — inaccurate on stylized
  fiction and the heaviest component. Live analysis is paused and the pane
  reads "All clear"; **@mention** chips keep working.
- Tooltip overhaul: pickable suggestion rows with a before → after diff,
  per-hat icons, keyboard controls (↑/↓ pick · ↵ apply · Esc), and flip-above
  positioning near the viewport bottom.
- Name matcher: 3-letter names now caught, character aliases matched, and the
  scan is length-bucketed so big worlds don't stutter.

## [2.2.0] - 2026-08-14

**THE IN-WORLD CALENDAR — time becomes a place.**

### CALENDAR
- **Guided setup** builds each world its own reckoning of time — presets
  (Standard · Gregorian · Lunar · Solar/13-month · Elven · Long Count),
  name, climate, months, weekdays, seasons, eras, and moons.
- A **paper month calendar** fills the page: era band, day cells with
  moon-phase and weather glyphs, and event chips; a day rail shows the
  day's details.
- **Simulated weather** — seeded by world and day, shaped by climate,
  season, and moons — with per-day **overrides** for plot-critical days.
- Eras and year math anchored properly: a world whose era begins at
  year 2000 opens its calendar there.
- **Moons** with phases (New · Waxing · Full · Waning…) tint the night
  and nudge the weather.
- History entries are dated on the calendar and written as **paper
  chronicle pages** (date stamp, sections, image).

### PLOT BOARD MEETS CALENDAR
- **Place plot-board scenes on dates** — they auto-list on the calendar.
- Add events **from the plot board** via a grouped, searchable picker;
  linked entries carry a plot glyph and a "Linked to plot scene" banner.
- **Write a full history entry** straight from a placed scene.

### FOUNDATION
- Stays schema v2 — all additive fields, old `.arch` worlds load as-is.

## [2.1.0] - 2026-08-14

**THE UNIVERSE EXPANSION — worlds become living places.**

### WORLDS
- **World covers** — every universe gets themed cover art on the shelf.
- **World overview** — open a world to edit its description, see live
  stats (characters · entities · events · books · words), lore coverage,
  and jump straight into its Characters / Worldbuilding / History.
- **World-open intro** — a globe in the world's palette spins and zooms
  in as its name rises.
- **Connected worlds** — link universes together with relationship types
  (Allied · Connected · Shared origin · Multiverse · Conflict). Both
  directions show on the overview, and chips jump between worlds.

### FOUNDATION
- Release celebrations are now **per-major themed** (2.0 keeps its gold;
  future majors bring their own look); minor and patch updates keep the
  original prompt.
- Searchable **book → world picker**; cleaned-up world labels and copy.

### Fixed
- Redundant entity pill on world covers.
- Confusing history stat label (now "events").

## [2.0.0] - 2026-08-14

**THE WORLDS UPDATE — Arch Creator finally has universes.**

### WORLDS
- **Characters, worldbuilding, and history now live in a World — and every
  book is set in one.** Lore stops bleeding between stories. Finally.
- **CREATE WORLD** makes a brand-new book and its own universe in one move —
  or links the story into a world you already built.
- New **Worlds** view: forge, rename, delete, and open your universes. Series
  share one world.
- `.arch` projects upgrade to schema v2 automatically — existing worlds
  migrate into one linked universe, nothing lost.

### BOOKS REBORN
- The bookshelf is back, better: polished spines plus a **covers** view,
  per-book word and chapter stats, linked-world badges, and right-click
  Edit · Duplicate · Archive · Delete.
- The **New Project** dialog builds books with live spine/cover previews,
  15 genres, 8 themed palettes, and full color control.
- **Plot and history are per-book now** — your plan travels with the story.

### A DASHBOARD, NOT A SHELF
- Home is a real dashboard: greeting, word-goal donut, streaks, today's
  words, the bookshelf, and your activity heatmap in one scroll.
- Fresh installs get a proper landing — and the sidebar hides everything
  until your first book or world exists.

### YOUR SOUND, YOUR FILES
- Music and ambient loops now live in `Documents/Arch Creator/audio` as real
  files. **Add music** and **Add loop** import your own, removable tracks;
  the bundled calm tracks stay.
- Quill's @mention index and lore checks are scoped to the book you're
  writing in.

### Fixed
- Creating a book reliably opens Arch Studio (no more stuck on Home).
- Spine/cover previews and design swatches render correctly in the editor.
- The "open a book" empty state works and offers to create one.
- Linking a new book to an existing world from the Worlds view.

## [0.2.1] - 2026-08-14

### Added
- **Bottom pill player** — a floating pill at the bottom of the window with two
  features: a **Music player** (bundled calm tracks, seekable progress, volume,
  crossfades, loop-all/loop-one/shuffle) and an **Ambient mixer** that layers
  rain, fire, thunder, wind and more over the music, with one-tap scene presets
  (Rainy Night, Cozy Cabin, Storm, …). Built on a Web Audio mixing engine with
  smooth crossfades; music keeps playing as you move between views. Dropping
  audio files into `src/assets/audio/music/` or `src/assets/audio/ambient/`
  registers them automatically.
- **Animations settings section** — a master **Reduce motion** switch (defaults
  to your system setting) that silences every app animation and transition,
  plus quick toggles for the launch animation and the Worldbuilding intro
  moments.
- **Legal & Policies** — Settings now opens real documents: Terms of Service,
  Privacy Policy (POPIA-aligned, local-first), Open Source Licenses, and
  **Credits** with attribution for the bundled audio.

### Fixed
- Settings buttons that looked clickable but did nothing (Terms of Service,
  Privacy Policy) now open their documents.
- Settings toggle switches were unresponsive (Sound Effects, Disable cursor,
  Ambient effects, Intro on launch, Hide sidebar) — now fully clickable.
- Reduce motion no longer renders the theme ambient embers/glow/haze as bright
  blobs — they freeze at the intended intensity.

## [0.2.0] - 2026-08-13

### Added
- Arch Studio Home — a writing dashboard shown when no book is open: goal
  donut (with an adjustable word goal, default 80k), writing streak, today's
  word count, library stats, a 12-month activity heatmap, a continue shelf
  reusing the bookshelf spine designs, and a recent-sessions strip. Words are
  logged automatically as you write.
- Quill inline marks — Grammarly-style wavy underlines on grammar findings
  inside the chapter editor. Click a mark for the suggestion tooltip and Fix
  with a replacement, or Dismiss it for the session. Stored prose stays clean
  (marks are render-time only).

### Fixed
- The Quill suggestion tooltip (and @mention menu) could balloon into an
  invisible full-screen overlay that swallowed clicks and hid the cursor after
  a few uses — they are now anchored to the viewport so they always position
  and dismiss correctly.

## [0.1.9] - 2026-08-13

### Added
- Quill Settings — "The Mind": a wireframe-brain settings panel (each hat is
  a pulsing node that opens its own controls). Configure Harper's checks,
  name-matcher sensitivity, analysis cadence, and which faculties show.
- Cumulative changelog card in Settings listing every released version.

### Changed
- Binder redesigned as an editorial table of contents — roman chapter
  numerals, serif titles, word-count meta, folder section headers.
- Quill/Harper tuning: profanity lint disabled by default, name near-miss
  matching only flags capitalized tokens.

## [0.1.8] - 2026-08-13

### Added
- Trash folder in Arch Studio — deleted chapters, folders, and web pages go to
  the Trash instead of vanishing. Restore anything (back to its original
  location) or delete it forever; empty the Trash when done.
- View transitions — switching views fades and rises in with a spring settle.
- Micro-interactions — every button gets a subtle press-squash.

## [0.1.7] - 2026-08-13

### Changed
- The installed app executable is now named `Arch Creator.exe` (was
  `tauri-app.exe`).

## [0.1.6] - 2026-08-13

### Fixed
- Release builds: regenerated `Cargo.lock` against crates.io to resolve a
  stale dependency checksum that broke CI.

## [0.1.5] - 2026-08-13

### Fixed
- Release mirror now supports the v2 Windows installer updater artifact
  (`.exe`) when no legacy `.nsis.zip` bundle is produced.

## [0.1.4] - 2026-08-13

### Fixed
- Release pipeline: release notes now flow into the app update prompt
  correctly (the release-mirror step writes notes via a shell-safe heredoc).

## [0.1.3] - 2026-08-13

### Changed
- Releases now publish through the public `Arch-Creator-Releases` mirror so
  in-app updates work for everyone (the source repo stays private).

## [0.1.2] - 2026-08-13

### Added
- Patch notes: release notes now appear in the app — an "Update available"
  dialog with the version's changelog, and a "What's new" card in Settings
  for the current version.

## [0.1.1] - 2026-08-13

### Added
- Update system: in-app updater via GitHub Releases (`tauri-plugin-updater`).
- Auto-check on launch with a one-click "Update & restart" prompt.
- Live Updates card in Settings with download progress.
- Settings rework: single-column layout, sound/volume controls, accent tune,
  typography packs, manuscript paper skins, theme share codes.

### Changed
- Installer reverted to the stock Tauri NSIS build.

### Fixed
- Version tags now point at commits containing the version bump.
