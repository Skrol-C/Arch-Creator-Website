import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { initI18n, setLocale } from './i18n'
import App from './App.tsx'

// Boot i18n and restore the saved locale (or detect region) before render.
const savedLocale = (() => {
  try {
    const stored = localStorage.getItem('locale')
    if (stored && /^(en|es|fr|de|pt|it|ja|ko|pl|ru|nl|tr)$/.test(stored)) return stored
  } catch {
    /* ignore */
  }
  const nav = navigator.language?.split('-')[0]
  return nav && /^(en|es|fr|de|pt|it|ja|ko|pl|ru|nl|tr)$/.test(nav) ? nav : 'en'
})()

void initI18n().then(async () => {
  await setLocale(savedLocale)
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
