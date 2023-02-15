'use client'
import className from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { ImageWithFallback, List, LocalizedLink } from '~/components'
import { FOOTER_STATIC_DATA, FOOTER_STATIC_DATA_KEYS } from '~/constants'
import SelectLanguage from './components/FooterSelectLanguage'
import styles from './Footer.module.scss'
const cx = className.bind(styles)

const Footer = () => {
  const t = useTranslations('Footer')
  return (
    <footer className={cx('footer')}>
      <div className={cx('wrapper-footer-content')}>
        <div className={cx('wrapper-column', 'logo')}>
          <LocalizedLink href="/">
            <ImageWithFallback src="/images/logo-theme-dark.svg" alt="TikTok" width={118} height={42} />
          </LocalizedLink>
        </div>

        {FOOTER_STATIC_DATA_KEYS.map((titleName) => (
          <div className={cx(`wrapper-column`)} key={titleName}>
            <h4>{t(titleName)}</h4>

            <List className={cx('list')}>
              {FOOTER_STATIC_DATA[titleName].map((item) => (
                <List.Item href={item.href} className={cx('item')} key={item.title}>
                  {t(item.title as any)}
                </List.Item>
              ))}
            </List>
          </div>
        ))}
      </div>

      <SelectLanguage />
    </footer>
  )
}

export default Footer
