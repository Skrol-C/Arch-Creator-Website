const FALLBACK_INSTALLER =
  'https://github.com/Skrol-C/Arch-Creator-Releases/releases/download/v2.5.0/Arch.Creator_2.5.0_x64-setup.exe'

const LATEST_JSON =
  'https://github.com/Skrol-C/Arch-Creator-Releases/releases/latest/download/latest.json'

export type PlatformId = 'windows' | 'macos' | 'linux'

interface ReleaseFeed {
  version?: string
  platforms?: Record<string, { url?: string; signature?: string }>
}

let cache: ReleaseFeed | null = null

/** Fetch (and memoize) the release feed. */
async function getFeed(): Promise<ReleaseFeed | null> {
  if (cache) return cache
  try {
    const res = await fetch(LATEST_JSON, { cache: 'no-store' })
    if (res.ok) {
      cache = (await res.json()) as ReleaseFeed
      return cache
    }
  } catch {
    /* fall through */
  }
  return null
}

/** Map a friendly platform id to the feed's keys. */
const PLATFORM_KEYS: Record<PlatformId, string[]> = {
  windows: ['windows-x86_64', 'windows-x86_64-nsis'],
  macos: ['darwin-x86_64', 'darwin-aarch64', 'darwin-universal'],
  linux: ['linux-x86_64', 'linux-aarch64'],
}

export function detectPlatform(): PlatformId {
  const ua = navigator.userAgent
  if (/Mac|iPhone|iPad/i.test(ua)) return 'macos'
  if (/Linux/i.test(ua)) return 'linux'
  return 'windows'
}

/** Resolve the installer URL for a given platform, falling back to Windows (the shipped build). */
export async function resolveInstallerUrl(platform: PlatformId = 'windows'): Promise<string> {
  const feed = await getFeed()
  if (feed?.platforms) {
    for (const key of PLATFORM_KEYS[platform]) {
      const url = feed.platforms[key]?.url
      if (url) return new URL(url, LATEST_JSON).href
    }
  }
  return FALLBACK_INSTALLER
}

/** True if the release feed has a real build for this platform. */
export async function platformAvailable(platform: PlatformId): Promise<boolean> {
  const feed = await getFeed()
  if (!feed?.platforms) return platform === 'windows'
  return PLATFORM_KEYS[platform].some((k) => Boolean(feed.platforms?.[k]?.url))
}

export async function startDownload(platform: PlatformId = 'windows'): Promise<void> {
  const url = await resolveInstallerUrl(platform)
  window.location.href = url
}

export { FALLBACK_INSTALLER }
