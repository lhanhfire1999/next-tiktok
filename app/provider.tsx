'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { AuthModalProvider } from '~/contexts/AuthModalContext'
import { ThemeProvider } from '~/contexts/ThemeContext'

interface ProviderProp {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProp> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthModalProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthModalProvider>
    </SessionProvider>
  )
}

export default Provider
