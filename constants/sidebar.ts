import { FollowingIcon, HashtagIcon, HomeIcon, LiveIcon, MusicIcon } from '~/components'

export const MAIN_NAV_SIDEBAR = [
  { Icon: HomeIcon, title: 'Common.forYou', href: '/' },
  { Icon: FollowingIcon, title: 'Common.following', href: '/following' },
  { Icon: LiveIcon, title: 'Common.live', href: '/live' },
]

export const FOOTER_SIDEBAR = {
  layout1: [
    { title: 'Footer.about', href: '/' },
    { title: 'Footer.newsroom', href: '/' },
    { title: 'Footer.contact', href: '/' },
    { title: 'Footer.careers', href: '/' },
    { title: 'Footer.byteDance', href: '/' },
  ],
  layout2: [
    { title: 'Footer.tikTokForGood', href: '/' },
    { title: 'Footer.advertise', href: '/' },
    { title: 'Footer.developers', href: '/' },
    { title: 'Footer.transparency', href: '/' },
    { title: 'Footer.tikTokRewards', href: '/' },
    { title: 'Footer.tikTokBrowse', href: '/' },
    { title: 'Footer.tikTokEmbeds', href: '/' },
  ],
  layout3: [
    { title: 'Footer.help', href: '/' },
    { title: 'Footer.safety', href: '/' },
    { title: 'Footer.terms', href: '/' },
    { title: 'Footer.privacy', href: '/' },
    { title: 'Footer.creatorPortal', href: '/' },
    { title: 'Footer.communityGuidelines', href: '/' },
  ],
  layout4: [{ title: 'Footer.copyright', href: null }],
}

export const DISCOVER_CONTAINER_SIDEBAR = [
  { title: 'STAY - The Kid LAROI, Justin Bieber', Icon: HashtagIcon, href: '/' },
  { title: 'Industry Baby - Lil Nas X, Jack Harlow', Icon: HashtagIcon, href: '/' },
  { title: 'Ckay - Love Nwantiti', Icon: MusicIcon, href: '/' },
  { title: 'Build a Bitch - Bella Poarch', Icon: MusicIcon, href: '/' },
  { title: 'Doja Cat - Need to Know', Icon: HashtagIcon, href: '/' },
  { title: 'Bad Together - Lucas Estrada, Bhaskar, Pawl', Icon: MusicIcon, href: '/' },
  { title: 'Whiskey Song - NSH', Icon: HashtagIcon, href: '/' },
  { title: 'Toxic - BoyWithUke', Icon: HashtagIcon, href: '/' },
]
