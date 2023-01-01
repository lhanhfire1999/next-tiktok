'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { AuthenticationProvider } from '~/contexts/AuthenticationContext'
import { AuthModalProvider } from '~/contexts/AuthModalContext'
import { ThemeProvider } from '~/contexts/ThemeContext'

interface ProviderProp {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProp> = ({ children }) => {
  return (
    <SessionProvider>
      <AuthModalProvider>
        <ThemeProvider>
          <AuthenticationProvider>{children}</AuthenticationProvider>
        </ThemeProvider>
      </AuthModalProvider>
    </SessionProvider>
  )
}

export default Provider
