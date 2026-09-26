const FALLBACK_INSTALLER =
  'https://github.com/Skrol-C/Arch-Creator-Releases/releases/download/v2.5.0/Arch.Creator_2.5.0_x64-setup.exe'

const RELEASE_API =
  'https://api.github.com/repos/Skrol-C/Arch-Creator-Releases/releases/latest'

export type PlatformId = 'windows' | 'macos' | 'linux'

interface ReleaseFeed {
  version?: string
  platforms?: Record<string, { url?: string; signature?: string }>
}

interface GitHubRelease {
  tag_name?: string
  assets?: Array<{ name?: string; browser_download_url?: string }>
}

let cache: ReleaseFeed | null = null

/** Fetch the latest release through GitHub's CORS-enabled API. */
async function getFeed(): Promise<ReleaseFeed | null> {
  if (cache) return cache
  try {
    const res = await fetch(RELEASE_API, {
      cache: 'no-store',
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const release = (await res.json()) as GitHubRelease
    const assets = release.assets ?? []
    const assetUrl = (name: string) => assets.find((asset) => asset.name === name)?.browser_download_url
    const version = release.tag_name?.replace(/^v/, '')
    const macDmg = version ? assetUrl(`Arch.Creator_${version}_aarch64.dmg`) : undefined
    const macArchive = version ? assetUrl('Arch.Creator_aarch64.app.tar.gz') : undefined
    const windows = version ? assetUrl(`Arch.Creator_${version}_x64-setup.exe`) : undefined
    cache = {
      version,
      platforms: {
        ...(windows ? { 'windows-x86_64': { url: windows } } : {}),
        ...(macDmg ? { 'darwin-aarch64': { url: macDmg } } : {}),
        ...(macArchive ? { 'darwin-aarch64-app': { url: macArchive } } : {}),
      },
    }
    return cache
  } catch {
    return null
  }
}

const PLATFORM_KEYS: Record<PlatformId, string[]> = {
  windows: ['windows-x86_64', 'windows-x86_64-nsis'],
  macos: ['darwin-aarch64', 'darwin-aarch64-app', 'darwin-x86_64', 'darwin-universal'],
  linux: ['linux-x86_64', 'linux-aarch64'],
}

export function detectPlatform(): PlatformId {
  const ua = navigator.userAgent
  if (/Mac|iPhone|iPad/i.test(ua)) return 'macos'
  if (/Linux/i.test(ua)) return 'linux'
  return 'windows'
}

/** Resolve a platform-specific installer. Never cross-fallback to Windows. */
export async function resolveInstallerUrl(platform: PlatformId = 'windows'): Promise<string> {
  const feed = await getFeed()
  if (feed?.platforms) {
    for (const key of PLATFORM_KEYS[platform]) {
      const url = feed.platforms[key]?.url
      if (url) return url
    }
  }
  if (platform === 'windows') return FALLBACK_INSTALLER
  throw new Error(`No ${platform} build is currently available`)
}

export async function platformAvailable(platform: PlatformId): Promise<boolean> {
  const feed = await getFeed()
  if (!feed?.platforms) return platform === 'windows'
  return PLATFORM_KEYS[platform].some((key) => Boolean(feed.platforms?.[key]?.url))
}

export async function startDownload(platform: PlatformId = 'windows'): Promise<void> {
  window.location.href = await resolveInstallerUrl(platform)
}

export { FALLBACK_INSTALLER }
