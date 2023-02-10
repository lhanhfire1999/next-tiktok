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
  { Icon: QRIcon, titleKey: 'ModalAuth.qr' },
  { Icon: UserIcon, titleKey: 'ModalAuth.private' },
  { Icon: FacebookIcon, titleKey: 'ModalAuth.facebook' },
  {
    Icon: GoogleIcon,
    titleKey: 'ModalAuth.google',
    onClick: () => signIn('google', { callbackUrl: '/' }),
  },
  { Icon: TwitterIcon, titleKey: 'ModalAuth.twitter' },
  { Icon: LineIcon, titleKey: 'ModalAuth.line' },
  { Icon: KaKaoTalkIcon, titleKey: 'ModalAuth.kakaoTalk' },
  { Icon: AppleIcon, titleKey: 'ModalAuth.apple' },
  { Icon: InstagramIcon, titleKey: 'ModalAuth.instagram' },
]
