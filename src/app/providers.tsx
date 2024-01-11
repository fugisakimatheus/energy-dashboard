'use client'

import { DarkModeProvider } from '@/contexts/dark-mode-context'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <DarkModeProvider>{children}</DarkModeProvider>
    </NextUIProvider>
  )
}
