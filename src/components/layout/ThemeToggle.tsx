import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const preferenceKey = 'psa-theme'
type Theme = 'light' | 'dark'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    function syncPreference() {
      let saved: string | null = null
      try { saved = localStorage.getItem(preferenceKey) } catch { /* Device preference works without storage. */ }
      setTheme(saved === 'light' || saved === 'dark' ? saved : media.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', syncPreference)
    window.addEventListener('storage', syncPreference)
    return () => {
      media.removeEventListener('change', syncPreference)
      window.removeEventListener('storage', syncPreference)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#081725' : '#062f57')
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem(preferenceKey, next) } catch { /* Keep the toggle usable when storage is unavailable. */ }
    setTheme(next)
  }

  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={label} title={label}>
    {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
  </button>
}
