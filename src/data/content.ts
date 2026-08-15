import type { IconType } from 'react-icons'
import {
  LuCalendarDays,
  LuBoxes,
  LuColumns2,
  LuPenTool,
  LuFeather,
  LuHardDrive,
  LuCompass,
  LuLayers,
  LuLock,
  LuGlobe,
  LuMail,
  LuGithub,
  LuArrowUpRight,
  LuShieldCheck,
  LuRefreshCw,
  LuDownload,
  LuSparkles,
  LuMap,
  LuGamepad2,
  LuGauge,
  LuRepeat,
  LuDatabase,
  LuTrendingUp,
} from 'react-icons/lu'

export const site = {
  name: 'Arch Studios',
  product: 'Arch-Creator',
  app: 'Arch Creator',
  tagline: 'Worlds, built to last.',
  email: 'hello@archstudios.dev',
  legalEmail: 'legal@archstudios.example',
  github: 'https://github.com/Skrol-C',
}

export const urls = {
  proPurchase: 'https://archstudios.dev/buy/pro',
  quillPurchase: 'https://archstudios.dev/buy/quill',
  releases: 'https://github.com/Skrol-C/Arch-Creator/releases',
  docs: 'https://github.com/Skrol-C/Arch-Creator',
}

export const navLeft: { label: string; to: string }[] = [
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
]

export const navRightLinks: { label: string; to: string }[] = [
  { label: 'Compare', to: '/pricing#compare' },
]

export const resourcesLabel = 'Resources'
export const resources: { label: string; to: string }[] = [
  { label: 'Changelog', to: '/changelog' },
  { label: 'Roadmap', to: '/roadmap' },
  { label: 'Legal', to: '/legal' },
]

export const navLinks: { label: string; to: string }[] = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Compare', to: '/pricing#compare' },
]

export const home = {
  hero: {
    badge: 'Free to start · Desktop · Offline',
    title: ['Worlds,', 'built to last.'],
    lede: 'Arch-Creator is the offline worldbuilding and writing app for storytellers. Worlds, characters, plot boards, and a manuscript that never leaves your device.',
    ctaPrimary: { label: 'Download free', to: '/pricing' },
    ctaSecondary: { label: 'Explore the app', to: '/features' },
  },
  pills: ['Free to start', 'One-time Keystone', 'Offline first', 'Windows', 'Your data stays yours'],
  modules: [
    {
      icon: LuGlobe,
      name: 'Worlds & Calendars',
      body: 'In-world calendars, seasons and weather that behave like your world, not a spreadsheet.',
    },
    {
      icon: LuColumns2,
      name: 'Plot Boards',
      body: 'Chapters, scenes and reveals arranged with the context that matters at your fingertips.',
    },
    {
      icon: LuBoxes,
      name: 'Worldbuilding',
      body: 'Ten rich categories of lore — from magic systems to maps — structured but never rigid.',
    },
    {
      icon: LuFeather,
      name: 'Quill',
      body: 'A writing assistant that reads your world and checks your draft against it.',
    },
  ],
  ethos: {
    kicker: 'The studio ethos',
    title: 'Survey. Converge. Lock.',
    lede: 'Every world starts as a survey — raw observation, fragments, half-formed ideas. We converge the pieces into a coherent whole. Then we lock, and commit to the craft. That rhythm runs through the app, and through the studio.',
  },
  quote: {
    text: 'A world is not the sum of its notes. It is the shape that holds them together — and that shape is built one careful, deliberate decision at a time.',
    author: 'Arch Studios',
  },
  cta: {
    title: 'Start free. Unlock Keystone when your world outgrows free.',
    lede: 'Download Arch-Creator free and feel the difference. When you are ready, unlock the full suite for a single, fair price — or add Quill, the continuity companion.',
    primary: { label: 'See pricing', to: '/pricing' },
  },
}

export const manuscript = {
  title: 'Arch Studio',
  meta: 'Chapter 1 · The Atrium Clock',
  excerpt: 'The brass clock in the Atrium tower had run slow for three days, and Kael noticed because no one else would. Ten minutes, then eleven — the city moved to its beat and never felt the drag. He pressed his palm flat against the copper face and felt, beneath the polished plate, something that had never been there before: a second mechanism, ticking in the dark.',
  stats: ['1,247 / 2,000 words', 'Scene 3 of 12', 'Session 312 words · 18 min', 'Streak 6 days'],
}

export const features = {
  header: {
    kicker: 'Features',
    title: 'Everything a world needs.',
    lede: 'Arch-Creator brings every piece of your story into one calm, offline home — from the first line of lore to the final page of the manuscript.',
  },
  grid: [
    {
      icon: LuCalendarDays,
      name: 'In-world calendars & weather',
      body: 'Custom calendars with weather and seasons that simulate your world. Write by its dates, not yours.',
    },
    {
      icon: LuBoxes,
      name: 'Ten worldbuilding categories',
      body: 'Magic systems, nations, maps, cultures, creatures and more — structured lore that stays connected.',
    },
    {
      icon: LuColumns2,
      name: 'Plot boards with context',
      body: 'Arrange chapters and scenes as boards where every card carries its characters, dates and intent.',
    },
    {
      icon: LuPenTool,
      name: 'Arch Studio writing',
      body: 'A long-form writing module with your world always at hand — characters, places, events, one panel away.',
    },
    {
      icon: LuFeather,
      name: 'Quill assistant',
      body: 'An optional continuity module that reads your world and flags contradictions before readers ever can.',
    },
    {
      icon: LuHardDrive,
      name: 'Offline-first .arch files',
      body: 'One portable file per world. No account, no cloud dependency — your work lives on your machine.',
    },
  ],
  blocks: [
    {
      icon: LuCalendarDays,
      name: 'Worlds & Calendars',
      body: 'Define your world\u2019s calendar — the length of its seasons, its festivals, its moon. Arch-Creator tracks weather and dates so your chapters land on the right day, and your world keeps its own time.',
      points: ['Custom calendars & festivals', 'Season and weather simulation', 'Date-aware chapters and scenes'],
      image: '/screenshots/calendar.png',
      alt: 'The in-world calendar grid in Arch-Creator',
    },
    {
      icon: LuBoxes,
      name: 'Worldbuilding, in depth',
      body: 'Ten categories of lore — nations, magic systems, cultures, maps, creatures, languages and more — each with templates you can bend to your vision. Everything links: a character knows a place, a place carries a history.',
      points: ['Ten structured categories', 'Bendable templates', 'Everything cross-linked'],
      image: '/screenshots/worldbuilding.png',
      alt: 'The worldbuilding cabinets in Arch-Creator',
    },
    {
      icon: LuColumns2,
      name: 'Plot Boards',
      body: 'Move the pieces of your story around like a board. Chapters and scenes become cards that carry their characters, dates and purpose — so a plot twist stays a twist until the page you intend.',
      points: ['Scene cards with full context', 'Timeline-aware arranging', 'Continuity at a glance'],
      image: '/screenshots/plot.png',
      alt: 'The plot board in Arch-Creator',
    },
    {
      icon: LuPenTool,
      name: 'Arch Studio',
      body: 'A long-form writing module built into the world it writes about. Characters, places and events stay one panel away while you draft — and the manuscript never leaves your device.',
      points: ['Manuscript with world panels', 'Word goals & session stats', 'Export to .docx · .epub · .pdf'],
      image: '/screenshots/studio.png',
      alt: 'The Arch Studio writing editor in Arch-Creator',
    },
    {
      icon: LuFeather,
      name: 'Quill — the continuity companion',
      body: 'A separate add-on module that reads your world and your draft together. Quill checks names, dates and facts against your lore and flags the small contradictions that break immersion.',
      points: ['Reads world and draft together', 'Flags contradictions early', 'Standalone add-on for $30'],
      image: '/screenshots/quill-window.png',
      alt: 'The Quill continuity pane in Arch-Creator',
    },
    {
      icon: LuHardDrive,
      name: 'One file, yours forever',
      body: 'Each world is a single portable .arch file. Back it up, carry it, keep it — no account, no subscription to maintain, no cloud that decides what happens to your work.',
      points: ['Portable .arch format', 'No account required', 'In-app updates when you want them'],
      image: '/screenshots/shelf.png',
      alt: 'The Arch-Creator home shelf with your books and worlds',
    },
  ],
}

export const pricing = {
  header: {
    kicker: 'Pricing & Download',
    title: 'Fair, one-time, yours.',
    lede: 'No subscriptions to feed. Download free, and only pay when Arch-Creator has earned its place in your process.',
  },
  tiers: [
    {
      name: 'Free',
      price: '$0',
      per: 'forever',
      blurb: 'The full experience with fair limits — one world, 20,000 words, unlimited plots.',
      highlights: ['1 world', '20k-word manuscript', 'All 10 categories'],
      cta: { label: 'Download free', href: 'releases' },
    },
    {
      name: 'Keystone',
      price: '$60',
      per: 'one-time',
      blurb: 'Unlimited worlds, characters and lore — every limit removed, forever.',
      highlights: ['Unlimited everything', 'Advanced calendars', 'Fight Builder'],
      cta: { label: 'Unlock Keystone', href: 'proPurchase' },
      highlight: true,
    },
    {
      name: 'Quill',
      price: '$30',
      per: 'add-on',
      blurb: 'The full continuity assistant — all five hats, works with Free or Keystone.',
      highlights: ['Five hats', 'Continuity & story-state', 'Analyst & narrative'],
      cta: { label: 'Add Quill', href: 'quillPurchase' },
    },
  ],
  table: {
    title: 'Free vs Keystone, side by side',
    lede: 'The same app either way — Keystone simply removes every limit and unlocks the deeper tools.',
    groups: [
      {
        name: 'Worlds & lore',
        rows: [
          { label: 'Worlds', free: '1', pro: 'Unlimited' },
          { label: 'Characters', free: '10 per world', pro: 'Unlimited' },
          { label: 'Worldbuilding categories', free: 'All 10', pro: 'All 10' },
          { label: 'Worldbuilding items', free: '25 per world', pro: 'Unlimited' },
        ],
      },
      {
        name: 'Calendars',
        rows: [
          {
            label: 'In-world calendars & weather',
            free: 'Basic — grid & presets',
            pro: 'Advanced builder — eras, moons, seasons, weather',
          },
        ],
      },
      {
        name: 'Plot',
        rows: [
          { label: 'Plot boards', free: 'Unlimited', pro: 'Unlimited' },
          { label: 'Fight Builder', free: '—', pro: 'Included' },
        ],
      },
      {
        name: 'Writing · Arch Studio',
        rows: [
          { label: 'Manuscript', free: '20,000-word cap', pro: 'Unlimited' },
          { label: 'Word goals · session stats · @mentions', free: 'Included', pro: 'Included' },
          { label: 'Zen mode · version history', free: '—', pro: 'Included' },
          { label: 'Export .docx · .epub · .pdf', free: 'Included', pro: 'Included' },
        ],
      },
      {
        name: 'Quill',
        rows: [
          { label: 'Basic grammar & spellcheck', free: 'Included', pro: 'Included' },
          { label: 'Full Quill — the five hats', free: 'Add-on · $30', pro: 'Add-on · $30' },
        ],
      },
      {
        name: 'Themes & platform',
        rows: [
          { label: 'Themes', free: 'Default + V-White', pro: 'All themes + custom builder' },
          { label: 'Offline .arch files', free: 'Included', pro: 'Included' },
          { label: 'In-app updates', free: 'Included', pro: 'Included' },
        ],
      },
    ],
  },
  free: {
    kicker: 'The free plan',
    title: 'Start free — exactly what you get',
    lede: 'The whole app, no card and no trial clock. You upgrade only when your world outgrows it.',
    items: [
      'One world, built your way',
      'All 10 worldbuilding categories plus characters — up to 25 lore items and 10 characters',
      'Unlimited plot boards — plan as many stories as you like',
      'Arch Studio writing with a 20,000-word manuscript',
      'Basic in-world calendars — the grid and presets',
      'Quill basics — grammar and spellcheck as you write',
      'Default and V-White themes',
      'Export to .docx, .epub and .pdf',
      'Offline .arch files — one portable file per world, yours forever',
      'In-app updates, free',
    ],
    cta: { label: 'Download free', href: 'releases' },
  },
  pro: {
    kicker: 'The Keystone plan',
    name: 'Keystone',
    price: '$60',
    per: 'one-time',
    title: 'Unlimited, unhindered.',
    lede: 'One payment. Every limit gone, forever — and every future module included.',
    items: [
      'Unlimited worlds and books',
      'Unlimited characters and worldbuilding items, across all 10 categories',
      'Advanced calendar builder — eras, moons, seasons and weather',
      'Fight Builder for fight choreography',
      'Zen mode, version history and the full Arch Studio',
      'Every theme, plus the custom theme builder',
      'Priority support',
    ],
    cta: { label: 'Unlock Keystone', href: 'proPurchase' },
  },
  quill: {
    kicker: 'The assistant',
    title: 'Quill — the second reader.',
    lede: 'A rule-based writing assistant that reads your whole world and your draft together. Not an AI — an eagle-eyed, offline editor who knows your world and never forgets.',
    quote:
      'The writer\u2019s second reader, fact-checker, and continuity editor — watching for the small contradictions that break immersion.',
    hats: [
      {
        icon: LuPenTool,
        name: 'Editor',
        body: 'Prose craft — repetition, dialogue, quotes, filter words, passive voice, spelling and readability.',
      },
      {
        icon: LuRepeat,
        name: 'Continuity Keeper',
        body: 'Cross-references your prose against the world bible — misspelled names, character consistency, terminology.',
      },
      {
        icon: LuDatabase,
        name: 'Story-State Tracker',
        body: 'Tracks presence, possession and timeline — the dropped weapon that gets used again, the dead who speak.',
      },
      {
        icon: LuGauge,
        name: 'Analyst',
        body: 'Understands the manuscript — pacing, POV, per-chapter stats and coverage.',
      },
      {
        icon: LuTrendingUp,
        name: 'Narrative Engine',
        body: 'Pacing and tension — cliffhangers, dead zones, exposition density, Chekhov\u2019s gun.',
      },
    ],
    learns: [
      'Reads your world bible — every character, item, place and rule becomes a fact Quill knows.',
      '@mentions log events into a scene timeline — who was where, with what, doing what.',
      'A living world-model that grows as you write, entirely on your device.',
    ],
    today: [
      'Continuity name matcher — catches near-miss spellings of your names and aliases',
      'Editor rules — repetition, dialogue, quotes, filter words, passive voice',
      'Readability gauge and per-chapter stats',
      'OS spellcheck with your own custom dictionary',
      'Click-to-jump findings and inline marks in the prose',
    ],
    horizon: [
      'Harper offline grammar engine',
      'Story-state tracking — possession, presence, shouldn\u2019t-be-here',
      'Dialogue fingerprinting and voice drift',
      'POV leakage detection',
      'Pacing, cliffhanger and Chekhov monitors',
      'Explicit [RULE:] constraints from your world bible',
    ],
    note: 'Basic grammar and spellcheck ship with every copy of Arch-Creator. Unlock the full Quill — all five hats — as a one-time add-on.',
    price: '$30',
    cta: { label: 'Add Quill', href: 'quillPurchase' },
  },
  compare: {
    kicker: 'Compare',
    title: 'Own it once. Every other tool bills you forever.',
    lede: 'We priced Arch-Creator the way we\u2019d want it priced — a free start, a fair one-time Keystone, and no subscription to feed. Here\u2019s how that stacks up against the field.',
    tools: [
      { name: 'Arch-Creator', model: 'Free + one-time', price: '$60 Keystone · $30 Quill', note: 'Worldbuilding + writing', highlight: true },
      { name: 'Scrivener', model: 'One-time', price: '~$60', note: 'Manuscript tool' },
      { name: 'ForgeTales', model: 'Free + one-time', price: 'Founder plan', note: 'Worldbuilding' },
      { name: 'Plottr', model: 'One-time or sub', price: '~$15/mo or ~$199', note: 'Outlining' },
      { name: 'World Anvil', model: 'Subscription', price: '~$5\u201312/mo', note: 'Web-based' },
      { name: 'Campfire', model: 'Subscription', price: '~$12.50/mo', note: 'Modular' },
      { name: 'NovelCrafter', model: 'Subscription', price: '$4\u201320/mo', note: 'AI metering extra' },
    ],
    costs: {
      title: 'Total cost over time',
      lede: 'What you actually pay as the years add up.',
      years: [1, 3, 5],
      rows: [
        { name: 'Arch-Creator Keystone', values: [60, 60, 60], highlight: true },
        { name: 'Scrivener', values: [60, 60, 60] },
        { name: 'Plottr lifetime', values: [199, 199, 199] },
        { name: 'World Anvil · Sage', values: [105, 315, 525] },
        { name: 'Campfire · all modules', values: [125, 375, 625] },
        { name: 'NovelCrafter · Artisan', values: [168, 504, 840] },
      ],
    },
    matrix: {
      title: 'Beyond the price tag',
      lede: 'How the tools compare once you look past the bill.',
      columns: ['Arch-Creator', 'Scrivener', 'ForgeTales', 'Plottr', 'World Anvil', 'Campfire', 'NovelCrafter'],
      rows: [
        { label: 'No subscription', values: ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no'] },
        { label: 'Offline desktop app', values: ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no'] },
        { label: 'Free tier to start', values: ['yes', 'no', 'yes', 'no', 'yes', 'yes', 'no'] },
        { label: 'Worldbuilding + writing in one', values: ['yes', 'no', 'yes', 'no', 'no', 'yes', 'no'] },
        { label: 'Continuity assistant', values: ['yes', 'no', 'no', 'no', 'no', 'no', 'no'] },
        { label: 'Data stays on your device', values: ['yes', 'yes', 'yes', 'yes', 'no', 'no', 'no'] },
        { label: 'Export .docx / .epub / .pdf', values: ['yes', 'yes', 'yes', 'no', 'no', 'yes', 'yes'] },
      ],
    },
    why: 'We are tired of renting the tools we love. Your world is yours — the software you build it in should be too.',
    footnote: 'Prices checked August 2026. Competitor pricing is indicative and may change; please verify on the respective sites.',
  },
  requirements: [
    'Windows 10 or 11 (64-bit)',
    '4 GB RAM recommended',
    '~150 MB free space',
    'No internet required after install',
  ],
  notes: {
    title: 'How purchasing works',
    items: [
      'Payment is processed by Lemon Squeezy — secure, instant, no account needed beyond your email.',
      'Your license unlocks within Arch-Creator after purchase. No dongles, no signing into clouds.',
      'Updates are delivered in-app; your worlds remain offline .arch files regardless.',
    ],
  },
}

export const roadmap = {
  header: {
    kicker: 'Roadmap',
    title: 'The road ahead.',
    lede: 'Where Arch-Creator has been, what we are building now, and where the road leads. We ship in the open — this is the map.',
  },
  tracks: [
    { label: 'Quill', pct: 45 },
    { label: 'Worldbuilding', pct: 70 },
    { label: 'Platform', pct: 35 },
  ],
  phases: [
    {
      num: '01',
      name: 'Shipped',
      chip: 'In v2.3.1',
      tone: 'shipped',
      line: 'What Arch-Creator already is.',
      items: [
        {
          icon: LuFeather,
          title: 'Quill reborn',
          body: 'On-demand analysis, the continuity name matcher, Editor rules, OS spellcheck and a custom dictionary.',
          tags: ['Quill'],
        },
        {
          icon: LuPenTool,
          title: 'Compiled Arch Studio',
          body: 'Export to DOCX, EPUB and RTF, smart quotes, find & replace, chapter status and mention cards.',
          tags: ['Arch Studio'],
        },
        {
          icon: LuRefreshCw,
          title: 'Silent updates',
          body: 'Updates download, install and relaunch quietly — with a \u201cWhat\u2019s new\u201d on the next launch.',
          tags: ['Platform'],
        },
      ],
    },
    {
      num: '02',
      name: 'Next',
      chip: 'In the workshop',
      tone: 'next',
      line: 'What we are building right now.',
      items: [
        {
          icon: LuShieldCheck,
          title: 'Licensing launch',
          body: 'Lemon Squeezy checkout for Keystone and Quill — one-time, no subscription, no account.',
          tags: ['Platform'],
        },
        {
          icon: LuFeather,
          title: 'Quill grows',
          body: 'Harper offline grammar, the Continuity Keeper and the Story-State Tracker.',
          tags: ['Quill'],
        },
        {
          icon: LuMap,
          title: 'Map creation',
          body: 'Draw and map your world — places, regions, and the spaces between them.',
          tags: ['Worldbuilding'],
        },
        {
          icon: LuGamepad2,
          title: 'GM Mode',
          body: 'Run campaigns at the table — track secrets, and reveal them when the time comes.',
          tags: ['Platform'],
        },
      ],
    },
    {
      num: '03',
      name: 'Later',
      chip: 'On the horizon',
      tone: 'later',
      line: 'Where the road leads.',
      items: [
        {
          icon: LuGauge,
          title: 'Analyst & Narrative Engine',
          body: 'Pacing, POV, cliffhanger linters, dead zones and Chekhov monitors.',
          tags: ['Quill'],
        },
        {
          icon: LuLayers,
          title: 'Arc Builder & Timeline',
          body: 'Story arcs and a full campaign timeline inside Plot.',
          tags: ['Plot'],
        },
        {
          icon: LuRefreshCw,
          title: 'Syncing',
          body: 'Optional, opt-in sync of your worlds between devices — offline-first stays.',
          tags: ['Platform'],
        },
        {
          icon: LuCompass,
          title: 'Rules & deeper lore',
          body: 'Explicit [RULE:] constraints from your world bible, and a Rust NLP parser.',
          tags: ['Quill', 'Worldbuilding'],
        },
        {
          icon: LuGlobe,
          title: 'More themes & platforms',
          body: 'New themes and packs, and Arch-Creator on more operating systems.',
          tags: ['Platform'],
        },
      ],
    },
  ],
}

export const changelog = {
  header: {
    kicker: 'Changelog',
    title: 'Every release, accounted for.',
    lede: 'All notable changes to Arch-Creator, in the open. Latest first — old releases fold up so the newest stays in focus.',
  },
}

export const legal = {
  header: {
    kicker: 'Legal',
    title: 'The fine print, in plain English.',
    lede: 'Terms, privacy, open-source licenses and credits for Arch-Creator.',
  },
  meta: {
    operator: 'Arch Studios',
    app: 'Arch Creator',
    email: 'legal@archstudios.example',
    effective: 'August 14, 2026',
  },
  docs: [
    { id: 'terms', label: 'Terms', title: 'Terms of Service' },
    { id: 'privacy', label: 'Privacy', title: 'Privacy Policy' },
    { id: 'licenses', label: 'Licenses', title: 'Open-Source Licenses' },
    { id: 'credits', label: 'Credits', title: 'Credits & Attribution' },
  ],
  terms: {
    intro:
      'These Terms of Service (\u201cTerms\u201d) govern your use of **Arch Creator**, the desktop creative-writing application published by **Arch Studios** (\u201cwe\u201d, \u201cus\u201d). By installing or using the application you agree to these Terms. These Terms are concluded electronically in accordance with the Electronic Communications and Transactions Act 25 of 2002, and they govern all access to and use of the application.',
    sections: [
      {
        title: '1 · The software license',
        body: [
          '**Arch Creator** is proprietary software owned by **Arch Studios**. We grant you a personal, non-exclusive, non-transferable, revocable licence to install and use the application for your own creative writing, on devices you own or control, subject to these Terms and the proprietary software licence that accompanies the application.',
          'Except as permitted by law, you may not copy, modify, reverse-engineer, decompile, rent, sell, sublicense, or redistribute the application or its source code, or use it to build a competing product.',
        ],
      },
      {
        title: '2 · Accounts & licensing (future)',
        body: [
          'As of this version, the application does **not** require an account and does not collect an email address. We may later introduce an account- or email-based licensing system to administer licences and activations.',
          'If we do, your licence key may be tied to your account and email address. You will be responsible for keeping your account credentials and licence key secure, and you agree to notify us promptly if you believe they have been compromised. Any such system will be introduced with an updated Privacy Policy and clear notice inside the application.',
        ],
      },
      {
        title: '3 · Your content',
        body: [
          'Everything you write in **Arch Creator** — your stories, characters, worlds, notes, and projects — belongs to **you**. We do not claim ownership of your content and we do not read, store, or transmit it (see the Privacy Policy). You are responsible for the lawfulness of the content you create, and you may not use the application to produce unlawful, infringing, or harmful material.',
        ],
      },
      {
        title: '4 · Your imported audio',
        body: [
          'You may import audio files (music and ambient loops) into the application. Imported audio is copied to a folder on your own device and is never uploaded to us. You retain ownership of the files you import, and **you are responsible for making sure you have the right to use them** — for example, that any music you add is your own or is licensed for your use. We do not review, endorse, or claim any rights in audio you import.',
        ],
      },
      {
        title: '5 · Consumer protection',
        body: [
          'Nothing in these Terms limits any rights you have under the Consumer Protection Act 68 of 2008 (\u201cCPA\u201d) that cannot be lawfully excluded or limited. In particular:',
        ],
        list: [
          'Your statutory consumer rights remain fully intact, even where these Terms are silent.',
          'Because the application is supplied as a digital download, the CPA\u2019s cooling-off provisions for direct marketing (section 16) do not generally apply; once a digital product is delivered you may not cancel for a refund simply because you changed your mind.',
          'If the application is defective, you are entitled to have the defect remedied or, where that is not reasonably possible, to receive a refund or replacement in accordance with the CPA (section 56).',
        ],
      },
      {
        title: '6 · No warranty',
        body: [
          'The application is provided \u201cas is\u201d and \u201cas available\u201d, without any warranty, express or implied, including any warranty of merchantability, fitness for a particular purpose, or non-infringement, to the maximum extent permitted by the CPA and applicable law. We do not warrant that the application will be uninterrupted, error-free, or free of bugs.',
        ],
      },
      {
        title: '7 · Limitation of liability',
        body: [
          'To the maximum extent permitted by law, **Arch Studios** will not be liable for any indirect, incidental, special, or consequential loss, or for any loss of profits, data, or goodwill, arising out of your use of or inability to use the application. Our total aggregate liability to you will not exceed the amount you paid for the application, or one hundred rand (R100), whichever is greater.',
        ],
        note: 'Nothing in this clause limits or excludes liability that may not lawfully be limited or excluded under the CPA, including liability for death or personal injury caused by our negligence or for gross negligence or fraud.',
      },
      {
        title: '8 · Updates',
        body: [
          'The application may download and install updates automatically. Updates may be required to continue using the application. Your continued use of the application after an update is your acceptance of any changes to the application made by that update.',
        ],
      },
      {
        title: '9 · Changes to these Terms',
        body: [
          'We may update these Terms from time to time. We will surface material changes inside the application. Continued use of the application after the effective date of revised Terms constitutes your acceptance of them.',
        ],
      },
      {
        title: '10 · Termination',
        body: [
          'We may suspend or terminate your right to use the application if you materially breach these Terms. You may stop using the application at any time. Termination does not affect your ownership of the content you created.',
        ],
      },
      {
        title: '11 · Governing law & jurisdiction',
        body: [
          'These Terms are governed by the laws of the **Republic of South Africa**. Subject to any rights you may have under the CPA, any dispute arising out of or in connection with these Terms will be subject to the exclusive jurisdiction of the courts of South Africa.',
        ],
      },
      {
        title: '12 · Contact',
        body: [
          'Questions about these Terms can be sent to **legal@archstudios.example**. We aim to respond within a reasonable time.',
        ],
      },
    ],
  },
  privacy: {
    intro:
      'This Privacy Policy explains how **Arch Creator**, published by **Arch Studios**, handles your personal information, in line with the **Protection of Personal Information Act 4 of 2013** (\u201cPOPIA\u201d). The short version: the application is **local-first** — it collects no personal information today, and your writing never leaves your device.',
    sections: [
      {
        title: '1 · What we collect',
        body: [
          '**Nothing, currently.** The application does not require an account, does not ask for your name or email address, and does not use analytics, tracking, advertising, or telemetry. It has no cloud service.',
          'All of your content — stories, characters, worlds, notes, and preferences — is stored locally on your own device. We do not receive, read, or process your writing.',
          'Audio files you import (music or ambient loops) are copied to a folder on your device and are never uploaded. The bundled starter music ships with the application.',
        ],
      },
      {
        title: '2 · Network activity',
        body: [
          'The only network request the application makes is to check for software updates: it queries a public release repository and, if an update exists, downloads and installs it. That request transmits only the standard technical information any network request carries (for example, your IP address and the application\u2019s version). No personal information and no content from your projects is transmitted.',
        ],
      },
      {
        title: '3 · Licensing accounts (future)',
        body: [
          'We may later introduce an account- or email-based licensing system to administer licences and activations. If and when we do:',
        ],
        list: [
          'We will update this Privacy Policy **before** the system launches and tell you what we will collect.',
          'We would collect only what the licensing system needs — typically an email address and your licence key — and would process it solely to administer your licence.',
          'Your personal information would be processed in accordance with POPIA, and you would have the right to access, correct, and request deletion of that information (below).',
        ],
      },
      {
        title: '4 · Your rights under POPIA',
        body: [
          'Under POPIA you have the right to request access to any personal information we hold about you, to request that it be corrected, and to object to or request deletion of it. Because we currently hold no personal information, no action is needed — but if a licensing account system is introduced, these rights will apply to the limited information it collects.',
          'Requests can be sent to **legal@archstudios.example**. We will respond within a reasonable time and in line with POPIA.',
        ],
      },
      {
        title: '5 · Security',
        body: [
          'Because your data lives on your device, its security is in your hands: keep your device and operating system up to date and consider backing up your projects. We use industry-standard practices to secure the application and its update channel against tampering.',
        ],
      },
      {
        title: '6 · Cross-border processing',
        body: [
          'Your content never leaves your device, so it is not transferred across borders. The update check contacts a public repository that may be hosted outside South Africa, but that request carries no personal information.',
        ],
      },
      {
        title: '7 · Children',
        body: [
          'The application is not directed at children under the age of 13. Because we collect no personal information, no special safeguards are required in practice; if a licensing system is introduced, we will apply appropriate safeguards for any information relating to children.',
        ],
      },
      {
        title: '8 · Changes to this Policy',
        body: [
          'We will update this Policy when our practices change, and we will surface material changes inside the application. The \u201cEffective\u201d date at the top shows when the current version applies.',
        ],
      },
      {
        title: '9 · Information officer & contact',
        body: [
          'For any questions, requests, or complaints about this Policy or our handling of personal information, contact us at **legal@archstudios.example**. You may also lodge a complaint with the Information Regulator of South Africa (https://inforegulator.org.za).',
        ],
      },
    ],
    note: '**Bottom line:** Arch Creator stores your writing on your machine, sends nothing to us, and will tell you before anything changes.',
  },
  licenses: {
    intro:
      '**Arch Creator** is proprietary software by **Arch Studios**. It is built on the open-source projects below, which are used under their respective licences. We thank their authors and contributors.',
    table: {
      head: ['Component', 'Licence', 'Copyright'],
      rows: [
        ['Tauri (core + JS API)', 'MIT / Apache-2.0', '© 2019–present Tauri contributors (The Commons Conservancy)'],
        ['@tauri-apps/plugin-dialog', 'MIT / Apache-2.0', '© Tauri contributors'],
        ['@tauri-apps/plugin-opener', 'MIT / Apache-2.0', '© Tauri contributors'],
        ['@tauri-apps/plugin-process', 'MIT / Apache-2.0', '© Tauri contributors'],
        ['@tauri-apps/plugin-updater', 'MIT / Apache-2.0', '© Tauri contributors'],
        ['React', 'MIT', '© Meta Platforms, Inc. and contributors'],
        ['ReactDOM', 'MIT', '© Meta Platforms, Inc. and contributors'],
        ['Vite', 'MIT', '© 2019–present VoidZero Inc. and contributors'],
        ['@vitejs/plugin-react', 'MIT', '© 2019–present VoidZero Inc. and contributors'],
        ['Harper.js (grammar & spell engine)', 'Apache-2.0', '© Automattic, Inc.'],
        ['react-icons', 'MIT', '© 2015–present react-icons contributors'],
        ['Recharts', 'MIT', '© 2023 Xiaolin Wang and the Recharts community'],
        ['TypeScript', 'Apache-2.0', '© Microsoft Corporation'],
      ],
    },
    sections: [
      {
        title: 'Apache-2.0 components',
        body: [
          'Components licensed under the Apache Licence 2.0 are provided \u201cas is\u201d, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. You may obtain a copy of the Apache Licence 2.0 at https://www.apache.org/licenses/LICENSE-2.0.',
        ],
      },
      {
        title: 'Trademarks',
        body: [
          'All product names, logos, and brands are property of their respective owners. Reference to any third-party product does not constitute an endorsement.',
        ],
      },
    ],
    note: '**Thank you** to the open-source community — this app would not exist without you.',
  },
  credits: {
    intro:
      '**Arch Creator** bundles a small starter library of calm music made by independent artists. Their work makes the writing environment pleasant out of the box — thank you.',
    music: {
      head: ['Track', 'Artist', 'License'],
      rows: [
        ["It's perfect weather for a trip to the café, don't you think?", 'AvapXia', 'CC BY 4.0'],
        ['Fire Place', 'HoliznaCC0', 'CC0'],
        ['New Lofi', 'snoozy beats', 'CC BY 4.0'],
      ],
    },
    sections: [
      {
        title: 'Your own audio',
        body: [
          'Music and ambient loops you import yourself are **your** files. They are copied to a folder on your device, are never uploaded, and are not attributed by **Arch Creator**. You are responsible for making sure you have the right to use the audio you import.',
        ],
      },
      {
        title: 'Sound effects',
        body: ['Sound effects by Kenney (https://kenney.nl) — CC0 1.0 Universal (public domain), https://creativecommons.org/publicdomain/zero/1.0/.'],
      },
    ],
    note: '**Note:** Arch Creator does not claim ownership of any audio you import — it stays yours, on your device.',
  },
}

export const about = {
  header: {
    kicker: 'About',
    title: 'A studio for storytellers.',
    lede: 'Arch Studios builds software for people who make worlds. Small, deliberate, and quietly obsessed with craft.',
  },
  story: [
    'Arch Studios began with a simple frustration: the tools for worldbuilding were either sterile spreadsheets or walls of nested folders. Both worked. Neither felt like the worlds they were meant to hold.',
    'We set out to build a place that matched the craft — a desktop app with the patience of a workshop, not the urgency of a feed. Offline by design, opinionated where it helps, and free to shape around your story rather than the other way around.',
    'Today, Arch-Creator is our flagship: a worldbuilding and writing home that keeps every thread of your world — calendar, character, chapter — in one connected, portable place. We are a small studio. We intend to stay that way, and to keep building for the long haul.',
  ],
  values: [
    {
      icon: LuCompass,
      name: 'Survey',
      body: 'We observe first — real workflows, real writers, real messy creative process — before we build anything.',
    },
    {
      icon: LuLayers,
      name: 'Converge',
      body: 'We bring the fragments together into one coherent whole, shaping features until they feel inevitable.',
    },
    {
      icon: LuLock,
      name: 'Lock',
      body: 'We commit. We ship what we build, we keep our promises, and we maintain what we release.',
    },
  ],
}

export const contact = {
  kicker: 'Get in touch',
  title: 'Write to us.',
  lede: 'Questions, ideas, or worlds worth describing in detail — our inbox is open.',
  emailLabel: 'Email',
  newsletterTitle: 'The Survey — occasional letters',
  newsletterLed: 'Notes from the studio, a look inside the roadmap, and early peeks. A few times a year, never spam.',
}

export const footer = {
  blurb: 'Worlds, built to last. Arch Studios makes Arch-Creator, the offline home for storytellers and their worlds.',
  tagline: 'Survey · Converge · Lock',
}

export const icons = {
  shield: LuShieldCheck,
  refresh: LuRefreshCw,
  download: LuDownload,
  mail: LuMail,
  github: LuGithub,
  arrowUpRight: LuArrowUpRight,
  sparkles: LuSparkles,
}

export type IconTypeExport = IconType
