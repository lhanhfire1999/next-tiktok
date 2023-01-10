'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

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
  const [theme, setTheme] = useState<string>(MODE_THEME.LIGHT)
  const isFirstRenderRef = useRef(true)

  const handleChangeTheme = () => {
    setTheme((prev) => {
      if (prev === MODE_THEME.DARK) return MODE_THEME.LIGHT
      return MODE_THEME.DARK
    })
  }

  useEffect(() => {
    if (isFirstRenderRef.current) {
      const themeStorage = localStorage!.getItem('theme')
      const preferDarkSchema = window!.matchMedia && window!.matchMedia('(prefers-color-scheme: dark)').matches
      const defaultTheme = themeStorage || (preferDarkSchema ? MODE_THEME.DARK : MODE_THEME.LIGHT)

      if (defaultTheme !== theme) {
        document.documentElement.setAttribute('data-theme', defaultTheme)
        localStorage.setItem('theme', defaultTheme)
        setTheme(defaultTheme)
      }
      isFirstRenderRef.current = false
      return
    }

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
