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
  LuMusic,
  LuApple,
  LuShare2,
} from 'react-icons/lu'
import type { EnKey } from '../i18n/keys'

export const site = {
  name: 'Arch Studios',
  product: 'Arch Creator',
  app: 'Arch Creator',
  tagline: 'Worlds, built to last.',
  email: 'arch.studios.we@gmail.com',
  legalEmail: 'arch.studios.we@gmail.com',
  discord: 'https://discord.gg/MFTHz573Ey',
  github: 'https://github.com/Skrol-C',
  tiktok: 'https://www.tiktok.com/@archstudios_',
  twitter: 'https://x.com/Arch_studios_',
}

export const urls = {
  download: 'https://github.com/Skrol-C/Arch-Creator-Releases/releases/latest',
  releases: 'https://github.com/Skrol-C/Arch-Creator-Releases/releases',
  docs: 'https://github.com/Skrol-C/Arch-Creator-Releases',
}

// All user-facing label strings below are i18n KEYS (see src/i18n/keys.ts).
// Resolve them with t(key) / tk(value) from useLocale.

export const navLeft: { label: EnKey; to: string }[] = [
  { label: 'nav.explore', to: '/explore' },
  { label: 'nav.features', to: '/features' },
]

export const navRightLinks: { label: EnKey; to: string }[] = [
  { label: 'nav.pricing', to: '/pricing' },
  { label: 'nav.about', to: '/about' },
]

export const resourcesLabel = 'nav.resources'
export const resources: { label: EnKey; to: string }[] = [
  { label: 'nav.changelog', to: '/changelog' },
  { label: 'nav.roadmap', to: '/roadmap' },
  { label: 'nav.legal', to: '/legal' },
]

export const navLinks: { label: EnKey; to: string }[] = [
  { label: 'nav.features', to: '/features' },
  { label: 'nav.pricing', to: '/pricing' },
  { label: 'nav.about', to: '/about' },
  { label: 'nav.changelog', to: '/changelog' },
]

export const home = {
  hero: {
    badge: 'hero.badge',
    title: ['hero.title1', 'hero.title2'],
    lede: 'hero.lede',
    ctaPrimary: { label: 'hero.downloadFree' },
    ctaSecondary: { label: 'hero.tryDemo', to: '/explore' },
  },
  screenKicker: 'home.screenKicker',
  screenTitle: ['home.screenTitle1', 'home.screenTitle2'],
  screenLede: 'home.screenLede',
  videoFallback: 'home.videoFallback',
  insideKicker: 'home.insideKicker',
  insideTitle: ['home.insideTitle1', 'home.insideTitle2'],
  modules: [
    {
      icon: LuGlobe,
      name: 'home.modules.0.name',
      body: 'home.modules.0.body',
    },
    {
      icon: LuColumns2,
      name: 'home.modules.1.name',
      body: 'home.modules.1.body',
    },
    {
      icon: LuBoxes,
      name: 'home.modules.2.name',
      body: 'home.modules.2.body',
    },
    {
      icon: LuFeather,
      name: 'home.modules.3.name',
      body: 'home.modules.3.body',
    },
  ],
  exploreLive: 'home.exploreLive',
  cta: {
    title: 'home.colophonTitle',
    lede: 'home.colophonLede',
    primary: { label: 'home.seePricing', to: '/pricing' },
    download: 'home.downloadFree',
  },
}

export const features = {
  header: {
    kicker: 'features.kicker',
    title: 'features.title',
    lede: 'features.lede',
  },
  grid: [
    { icon: LuCalendarDays, name: 'features.grid.0.name', body: 'features.grid.0.body' },
    { icon: LuBoxes, name: 'features.grid.1.name', body: 'features.grid.1.body' },
    { icon: LuColumns2, name: 'features.grid.2.name', body: 'features.grid.2.body' },
    { icon: LuPenTool, name: 'features.grid.3.name', body: 'features.grid.3.body' },
    { icon: LuFeather, name: 'features.grid.4.name', body: 'features.grid.4.body' },
    { icon: LuMusic, name: 'features.grid.5.name', body: 'features.grid.5.body' },
    { icon: LuHardDrive, name: 'features.grid.6.name', body: 'features.grid.6.body' },
  ],
  blocks: [
    {
      icon: LuCalendarDays,
      name: 'features.block.0.name',
      body: 'features.block.0.body',
      points: ['features.block.0.point.0', 'features.block.0.point.1', 'features.block.0.point.2'],
      image: '/screenshots/calendar.png',
      alt: 'features.block.0.alt',
      fig: 'features.block.0.fig',
    },
    {
      icon: LuBoxes,
      name: 'features.block.1.name',
      body: 'features.block.1.body',
      points: ['features.block.1.point.0', 'features.block.1.point.1', 'features.block.1.point.2'],
      image: '/screenshots/worldbuilding.png',
      alt: 'features.block.1.alt',
      fig: 'features.block.1.fig',
    },
    {
      icon: LuColumns2,
      name: 'features.block.2.name',
      body: 'features.block.2.body',
      points: ['features.block.2.point.0', 'features.block.2.point.1', 'features.block.2.point.2'],
      image: '/screenshots/plot.png',
      alt: 'features.block.2.alt',
      fig: 'features.block.2.fig',
    },
    {
      icon: LuPenTool,
      name: 'features.block.3.name',
      body: 'features.block.3.body',
      points: ['features.block.3.point.0', 'features.block.3.point.1', 'features.block.3.point.2'],
      image: '/screenshots/studio.png',
      alt: 'features.block.3.alt',
      fig: 'features.block.3.fig',
    },
    {
      icon: LuFeather,
      name: 'features.block.4.name',
      body: 'features.block.4.body',
      points: ['features.block.4.point.0', 'features.block.4.point.1', 'features.block.4.point.2'],
      image: '/screenshots/quill-window.png',
      alt: 'features.block.4.alt',
      fig: 'features.block.4.fig',
    },
    {
      icon: LuMusic,
      name: 'features.block.5.name',
      body: 'features.block.5.body',
      points: ['features.block.5.point.0', 'features.block.5.point.1', 'features.block.5.point.2'],
      image: '/screenshots/library.png',
      alt: 'features.block.5.alt',
      fig: 'features.block.5.fig',
    },
    {
      icon: LuHardDrive,
      name: 'features.block.6.name',
      body: 'features.block.6.body',
      points: ['features.block.6.point.0', 'features.block.6.point.1', 'features.block.6.point.2'],
      image: '/screenshots/shelf.png',
      alt: 'features.block.6.alt',
      fig: 'features.block.6.fig',
    },
  ],
  archiveInfix: 'features.archiveInfix',
  tryDemo: 'features.tryDemo',
  cta: {
    title: 'features.ctaTitle',
    lede: 'features.ctaLede',
    download: 'features.downloadFree',
    exploreLive: 'features.exploreLive',
  },
}

export const pricing = {
  header: {
    kicker: 'pricing.kicker',
    title: 'pricing.title',
    lede: 'pricing.lede',
  },
  rateCardKicker: 'pricing.rateCardKicker',
  rateCardTitle: ['pricing.rateCardTitle1', 'pricing.rateCardTitle2'],
  tiers: [
    {
      name: 'pricing.tiers.0.name',
      price: '$0',
      per: 'pricing.tiers.0.per',
      blurb: 'pricing.tiers.0.blurb',
      highlights: ['pricing.tiers.0.highlight.0', 'pricing.tiers.0.highlight.1', 'pricing.tiers.0.highlight.2'],
      includes: [
        'pricing.tiers.0.include.0',
        'pricing.tiers.0.include.1',
        'pricing.tiers.0.include.2',
        'pricing.tiers.0.include.3',
        'pricing.tiers.0.include.4',
        'pricing.tiers.0.include.5',
        'pricing.tiers.0.include.6',
        'pricing.tiers.0.include.7',
        'pricing.tiers.0.include.8',
        'pricing.tiers.0.include.9',
      ],
      action: 'download',
      cta: { label: 'pricing.tiers.0.cta' },
    },
    {
      name: 'pricing.tiers.1.name',
      price: '$60',
      per: 'pricing.tiers.1.per',
      accent: '#e8590c',
      badge: 'pricing.tiers.1.badge',
      blurb: 'pricing.tiers.1.blurb',
      highlights: ['pricing.tiers.1.highlight.0', 'pricing.tiers.1.highlight.1', 'pricing.tiers.1.highlight.2'],
      includes: [
        'pricing.tiers.1.include.0',
        'pricing.tiers.1.include.1',
        'pricing.tiers.1.include.2',
        'pricing.tiers.1.include.3',
        'pricing.tiers.1.include.4',
        'pricing.tiers.1.include.5',
        'pricing.tiers.1.include.6',
        'pricing.tiers.1.include.7',
        'pricing.tiers.1.include.8',
        'pricing.tiers.1.include.9',
      ],
      action: 'checkout',
      plan: 'keystone',
      cta: { label: 'pricing.tiers.1.cta' },
    },
    {
      name: 'pricing.tiers.2.name',
      price: '$30',
      per: 'pricing.tiers.2.per',
      accent: '#a855f7',
      blurb: 'pricing.tiers.2.blurb',
      highlights: ['pricing.tiers.2.highlight.0', 'pricing.tiers.2.highlight.1', 'pricing.tiers.2.highlight.2'],
      includes: [
        'pricing.tiers.2.include.0',
        'pricing.tiers.2.include.1',
        'pricing.tiers.2.include.2',
        'pricing.tiers.2.include.3',
        'pricing.tiers.2.include.4',
        'pricing.tiers.2.include.5',
        'pricing.tiers.2.include.6',
        'pricing.tiers.2.include.7',
        'pricing.tiers.2.include.8',
      ],
      action: 'checkout',
      plan: 'quill',
      cta: { label: 'pricing.tiers.2.cta' },
    },
    {
      name: 'pricing.tiers.3.name',
      price: '$90',
      per: 'pricing.tiers.3.per',
      accent: '#f368e0',
      badge: 'pricing.tiers.3.badge',
      blurb: 'pricing.tiers.3.blurb',
      highlights: ['pricing.tiers.3.highlight.0', 'pricing.tiers.3.highlight.1', 'pricing.tiers.3.highlight.2'],
      includes: [
        'pricing.tiers.3.include.0',
        'pricing.tiers.3.include.1',
        'pricing.tiers.3.include.2',
        'pricing.tiers.3.include.3',
        'pricing.tiers.3.include.4',
        'pricing.tiers.3.include.5',
      ],
      action: 'checkout',
      plan: 'arch',
      cta: { label: 'pricing.tiers.3.cta' },
    },
  ],
  rateFootnote: 'pricing.rateFootnote',
  guarantee: [
    { strong: 'pricing.guarantee.0', suffix: 'pricing.guarantee.0By' },
    { strong: 'pricing.guarantee.1', suffix: 'pricing.guarantee.1Forever' },
    { strong: 'pricing.guarantee.2', suffix: 'pricing.guarantee.2NoAccount' },
  ],
  table: {
    kicker: 'pricing.tableKicker',
    title: 'pricing.table.title',
    lede: 'pricing.table.lede',
    thFeature: 'pricing.table.thFeature',
    groups: [
      {
        name: 'pricing.table.group.0',
        rows: [
          { label: 'pricing.table.group.0.row.0', free: 'pricing.table.group.0.row.0.free', pro: 'pricing.table.group.0.row.0.pro' },
          { label: 'pricing.table.group.0.row.1', free: 'pricing.table.group.0.row.1.free', pro: 'pricing.table.group.0.row.1.pro' },
          { label: 'pricing.table.group.0.row.2', free: 'pricing.table.group.0.row.2.free', pro: 'pricing.table.group.0.row.2.pro' },
          { label: 'pricing.table.group.0.row.3', free: 'pricing.table.group.0.row.3.free', pro: 'pricing.table.group.0.row.3.pro' },
          { label: 'pricing.table.group.0.row.4', free: 'pricing.table.group.0.row.4.free', pro: 'pricing.table.group.0.row.4.pro' },
        ],
      },
      {
        name: 'pricing.table.group.1',
        rows: [
          { label: 'pricing.table.group.1.row.0', free: 'pricing.table.group.1.row.0.free', pro: 'pricing.table.group.1.row.0.pro' },
        ],
      },
      {
        name: 'pricing.table.group.2',
        rows: [
          { label: 'pricing.table.group.2.row.0', free: 'pricing.table.group.2.row.0.free', pro: 'pricing.table.group.2.row.0.pro' },
          { label: 'pricing.table.group.2.row.1', free: 'pricing.table.group.2.row.1.free', pro: 'pricing.table.group.2.row.1.pro' },
        ],
      },
      {
        name: 'pricing.table.group.3',
        rows: [
          { label: 'pricing.table.group.3.row.0', free: 'pricing.table.group.3.row.0.free', pro: 'pricing.table.group.3.row.0.pro' },
          { label: 'pricing.table.group.3.row.1', free: 'pricing.table.group.3.row.1.free', pro: 'pricing.table.group.3.row.1.pro' },
          { label: 'pricing.table.group.3.row.2', free: 'pricing.table.group.3.row.2.free', pro: 'pricing.table.group.3.row.2.pro' },
          { label: 'pricing.table.group.3.row.3', free: 'pricing.table.group.3.row.3.free', pro: 'pricing.table.group.3.row.3.pro' },
        ],
      },
      {
        name: 'pricing.table.group.4',
        rows: [
          { label: 'pricing.table.group.4.row.0', free: 'pricing.table.group.4.row.0.free', pro: 'pricing.table.group.4.row.0.pro' },
          { label: 'pricing.table.group.4.row.1', free: 'pricing.table.group.4.row.1.free', pro: 'pricing.table.group.4.row.1.pro' },
        ],
      },
      {
        name: 'pricing.table.group.5',
        rows: [
          { label: 'pricing.table.group.5.row.0', free: 'pricing.table.group.5.row.0.free', pro: 'pricing.table.group.5.row.0.pro' },
          { label: 'pricing.table.group.5.row.1', free: 'pricing.table.group.5.row.1.free', pro: 'pricing.table.group.5.row.1.pro' },
          { label: 'pricing.table.group.5.row.2', free: 'pricing.table.group.5.row.2.free', pro: 'pricing.table.group.5.row.2.pro' },
        ],
      },
    ],
  },
  quill: {
    kicker: 'pricing.quill.kicker',
    title: 'pricing.quill.title',
    lede: 'pricing.quill.lede',
    quote: 'pricing.quill.quote',
    hats: [
      { icon: LuPenTool, name: 'pricing.quill.hat.0.name', body: 'pricing.quill.hat.0.body' },
      { icon: LuRepeat, name: 'pricing.quill.hat.1.name', body: 'pricing.quill.hat.1.body' },
      { icon: LuDatabase, name: 'pricing.quill.hat.2.name', body: 'pricing.quill.hat.2.body' },
      { icon: LuGauge, name: 'pricing.quill.hat.3.name', body: 'pricing.quill.hat.3.body' },
      { icon: LuTrendingUp, name: 'pricing.quill.hat.4.name', body: 'pricing.quill.hat.4.body' },
    ],
    learns: ['pricing.quill.learn.0', 'pricing.quill.learn.1', 'pricing.quill.learn.2'],
    today: ['pricing.quill.today.0', 'pricing.quill.today.1', 'pricing.quill.today.2', 'pricing.quill.today.3', 'pricing.quill.today.4'],
    horizon: ['pricing.quill.horizon.0', 'pricing.quill.horizon.1', 'pricing.quill.horizon.2', 'pricing.quill.horizon.3', 'pricing.quill.horizon.4', 'pricing.quill.horizon.5'],
    note: 'pricing.quill.note',
    price: '$30',
    cta: { label: 'pricing.quill.cta', action: 'checkout', plan: 'quill' },
  },
  compare: {
    kicker: 'pricing.compare.kicker',
    title: 'pricing.compare.title',
    lede: 'pricing.compare.lede',
    tools: [
      { name: 'pricing.compare.tool.0.name', model: 'pricing.compare.tool.0.model', price: '$60 · $30 · $90', note: 'pricing.compare.tool.0.note', highlight: true },
      { name: 'pricing.compare.tool.1.name', model: 'pricing.compare.tool.1.model', price: '~$60', note: 'pricing.compare.tool.1.note' },
      { name: 'pricing.compare.tool.2.name', model: 'pricing.compare.tool.2.model', price: '~$15/mo or ~$199', note: 'pricing.compare.tool.2.note' },
      { name: 'pricing.compare.tool.3.name', model: 'pricing.compare.tool.3.model', price: '~$5–12/mo', note: 'pricing.compare.tool.3.note' },
      { name: 'pricing.compare.tool.4.name', model: 'pricing.compare.tool.4.model', price: '~$12.50/mo', note: 'pricing.compare.tool.4.note' },
      { name: 'pricing.compare.tool.5.name', model: 'pricing.compare.tool.5.model', price: '$4–20/mo', note: 'pricing.compare.tool.5.note' },
    ],
    costs: {
      title: 'pricing.compare.costsTitle',
      lede: 'pricing.compare.costsLede',
      years: [1, 3, 5],
      rows: [
        { name: 'pricing.compare.tool.0.name', values: [60, 60, 60], highlight: true },
        { name: 'pricing.compare.tool.1.name', values: [60, 60, 60] },
        { name: 'pricing.compare.tool.2.name', values: [199, 199, 199] },
        { name: 'pricing.compare.tool.3.name', values: [105, 315, 525] },
        { name: 'pricing.compare.tool.4.name', values: [125, 375, 625] },
        { name: 'pricing.compare.tool.5.name', values: [168, 504, 840] },
      ],
    },
    matrix: {
      title: 'pricing.compare.matrixTitle',
      lede: 'pricing.compare.matrixLede',
      columns: ['pricing.compare.matrixCol.0', 'pricing.compare.matrixCol.1', 'pricing.compare.matrixCol.2', 'pricing.compare.matrixCol.3', 'pricing.compare.matrixCol.4', 'pricing.compare.matrixCol.5'],
      rows: [
        { label: 'pricing.compare.matrixRow.0', values: ['yes', 'yes', 'some', 'no', 'some', 'no'] },
        { label: 'pricing.compare.matrixRow.1', values: ['yes', 'yes', 'yes', 'no', 'no', 'no'] },
        { label: 'pricing.compare.matrixRow.2', values: ['yes', 'no', 'no', 'yes', 'yes', 'no'] },
        { label: 'pricing.compare.matrixRow.3', values: ['yes', 'some', 'no', 'yes', 'yes', 'yes'] },
        { label: 'pricing.compare.matrixRow.4', values: ['yes', 'no', 'no', 'no', 'no', 'no'] },
        { label: 'pricing.compare.matrixRow.5', values: ['yes', 'yes', 'yes', 'no', 'no', 'no'] },
        { label: 'pricing.compare.matrixRow.6', values: ['yes', 'yes', 'some', 'some', 'yes', 'yes'] },
      ],
    },
    why: 'pricing.compare.why',
    footnote: 'pricing.compare.footnote',
  },
  requirements: ['pricing.req.0', 'pricing.req.1', 'pricing.req.2', 'pricing.req.3'],
  macInProgress: false,
  reqHead: 'pricing.reqHead',
  macBadge: 'pricing.macBadge',
  notes: {
    title: 'pricing.notes.title',
    items: ['pricing.notes.0', 'pricing.notes.1', 'pricing.notes.2'],
  },
  faq: {
    kicker: 'pricing.faqKicker',
    title: 'pricing.faq.title',
    lede: 'pricing.faq.lede',
    items: [
      { q: 'pricing.faq.q.0', a: 'pricing.faq.a.0' },
      { q: 'pricing.faq.q.1', a: 'pricing.faq.a.1' },
      { q: 'pricing.faq.q.2', a: 'pricing.faq.a.2' },
      { q: 'pricing.faq.q.3', a: 'pricing.faq.a.3' },
      { q: 'pricing.faq.q.4', a: 'pricing.faq.a.4' },
      { q: 'pricing.faq.q.5', a: 'pricing.faq.a.5' },
      { q: 'pricing.faq.q.6', a: 'pricing.faq.a.6' },
      { q: 'pricing.faq.q.7', a: 'pricing.faq.a.7' },
    ],
  },
}

export const roadmap = {
  header: {
    kicker: 'roadmap.kicker',
    title: 'roadmap.title',
    lede: 'roadmap.lede',
  },
  tracks: [
    { label: 'roadmap.track.0', pct: 75 },
    { label: 'roadmap.track.1', pct: 65 },
    { label: 'roadmap.track.2', pct: 45 },
  ],
  phases: [
    {
      num: '01',
      name: 'roadmap.phase.0.name',
      chip: 'roadmap.phase.0.chip',
      tone: 'shipped',
      line: 'roadmap.phase.0.line',
      items: [
        { icon: LuShieldCheck, title: 'roadmap.phase.0.item.0.title', body: 'roadmap.phase.0.item.0.body', tags: ['roadmap.tag.0'] },
        { icon: LuMusic, title: 'roadmap.phase.0.item.1.title', body: 'roadmap.phase.0.item.1.body', tags: ['roadmap.tag.0'] },
        { icon: LuGlobe, title: 'roadmap.phase.0.item.2.title', body: 'roadmap.phase.0.item.2.body', tags: ['roadmap.tag.1'] },
        { icon: LuShare2, title: 'roadmap.phase.0.item.3.title', body: 'roadmap.phase.0.item.3.body', tags: ['roadmap.tag.1'] },
        { icon: LuPenTool, title: 'roadmap.phase.0.item.4.title', body: 'roadmap.phase.0.item.4.body', tags: ['roadmap.tag.2'] },
        { icon: LuRefreshCw, title: 'roadmap.phase.0.item.5.title', body: 'roadmap.phase.0.item.5.body', tags: ['roadmap.tag.0'] },
      ],
    },
    {
      num: '02',
      name: 'roadmap.phase.1.name',
      chip: 'roadmap.phase.1.chip',
      tone: 'next',
      line: 'roadmap.phase.1.line',
      items: [
        { icon: LuApple, title: 'roadmap.phase.1.item.0.title', body: 'roadmap.phase.1.item.0.body', tags: ['roadmap.tag.0'] },
        { icon: LuFeather, title: 'roadmap.phase.1.item.1.title', body: 'roadmap.phase.1.item.1.body', tags: ['roadmap.tag.3'] },
        { icon: LuMap, title: 'roadmap.phase.1.item.2.title', body: 'roadmap.phase.1.item.2.body', tags: ['roadmap.tag.1'] },
        { icon: LuGamepad2, title: 'roadmap.phase.1.item.3.title', body: 'roadmap.phase.1.item.3.body', tags: ['roadmap.tag.0'] },
      ],
    },
    {
      num: '03',
      name: 'roadmap.phase.2.name',
      chip: 'roadmap.phase.2.chip',
      tone: 'later',
      line: 'roadmap.phase.2.line',
      items: [
        { icon: LuGauge, title: 'roadmap.phase.2.item.0.title', body: 'roadmap.phase.2.item.0.body', tags: ['roadmap.tag.3'] },
        { icon: LuLayers, title: 'roadmap.phase.2.item.1.title', body: 'roadmap.phase.2.item.1.body', tags: ['roadmap.tag.4'] },
        { icon: LuRefreshCw, title: 'roadmap.phase.2.item.2.title', body: 'roadmap.phase.2.item.2.body', tags: ['roadmap.tag.0'] },
        { icon: LuCompass, title: 'roadmap.phase.2.item.3.title', body: 'roadmap.phase.2.item.3.body', tags: ['roadmap.tag.3', 'roadmap.tag.1'] },
        { icon: LuGlobe, title: 'roadmap.phase.2.item.4.title', body: 'roadmap.phase.2.item.4.body', tags: ['roadmap.tag.0'] },
      ],
    },
  ],
}

export const changelog = {
  header: {
    kicker: 'changelog.kicker',
    title: 'changelog.title',
    lede: 'changelog.lede',
  },
  upcoming: 'changelog.upcoming',
  upcomingEmpty: 'changelog.upcomingEmpty',
  earlier: 'changelog.earlier',
}

export const legal = {
  header: {
    kicker: 'legal.kicker',
    title: 'legal.title',
    lede: 'legal.lede',
  },
  meta: {
    operator: 'Arch Studios',
    app: 'Arch Creator',
    email: 'arch.studios.we@gmail.com',
    effective: 'August 29, 2026',
  },
  docs: [
    { id: 'terms', label: 'legal.doc.terms.label', title: 'legal.doc.terms.title' },
    { id: 'privacy', label: 'legal.doc.privacy.label', title: 'legal.doc.privacy.title' },
    { id: 'licenses', label: 'legal.doc.licenses.label', title: 'legal.doc.licenses.title' },
    { id: 'credits', label: 'legal.doc.credits.label', title: 'legal.doc.credits.title' },
  ],
  subnavAria: 'legal.subnavAria',
  effectiveLabel: 'legal.effective',
  thirdParty: 'legal.thirdParty',
  bundledMusic: 'legal.bundledMusic',
  terms: {
    intro: 'legal.terms.intro',
    sections: [
      { title: 'legal.terms.sec.0', body: ['legal.terms.sec.0.p.0', 'legal.terms.sec.0.p.1'] },
      { title: 'legal.terms.sec.1', body: ['legal.terms.sec.1.p.0', 'legal.terms.sec.1.p.1'] },
      { title: 'legal.terms.sec.2', body: ['legal.terms.sec.2.p.0'] },
      { title: 'legal.terms.sec.3', body: ['legal.terms.sec.3.p.0'] },
      { title: 'legal.terms.sec.4', body: ['legal.terms.sec.4.p.0'], list: ['legal.terms.sec.4.list.0', 'legal.terms.sec.4.list.1', 'legal.terms.sec.4.list.2'] },
      { title: 'legal.terms.sec.5', body: ['legal.terms.sec.5.p.0'] },
      { title: 'legal.terms.sec.6', body: ['legal.terms.sec.6.p.0'], note: 'legal.terms.sec.6.note' },
      { title: 'legal.terms.sec.7', body: ['legal.terms.sec.7.p.0'] },
      { title: 'legal.terms.sec.8', body: ['legal.terms.sec.8.p.0'] },
      { title: 'legal.terms.sec.9', body: ['legal.terms.sec.9.p.0'] },
      { title: 'legal.terms.sec.10', body: ['legal.terms.sec.10.p.0'] },
      { title: 'legal.terms.sec.11', body: ['legal.terms.sec.11.p.0'] },
    ],
  },
  privacy: {
    intro: 'legal.privacy.intro',
    sections: [
      { title: 'legal.privacy.sec.0', body: ['legal.privacy.sec.0.p.0', 'legal.privacy.sec.0.p.1', 'legal.privacy.sec.0.p.2'] },
      { title: 'legal.privacy.sec.1', body: ['legal.privacy.sec.1.p.0', 'legal.privacy.sec.1.p.1'] },
      { title: 'legal.privacy.sec.2', body: ['legal.privacy.sec.2.p.0'], list: ['legal.privacy.sec.2.list.0', 'legal.privacy.sec.2.list.1', 'legal.privacy.sec.2.list.2'] },
      { title: 'legal.privacy.sec.3', body: ['legal.privacy.sec.3.p.0', 'legal.privacy.sec.3.p.1'] },
      { title: 'legal.privacy.sec.4', body: ['legal.privacy.sec.4.p.0'] },
      { title: 'legal.privacy.sec.5', body: ['legal.privacy.sec.5.p.0'] },
      { title: 'legal.privacy.sec.6', body: ['legal.privacy.sec.6.p.0'] },
      { title: 'legal.privacy.sec.7', body: ['legal.privacy.sec.7.p.0'] },
      { title: 'legal.privacy.sec.8', body: ['legal.privacy.sec.8.p.0'] },
    ],
    note: 'legal.privacy.note',
  },
  licenses: {
    intro: 'legal.licenses.intro',
    table: {
      head: ['legal.licenses.table.head.0', 'legal.licenses.table.head.1', 'legal.licenses.table.head.2'],
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
      { title: 'legal.licenses.sec.0', body: ['legal.licenses.sec.0.p.0'] },
      { title: 'legal.licenses.sec.1', body: ['legal.licenses.sec.1.p.0'] },
    ],
    note: 'legal.licenses.note',
  },
  credits: {
    intro: 'legal.credits.intro',
    music: {
      head: ['legal.credits.table.head.0', 'legal.credits.table.head.1', 'legal.credits.table.head.2'],
      rows: [
        ["It's perfect weather for a trip to the café, don't you think?", 'AvapXia', 'CC BY 4.0'],
        ['Fire Place', 'HoliznaCC0', 'CC0'],
        ['New Lofi', 'snoozy beats', 'CC BY 4.0'],
      ],
    },
    sections: [
      { title: 'legal.credits.sec.0', body: ['legal.credits.sec.0.p.0'] },
      { title: 'legal.credits.sec.1', body: ['legal.credits.sec.1.p.0'] },
    ],
    note: 'legal.credits.note',
  },
}

export const about = {
  header: {
    kicker: 'about.kicker',
    title: 'about.title',
    lede: 'about.lede',
  },
  story: ['about.story.0', 'about.story.1', 'about.story.2'],
  values: [
    { icon: LuCompass, name: 'about.value.0.name', body: 'about.value.0.body' },
    { icon: LuLayers, name: 'about.value.1.name', body: 'about.value.1.body' },
    { icon: LuLock, name: 'about.value.2.name', body: 'about.value.2.body' },
  ],
}

export const contact = {
  kicker: 'about.contact.kicker',
  title: 'about.contact.title',
  lede: 'about.contact.lede',
  emailLabel: 'Email',
  discordTitle: 'about.contact.discordTitle',
  discordLed: 'about.contact.discordLed',
  joinDiscord: 'about.contact.joinDiscord',
  newsNote: 'about.contact.newsNote',
}

export const footer = {
  headline: ['footer.headline1', 'footer.headline2'],
  subhead: 'footer.subhead',
  joinDiscord: 'footer.joinDiscord',
  downloadApp: 'footer.downloadApp',
  tagline: 'misc.surveyConvergeLock',
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
