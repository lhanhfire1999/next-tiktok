'use client'
import { createContext, useContext, useState } from 'react'

interface Context {
  token: string
  handleSignIn: () => void
  handleSignOut: () => void
}

interface ProviderContext {
  children: React.ReactNode
}

const Context = createContext<Context | null>(null)

export const AuthenticationProvider: React.FC<ProviderContext> = ({ children }) => {
  const [token, setToken] = useState('')
  const handleSignIn = () => {
    setToken('sign-in')
  }

  const handleSignOut = () => {
    setToken('')
  }

  return <Context.Provider value={{ token, handleSignIn, handleSignOut }}>{children}</Context.Provider>
}

export const useAuthentication = () => useContext(Context) as Context
