'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { AuthModalProvider } from '~/contexts/AuthModalContext'
import { ThemeProvider } from '~/contexts/ThemeContext'
import { Locale } from '~/locales/i18n-config'
import { NextIntlClientProvider } from 'next-intl/client'

interface ProviderProp {
  children: React.ReactNode
  locale: Locale
  messages: any
}

const Provider: React.FC<ProviderProp> = ({ children, ...restProps }) => {
  return (
    <NextIntlClientProvider {...restProps}>
      <SessionProvider>
        <AuthModalProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthModalProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}

export default Provider
