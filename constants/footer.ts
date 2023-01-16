export const FOOTER_STATIC_DATA = {
  company: [
    { href: '/', content: 'About' },
    { href: '/', content: 'Newsroom' },
    { href: '/', content: 'Contact' },
    { href: '/', content: 'Careers' },
    { href: '/', content: 'ByteDance' },
  ],
  programs: [
    { href: '/', content: 'TikTok for Good' },
    { href: '/', content: 'Advertise' },
    { href: '/', content: 'Developers' },
    { href: '/', content: 'TikTok Rewards' },
    { href: '/', content: 'TikTok Browse' },
    { href: '/', content: 'TikTok Embeds' },
  ],
  support: [
    { href: '/', content: 'Help Center' },
    { href: '/', content: 'Safety Center' },
    { href: '/', content: 'Creator Portal' },
    { href: '/', content: 'Community Guidelines' },
    { href: '/', content: 'Transparency' },
    { href: '/', content: 'Accessibility' },
  ],
  legal: [
    { href: '/', content: 'Terms of Use' },
    { href: '/', content: 'Privacy Policy' },
  ],
}

export const FOOTER_STATIC_DATA_KEYS = Object.keys(FOOTER_STATIC_DATA) as Array<keyof typeof FOOTER_STATIC_DATA>
