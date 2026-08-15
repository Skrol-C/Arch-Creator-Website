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
} from 'react-icons/lu'

export const site = {
  name: 'Arch Studios',
  product: 'Arch-Creator',
  tagline: 'Worlds, built to last.',
  email: 'hello@archstudios.dev',
  github: 'https://github.com/Skrol-C',
}

export const urls = {
  proPurchase: 'https://archstudios.dev/buy/pro',
  quillPurchase: 'https://archstudios.dev/buy/quill',
  releases: 'https://github.com/Skrol-C/Arch-Creator/releases',
  docs: 'https://github.com/Skrol-C/Arch-Creator',
}

export const navLinks: { label: string; to: string }[] = [
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
]

export const home = {
  hero: {
    badge: 'Free to start · Desktop · Offline',
    title: ['Worlds,', 'built to last.'],
    lede: 'Arch-Creator is the offline worldbuilding and writing app for storytellers. Worlds, characters, plot boards, and a manuscript that never leaves your device.',
    ctaPrimary: { label: 'Download free', to: '/pricing' },
    ctaSecondary: { label: 'Explore the app', to: '/features' },
  },
  pills: ['Free to start', 'One-time Pro', 'Offline first', 'Windows', 'Your data stays yours'],
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
      body: 'An optional continuity assistant that reads your world and checks your writing against it.',
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
    title: 'Start free. Unlock Pro when your world outgrows free.',
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
      blurb: 'The core experience — build worlds, plan plots and write with Arch Studio.',
      features: [
        'Worlds, calendars & lore',
        'Plot boards',
        'Arch Studio writing module',
        'Offline .arch files',
        'In-app updates',
      ],
      cta: { label: 'Download free', href: 'releases' },
      highlight: false,
    },
    {
      name: 'Pro',
      price: '$60',
      per: 'one-time',
      blurb: 'The full worldbuilding suite, unlocked. Everything in Free, plus every module and unlimited scope.',
      features: [
        'Everything in Free',
        'All ten worldbuilding categories, fully unlocked',
        'Unlimited worlds & manuscripts',
        'Advanced calendar & weather simulation',
        'Priority support & future modules included',
      ],
      cta: { label: 'Unlock Pro', href: 'proPurchase' },
      highlight: true,
    },
    {
      name: 'Quill',
      price: '$30',
      per: 'add-on',
      blurb: 'The continuity assistant. A standalone module that reads your world and keeps your draft honest.',
      features: [
        'Continuity checking against your lore',
        'Name, date & fact verification',
        'Reads world and manuscript together',
        'Works alongside Free or Pro',
      ],
      cta: { label: 'Add Quill', href: 'quillPurchase' },
      highlight: false,
    },
  ],
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
