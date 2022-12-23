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

export const NON_USER_ITEMS = [
  {
    Icon: LanguageIcon,
    title: 'English',
    children: {
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
    },
  },

  { Icon: QuestionIcon, title: 'Feedback and help', to: '/feedback' },
  { Icon: KeyboardIcon, title: 'Keyboard shortcuts' },
  { Icon: ThemeIcon, title: 'Dark mode', isTheme: true },
]

export const USER_ITEMS = [
  { Icon: ProfileIcon, title: 'View Profile', to: '/@tess' },
  { Icon: CoinIcon, title: 'Get Coins', to: '/coin' },
  { Icon: LiveIcon, title: 'Live Studio', to: '/studio/download' },
  { Icon: SettingIcon, title: 'Settings', to: '/settings' },

  { ...NON_USER_ITEMS },
  { Icon: LogoutIcon, title: 'Log out', to: '/logout', isSeparate: true },
]
