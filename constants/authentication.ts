import { signIn } from 'next-auth/react'
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  KaKaoTalkIcon,
  LineIcon,
  QRIcon,
  TwitterIcon,
  UserIcon,
} from '~/components'

export const AUTH_MODAL_DATA = [
  { Icon: QRIcon, title: 'Use QR code' },
  { Icon: UserIcon, title: 'Use phone / mail / username' },
  { Icon: FacebookIcon, title: 'Use with Facebook' },
  {
    Icon: GoogleIcon,
    title: 'Use with Google',
    onClick: () => signIn('google', { callbackUrl: '/' }),
  },
  { Icon: TwitterIcon, title: 'Use with Twitter' },
  { Icon: LineIcon, title: 'Use with Line' },
  { Icon: KaKaoTalkIcon, title: 'Use with KaKaoTalk' },
  { Icon: AppleIcon, title: 'Use with Apple' },
  { Icon: InstagramIcon, title: 'Use with Instagram' },
]
