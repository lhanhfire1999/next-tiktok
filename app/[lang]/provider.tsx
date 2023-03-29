'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { NextIntlClientProvider } from 'next-intl/client'
import { Locale } from '~/locales/i18n-config'
import { AuthModalProvider, SocketProvider, ThemeProvider } from '~/contexts'

interface ProviderProp {
  children: React.ReactNode
  locale: Locale
  messages: any
}

const Provider: React.FC<ProviderProp> = ({ children, ...restProps }) => {
  return (
    <SocketProvider>
      <NextIntlClientProvider {...restProps}>
        <SessionProvider>
          <AuthModalProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AuthModalProvider>
        </SessionProvider>
      </NextIntlClientProvider>
    </SocketProvider>
  )
}

export default Provider
