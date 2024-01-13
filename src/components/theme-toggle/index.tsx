'use client'

import { useDarkMode } from '@/contexts/dark-mode-context'
import { Button } from '@nextui-org/react'

export default function ThemeToggle() {
  const { toggleDarkMode } = useDarkMode()
  return <Button onClick={() => toggleDarkMode()}>Toggle theme</Button>
}
