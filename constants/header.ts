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
  id: string
  Icon: typeof LanguageIcon
  title: string
  to?: (value?: string) => string
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
  { id: 'language', Icon: LanguageIcon, title: 'English', children: LANGUAGE },

  { id: 'feedback', Icon: QuestionIcon, title: 'Feedback and help', to: () => '/feedback' },
  { id: 'keyboard', Icon: KeyboardIcon, title: 'Keyboard shortcuts' },
  { id: 'theme', Icon: ThemeIcon, title: 'Dark mode', isTheme: true },
]

export const USER_ITEMS: Item[] = [
  {
    id: 'profile',
    Icon: ProfileIcon,
    title: 'View Profile',
    to: (value) => {
      return `/`
      // return `/profile/${value}`
    },
  },
  { id: 'coin', Icon: CoinIcon, title: 'Get Coins', to: () => '/' },
  { id: 'live', Icon: LiveIcon, title: 'Live Studio', to: () => '/' },
  { id: 'setting', Icon: SettingIcon, title: 'Settings', to: () => '/' },
  ...NON_USER_ITEMS,
  {
    id: 'auth',
    Icon: LogoutIcon,
    title: 'Log out',
    // to: '/logout',
    isSeparate: true,
  },
]
