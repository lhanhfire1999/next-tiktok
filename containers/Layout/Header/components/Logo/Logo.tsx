import Image from 'next/image'
import Link from 'next/link'
import { useSWRConfig } from 'swr'

import { useTheme } from '~/contexts/ThemeContext'

const Logo = () => {
  const { isDarkTheme } = useTheme()
  const { mutate } = useSWRConfig()

  const handleClickLogo = () => {
    mutate('follow-account')
  }

  return (
    <Link href="/" onClick={handleClickLogo}>
      <Image
        src={isDarkTheme ? '/images/logo-theme-dark.svg' : '/images/logo-theme-light.svg'}
        alt="TikTok"
        width={118}
        height={42}
      />
    </Link>
  )
}

export default Logo
