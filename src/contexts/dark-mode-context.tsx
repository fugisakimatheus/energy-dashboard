'use client'

import React, { useState } from 'react'

const DarkModeContext = React.createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(darkMode => !darkMode)
  }

  const darkClass = isDarkMode ? 'dark' : 'light'
  const defaultClasses = `${darkClass} h-dvh w-dvw text-foreground bg-background`

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={defaultClasses}>{children}</div>
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext)
  return context
}
