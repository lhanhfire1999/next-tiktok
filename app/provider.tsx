import React from 'react'

import { AuthenticationProvider } from '~/contexts/AuthenticationContext'
import { ThemeProvider } from '~/contexts/ThemeContext'

interface ProviderProp {
  children: React.ReactNode
}

const Provider: React.FC<ProviderProp> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>{children}</AuthenticationProvider>
    </ThemeProvider>
  )
}

export default Provider
