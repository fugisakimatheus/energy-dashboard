'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 shrink-0 rounded-xl border border-border/50 bg-card/50"
        aria-hidden
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card/70 text-foreground shadow-sm backdrop-blur-md transition hover:border-accent/40 hover:bg-card hover:text-accent"
    >
      {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
    </button>
  )
}
