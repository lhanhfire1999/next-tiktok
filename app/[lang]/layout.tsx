import { Roboto } from '@next/font/google'
import { notFound } from 'next/navigation'

import { DefaultLayout } from '~/containers'
import { i18n, Locale } from '~/locales/i18n-config'
import Provider from './provider'

import '~/styles/App.scss'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'fallback',
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  let messages
  try {
    messages = (await import(`~/locales/${lang}/translation.json`)).default
  } catch (error) {
    console.log(error)
    notFound()
  }

  return (
    <html lang={lang} className={`${roboto.className} mdl-js`}>
      <body>
        <Provider locale={lang} messages={messages}>
          <DefaultLayout>{children}</DefaultLayout>
        </Provider>
      </body>
    </html>
  )
}
