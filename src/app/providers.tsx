'use client'

import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className="h-dvh w-full overflow-x-hidden">{children}</div>
    </NextUIProvider>
  )
}
