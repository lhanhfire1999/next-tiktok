import Image from 'next/image'
import { useSWRConfig } from 'swr'
import { LocalizedLink } from '~/components'

import { useTheme } from '~/contexts/ThemeContext'

const Logo = () => {
  const { isDarkTheme } = useTheme()
  const { mutate } = useSWRConfig()

  const handleClickLogo = () => {
    mutate('follow-account')
  }

  return (
    <LocalizedLink href="/" onClick={handleClickLogo}>
      <Image
        src={isDarkTheme ? '/images/logo-theme-dark.svg' : '/images/logo-theme-light.svg'}
        alt="TikTok"
        width={118}
        height={42}
      />
    </LocalizedLink>
  )
}

export default Logo
