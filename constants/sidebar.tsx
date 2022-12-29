import { FollowingIcon, HomeIcon, LiveIcon } from '~/components'

export const MAIN_NAV_SIDEBAR = [
  { Icon: HomeIcon, title: 'For You', href: '/' },
  { Icon: FollowingIcon, title: 'Following', href: '/following' },
  { Icon: LiveIcon, title: 'LIVE', href: '/live' },
]

export const FOOTER_SIDEBAR = {
  layout1: [
    { title: 'About', href: '/' },
    { title: 'Newsroom ', href: '/' },
    { title: 'Contact ', href: '/' },
    { title: 'Careers ', href: '/' },
    { title: 'ByteDance', href: '/' },
  ],
  layout2: [
    { title: 'TikTok for Good', href: '/' },
    { title: 'Advertise  ', href: '/' },
    { title: 'Developers  ', href: '/' },
    { title: 'Transparency  ', href: '/' },
    { title: 'TikTok Rewards', href: '/' },
    { title: 'TikTok Browse', href: '/' },
    { title: 'TikTok Embeds', href: '/' },
  ],
  layout3: [
    { title: 'Help', href: '/' },
    { title: 'Safety ', href: '/' },
    { title: 'Terms ', href: '/' },
    { title: 'Privacy ', href: '/' },
    { title: 'Creator Portal', href: '/' },
    { title: 'Community Guidelines', href: '/' },
  ],
  layout4: [{ title: '© 2022 TikTok', href: null }],
}
