'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <NextUIProvider>
        <div className="page-shell">{children}</div>
      </NextUIProvider>
    </ThemeProvider>
  )
}
