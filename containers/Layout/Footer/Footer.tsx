'use client'
import className from 'classnames/bind'
import Link from 'next/link'
import { useState } from 'react'
import { ImageWithFallback, List, SelectMenu } from '~/components'
import { LANGUAGE } from '~/constants'
import styles from './Footer.module.scss'
const cx = className.bind(styles)

const FOOTER_STATIC_DATA = {
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

const FOOTER_STATIC_DATA_KEYS = Object.keys(FOOTER_STATIC_DATA) as Array<keyof typeof FOOTER_STATIC_DATA>

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const [isShowLanguage, setIsShowLanguage] = useState(false)

  const handleShowLanguage = () => {
    setIsShowLanguage((prev) => !prev)
  }

  const handleChangeLanguage = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <footer className={cx('footer')}>
      <div className={cx('wrapper-footer-content')}>
        <div className={cx('wrapper-column', 'logo')}>
          <Link href="/">
            <ImageWithFallback src="/images/logo-theme-dark.svg" alt="TikTok" width={118} height={42} />
          </Link>
        </div>

        {FOOTER_STATIC_DATA_KEYS.map((titleName) => (
          <div className={cx(`wrapper-column`)} key={titleName}>
            <h4>{titleName.slice(0, 1).toUpperCase() + titleName.slice(1)}</h4>

            <List className={cx('list')}>
              {FOOTER_STATIC_DATA[titleName].map((item) => (
                <List.Item href={item.href} className={cx('item')} key={item.content}>
                  {item.content}
                </List.Item>
              ))}
            </List>
          </div>
        ))}
      </div>

      <div className={cx('wrapper-footer-bottom')}>
        <SelectMenu
          wrapperClassName={cx('wrapper-language')}
          data={LANGUAGE.data.map((item) => item.title)}
          onClick={handleShowLanguage}
          isActive={isShowLanguage}
          onClickItem={handleChangeLanguage}
          listClassName={cx('language-list')}
        >
          {selectedLanguage}
        </SelectMenu>
        <div className={cx('copyright')}>© 2023 TikTok</div>
      </div>
    </footer>
  )
}

export default Footer
