import '../styles/App.scss'
import { Roboto } from '@next/font/google'
import { DefaultLayout } from '~/containers'
import { ThemeProvider } from '~/contexts/ThemeContext'
import { AuthenticationProvider } from '~/contexts/AuthenticationContext'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'fallback',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className} mdl-js`}>
      <body>
        <ThemeProvider>
          <AuthenticationProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </AuthenticationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
