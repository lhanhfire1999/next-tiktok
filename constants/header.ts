import {
  CoinIcon,
  KeyboardIcon,
  LanguageIcon,
  LiveIcon,
  LogoutIcon,
  ProfileIcon,
  QuestionIcon,
  SettingIcon,
  ThemeIcon,
} from '~/components'

interface Item {
  Icon: typeof LanguageIcon
  title: string
  to?: string
  isTheme?: boolean
  isSeparate?: boolean
  children?: Language
}

interface Language {
  title: string
  data: {
    type: string
    code: string
    title: string
  }[]
}

export const LANGUAGE: Language = {
  title: 'Language',
  data: [
    {
      type: 'language',
      code: 'en',
      title: 'English',
    },
    {
      type: 'language',
      code: 'vi',
      title: 'Tiếng Việt',
    },
  ],
}

export const NON_USER_ITEMS: Item[] = [
  {
    Icon: LanguageIcon,
    title: 'English',
    children: LANGUAGE,
  },

  { Icon: QuestionIcon, title: 'Feedback and help', to: '/feedback' },
  { Icon: KeyboardIcon, title: 'Keyboard shortcuts' },
  { Icon: ThemeIcon, title: 'Dark mode', isTheme: true },
]

export const USER_ITEMS: Item[] = [
  { Icon: ProfileIcon, title: 'View Profile', to: '/@tess' },
  { Icon: CoinIcon, title: 'Get Coins', to: '/coin' },
  { Icon: LiveIcon, title: 'Live Studio', to: '/studio' },
  { Icon: SettingIcon, title: 'Settings', to: '/settings' },
  ...NON_USER_ITEMS,
  {
    Icon: LogoutIcon,
    title: 'Log out',
    // to: '/logout',
    isSeparate: true,
  },
]
