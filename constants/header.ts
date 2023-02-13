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
  title: 'Common.language',
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
  { id: 'language', Icon: LanguageIcon, title: 'Common.currentLanguage', children: LANGUAGE },

  { id: 'feedback', Icon: QuestionIcon, title: 'Common.feedback', to: () => '/feedback' },
  { id: 'keyboard', Icon: KeyboardIcon, title: 'Common.keyboardShortcuts' },
  { id: 'themeMode', Icon: ThemeIcon, title: 'Common.darkMode', isTheme: true },
]

export const USER_ITEMS: Item[] = [
  {
    id: 'profile',
    Icon: ProfileIcon,
    title: 'Common.viewProfile',
    to: (value) => {
      return `/`
      // return `/profile/${value}`
    },
  },
  { id: 'coin', Icon: CoinIcon, title: 'Common.getCoins', to: () => '/' },
  { id: 'live', Icon: LiveIcon, title: 'Common.liveStudio', to: () => '/' },
  { id: 'setting', Icon: SettingIcon, title: 'Common.settings', to: () => '/' },
  ...NON_USER_ITEMS,
  {
    id: 'auth',
    Icon: LogoutIcon,
    title: 'Auth.signOut',
    // to: '/logout',
    isSeparate: true,
  },
]
