import { FollowingIcon, HashtagIcon, HomeIcon, LiveIcon, MusicIcon } from '~/components'

export const MAIN_NAV_SIDEBAR = [
  { Icon: HomeIcon, title: 'Common.forYou', href: '/' },
  { Icon: FollowingIcon, title: 'Common.following', href: '/following' },
  { Icon: LiveIcon, title: 'Common.live', href: '/live' },
]

export const FOOTER_SIDEBAR = {
  layout1: [
    { title: 'Common.about', href: '/' },
    { title: 'Common.newsroom', href: '/' },
    { title: 'Common.contact', href: '/' },
    { title: 'Common.careers', href: '/' },
    { title: 'Common.byteDance', href: '/' },
  ],
  layout2: [
    { title: 'Common.tikTokForGood', href: '/' },
    { title: 'Common.advertise', href: '/' },
    { title: 'Common.developers', href: '/' },
    { title: 'Common.transparency', href: '/' },
    { title: 'Common.tikTokRewards', href: '/' },
    { title: 'Common.tikTokBrowse', href: '/' },
    { title: 'Common.tikTokEmbeds', href: '/' },
  ],
  layout3: [
    { title: 'Common.help', href: '/' },
    { title: 'Common.safety', href: '/' },
    { title: 'Common.terms', href: '/' },
    { title: 'Common.privacy', href: '/' },
    { title: 'Common.creatorPortal', href: '/' },
    { title: 'Common.communityGuidelines', href: '/' },
  ],
  layout4: [{ title: 'Common.copyright', href: null }],
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
