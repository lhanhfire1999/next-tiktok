import '../styles/App.scss'
import { Roboto } from '@next/font/google'
import { Layout } from '~/containers'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'fallback',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className} mdl-js`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
