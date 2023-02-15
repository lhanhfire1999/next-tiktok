export const FOOTER_STATIC_DATA = {
  company: [
    { title: 'about', href: '/' },
    { title: 'newsroom', href: '/' },
    { title: 'contact', href: '/' },
    { title: 'careers', href: '/' },
    { title: 'byteDance', href: '/' },
  ],
  programs: [
    { title: 'tikTokForGood', href: '/' },
    { title: 'advertise', href: '/' },
    { title: 'developers', href: '/' },
    { title: 'tikTokRewards', href: '/' },
    { title: 'tikTokBrowse', href: '/' },
    { title: 'tikTokEmbeds', href: '/' },
  ],
  support: [
    { title: 'help', href: '/' },
    { title: 'safety', href: '/' },
    { title: 'creatorPortal', href: '/' },
    { title: 'communityGuidelines', href: '/' },
    { title: 'transparency', href: '/' },
    { title: 'accessibility', href: '/' },
  ],
  legal: [
    { title: 'termsOfUse', href: '/' },
    { title: 'privacyPolicy', href: '/' },
  ],
}

export const FOOTER_STATIC_DATA_KEYS = Object.keys(FOOTER_STATIC_DATA) as Array<keyof typeof FOOTER_STATIC_DATA>
