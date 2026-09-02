import { useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { startDownload } from '../../lib/download'

/**
 * Download button, resolves the current installer from the release feed,
 * falling back to a pinned version URL. Navigates in place so the browser
 * handles the download without popup-blocker issues.
 */
export function DownloadButton({
  children,
  className = '',
  variant = 'primary',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'ghost'
}) {
  const [busy, setBusy] = useState(false)

  return (
    <button
      type="button"
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      aria-busy={busy}
      onClick={() => {
        setBusy(true)
        startDownload().finally(() => setBusy(false))
      }}
    >
      <LuDownload size={14} aria-hidden="true" />
      {children}
    </button>
  )
}
