# Changelog

All notable changes to Arch Creator are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The `## [Unreleased]` section is what the next release ships; each published
release gets its own `## [x.y.z]` section. The release workflow reads this file
to populate the release notes.

## [Unreleased]

## [2.5.0] - 2026-09-02

**FINALITY — FIRST SLICE. The first cut of the endgame: bespoke magic, a real file system, and macOS back on the mirror.**

### macOS Support Restored
- **macOS builds are back** — the release workflow now builds Windows + macOS (app + DMG) in parallel and publishes both to the mirror with per-platform `latest.json` again.
- **Windows-only dep gated** — the `windows` crate (`0.61`, `Win32_Globalization`/`Win32_System_Com`/`Win32_Foundation`) is now `cfg(target_os = "windows")` only, so it never compiles into a mac build. The `windows` crate was aligned to `0.61` for Tauri windows compatibility.
- **Spellcheck gated** — `spellcheck::spellcheck` is `#[cfg(target_os = "windows")]` in the invoke handler; mac builds skip the Windows `ISpellCheckerFactory` COM module entirely.

### Arcane & Cultivation — Power Reborn
- **Hall of Power** — `power` category now opens the **Power Pedestal** (a pedestal environment) instead of the old wizard. Pick a system type; locked types show as unavailable. Future systems (divine, primal, …) branch here.
- **Arcane (sigil circles + grimoire)** — the first built system: each Arcane entity holds **sigils** (composed spells = concentric `SigilRing`s + `SigilRune`s + `SigilNode`s + color/history/incantation/notes + optional `schoolId`) and **schools** (fire, wind, blood … — shared sigil `template`, color, `info` lore pages, `memberLabel`). Full `ArcaneSystemData` + `GrimoireBuilder`/`SigilBuilder`/`SchoolEditor` + `ArcaneCabinet` with `GrimoireGraphic`/`SigilGraphic` and `ArcaneSealIntro` / `ArcaneIntro` (seal/ignite climax replaces the old Power reactor). `powerTypes.ts` + `arcaneRunes.ts` stroke alphabet (kenaz/sowilo/laguz/eihwaz/ansuz/mannaz …).
- **Cultivation (realm ladder)** — the second built system: a sacred-mountain ladder of `CultivationRealm`s (sub-stages, lifespan, breakthrough, abilities, tribulation gate, `reached`), plus `CultivationRoot` (element/speed/quality), `CultivationPhysique`, `CultivationTechnique` (kind/tier/element/realm gate), `CultivationPill` (grade/recipe), `CultivationSect` (rank/holdings/doctrine), `CultivationTribulation` (kind/severity/transition/survival). `CultivationBuilder` + `RealmMountain` graphic + `CultivationIntro` (`Ascend` climax).
- **Removed legacy Power stack** — deleted `PowerBuilder` (FluxReactor, PsionicWeb, MartialDojo, DivineHalo, GenericSystemMark, ArcaneRitual, etc.), `PowerCabinet`/`PowerWizard`/`PowerIntro` and `data/power.ts`/`powerSuites.ts`. `isCultivationEntity()` discriminates (`realms` vs `sigils` field) and the intro/body route accordingly (`pow` → `ArcaneIntro`, `cult` → `CultivationIntro`).

### Projects Vault — Real File System
- **Bundle storage** — new Rust commands `projects_root` / `list_projects` / `create_project_bundle` / `read_project_bundle` / `write_project_bundle` / `reveal_project` (`Documents/Arch Creator/projects/*.arch/` with `project.json` index + `worlds/*.json` + `books/*.json`, `safe_project_name` sanitization, `project_path_is_safe` guard, `bundleVersion: 1`). `projectsVault.ts` frontend wrapper + `isManagedBundlePath` routing in `App.tsx` `handleSave`/`handleSaveAs` (creates a bundle via `createProjectBundle` when `meta.filePath` is missing; `Save As` now clones as `"<title> Copy.arch"` bundle).
- **Vault UI** — project picker now lists bundles from the projects folder (title/author/updatedAt sorted newest-first); `reveal_project` opens the bundle in Explorer/Finder/xdg-open.

### Relationships Graph — @xyflow/react
- **Multi-graph store** — new `WorldGraph` (`positions` + per-kind `character`/`faction`/`family`/`cross` `RelationshipEdge[]`, `cross` bridges kinds) with `defaultWorldGraph`/`normalizeWorldGraph` (legacy flat `relationships` migrates into `cross`). `World.graph` + `foldersByCategory` persisted per-world.
- **React Flow canvas** — `RelationshipsGraph` rebuilt on `@xyflow/react@^12.11.5` (new dep) with typed edge picker (`RelationshipTypeRegistry`: alliance/rivalry/family/romance/authority/trade/secret/custom → `pickerToRelationshipType`/`findRelationshipType`), pan/zoom, node pool, per-type pills, persisted positions. `RelationshipsGraph.css` overhaul.

### Characters — Parchment Folders & Dossier
- **Character groups** — bespoke parchment folder cards (`CharacterGroup` + `CharacterGroupPattern`: plain/dots/grid/diagonal/cross-dots/squares/crosshatch/chevron/stars/checker/zigzag/triangles/sunburst/waves/scales, 8 `CHARACTER_GROUP_PRESETS`: parchment/royal/forest/ember/ocean/shadow/rose/sand) with `World.characterGroups` + `WorldFoldersByCategory` per-category folders (replaces localStorage) + `characterGroups.ts` data. `CharacterCabinet` now groups by folder-card with pattern/icon/accent theming.
- **Dossier rework** — `CharacterEditor` replaced the 4-chapter hub (Identity/Profile/History/Spellbook + hero resize) with a schema-driven dossier: `characterTemplates.ts` (`CharacterDossierTemplate`/`CharacterAspectDef`/`CharacterSectionDef`, `DEFAULT_CHARACTER_TEMPLATE_ID`, `readCharacterTemplates`/`saveCharacterTemplate`/`readCharacterAspectValue`/`writeCharacterAspectValue`/`addAspect`), `DossierRichText` (prose editor), `ArchTagPicker` + `ArchSelect`, portrait `square`|`circle` crop, `species`/`country`/`language`/`mbti`/`traits`/`tags`/`familyId`/`groupId`/`dossierValues`/`dossierTemplateId` + `STATUS_OPTIONS`/`ROLE_OPTIONS` + relationships picker (`PICKER_TYPES`) + import/export + per-character accent.
- **Spellbook types kept** — `SpellbookAttribute`/`CharacterAbility`/`SkillTreeNode`/`SkillTreeEdge` + `assignedPowerSystems` stay; now driven by Arcane/Cultivation entities.

### App, Persistence & Polish
- **Global autosave** — `App.tsx` now autosaves on any `worlds`/`books` mutation (not just manuscript idle): 1500 ms debounce + `beforeunload` flush via `dirtyRef`/`worldsRef`/`booksRef`, trailing queue in `autosave.ts` (`pendingWhileInFlight` + `cooldownRetryTimer`, no edit dropped within the 10 s cooldown, `scheduleTrailing` flush). `forceAutosave` + `handleSave`/`handleSaveAs` now `await saveProjectToLocal` after disk write.
- **Demo mode** — `#demo` hash now forces `loadingStyle="world"` + `loading=true` (ignores stored skip), seeds an Arcane demo world ("The Amber Vein" — Hearth school, Ward of Slumber/Lens of Truth sigils, Grimoire pages) + "Amber Hollow"/"Kael" + a `Tidefall` demo `Book` (`worldId` linked, `setActiveWritingBookId`), and skips the first-run tour (`markTourSeen`).
- **Manuscript** — `StatusBar`/`ManuscriptView` polish (word counts + save state), `Choose folder` now uses native dialog where available.

### Fixes
- Opencode V1 `postinstall` stub (`opencode-ai@1.18.26` 479-byte placeholder → 179 MB) — now runs `node postinstall.mjs` so `opencode --version` works on Windows x64; `opencode2` service stayed healthy (`0.0.0-beta-17595` at `127.0.0.1:49374`).

## [2.4.2] - 2026-08-29

**Licensing is live — upgrade in-app, activate automatically, and get macOS builds on the mirror.**

### Licensing (Freemius)
- **In-app Upgrade** — the plan dialog opens the Freemius checkout right in the app. Pick a plan (Keystone, Quill, or the Arch bundle), enter your email, and continue to payment without leaving the window.
- **Automatic activation** — after a successful purchase the app activates your license for you via a Cloudflare Worker that resolves the key server-side (the secret key never ships in the app). No long key to type; a celebration intro plays when your license lands.
- **Manual activation + restore** — paste a key you already own in the Upgrade dialog or restore it from Settings; the face card shows your plan.
- **Free-tier gates** — worldbuilding items, characters, and books respect the free limits and prompt the Upgrade dialog when you hit them.
- **Bundle plan** — one Arch purchase unlocks both Keystone and Quill.

### Releases & installers
- **macOS builds** — the release workflow now builds Windows (NSIS) and macOS (app + DMG) installers in parallel and publishes both to the mirror with a per-platform `latest.json`.

### Fixes
- The release notes are generated from the CHANGELOG again on the mirror (they regressed to a placeholder in the previous pipeline change).

## [2.4.1] - 2026-08-28

**Alternates arrive — crack a category open to find a hidden world.**

### Alternates
- **Alternates** — long-press a category pill to crack it open in place (shake + crack lines + flash) and reveal a hidden **alternate** category. The pill morphs into the alternate and its icon carries a shifting hue so it reads as separate. Click the morphed pill to jump back.
- **Relationships graph** — the first alternate: a full canvas board (bigger than the plot board) where you drag world entities + characters as nodes and connect them with typed edges — Alliance, Rivalry, Family, Romance, Authority, Trade, Secret, Custom — with a relationship-type picker, pan/zoom, and a node pool.
- **`World.relationships`** — edges persist in the project file (optional, backfilled).

### Phenomena
- **Phenomena category** — a new Worldbuilding tab for the strange events and world rules that shape your setting: a custom **Orrery builder** (resonance mechanic, trigger-type emblems, zoomable hero), the "Watcher's Seance" tab intro, and the **Awaken** climax intro.
- **Trigger glyphs** — the five trigger types (Calendar Event, Threshold Reached, Entity Action, Environmental, Custom) now use custom icons instead of emoji.
- **Ghost intro sound** — a new recorded clip plays on the Phenomena tab intro.

### Polish
- **Editor formatting** — the page editor now renders rich typography (serif, headings, blockquotes, lists) and the format toolbar lights up on hover/focus, matching the other builders.
- **Panel borders + divider** — the Phenomena trigger card and ledger pages got the bordered, accent-tinted treatment with a divider between the trigger group and the condition fields.

### Cleanup
- Removed the legacy `FamilyRelation`/`Connection` types and the CharacterEditor "Relationships coming soon" placeholder — the new graph is the single source of truth.

## [2.4.0] - 2026-08-20

**PRE-RELEASE — bring your world in: Obsidian & Scrivener imports, smarter Worldbuilding, and a fresh voice for your creations.**

### Importing
- **Obsidian vault import** — pull a vault folder in and notes auto-sort into Characters, Worldbuilding categories, or Manuscript chapters (by content), with a preview to correct any misfires. Frontmatter is read then stripped; wiki-links are removed.
- **Scrivener project import** — bring a `.scriv` project in: the Draft becomes your Manuscript (in binder order, with folders as acts/sections), Research becomes Worldbuilding entities (auto-sorted, with a preview), and the Scrivener Trash lands in Arch's Trash. Notes/comments/snapshots are skipped.
- **Themed folder picker** — the Obsidian/Scrivener "choose folder" step now uses the native Windows folder dialog with an in-app picker confirmation, replacing the browser-style upload bar.

### Worldbuilding
- **Save Template** — capture the field/page *structure* of any entry (names + order, including your custom pages) as a reusable template, per category. A floating Templates control sits in the cabinet and inside every builder; create a new entry from a template and it opens the native builder pre-filled — no more retyping your custom layout every time.
- **Folders everywhere** — every grouped category can create **New Folder**, and each entry has a "move to folder" control so you can actually reorganize your entries into cabinets. Empty folders now render, and the add button always shows (even when a category is empty).
- **Factions rework** — the detail panels (Identity, Charter, Minutes, Member) now render in-flow beneath the crest instead of floating as popups; click the table's outer rim (founding/charter), center (identity), or a seat to switch what's shown.
- **Fauna & Flora: Races** — a new **Races** pill and full builder (homeland, lifespan, physique, society, culture, magic affinity, relations) with its own animated race-herald crest.
- Restored add buttons across Items, Religion, Language, and Lore; removed duplicate add buttons on Families and Factions.

### Under the hood
- New look: updated app icons (logo refresh).
- Native folder reading via `tauri-plugin-fs` for imports.

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
