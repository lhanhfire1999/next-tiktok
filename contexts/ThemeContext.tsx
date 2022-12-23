'use client'
import { createContext, useContext, useState } from 'react'
import useIsomorphicLayoutEffect from '~/hooks/useIsomorphicLayoutEffect'

enum MODE_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ContextProp {
  isDarkTheme: boolean
  handleChangeTheme: () => void
}

interface ThemeProvider {
  children: React.ReactNode
}

const Context = createContext<ContextProp | null>(null)

export const ThemeProvider: React.FC<ThemeProvider> = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const themeStorage = localStorage!.getItem('theme')
      const preferDarkSchema = window!.matchMedia && window!.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = preferDarkSchema ? MODE_THEME.DARK : MODE_THEME.LIGHT

      return themeStorage ?? defaultTheme
    }
    return MODE_THEME.LIGHT
  })

  const handleChangeTheme = () => {
    setTheme((prev) => {
      if (prev === MODE_THEME.DARK) return MODE_THEME.LIGHT
      return MODE_THEME.DARK
    })
  }

  useIsomorphicLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Context.Provider value={{ isDarkTheme: theme === MODE_THEME.DARK, handleChangeTheme }}>
      {children}
    </Context.Provider>
  )
}

export const useTheme = () => useContext(Context) as ContextProp
