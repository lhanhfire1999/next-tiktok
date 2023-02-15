import classNames from 'classnames/bind'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { List } from '~/components'
import { MAIN_NAV_SIDEBAR } from '~/constants'
import { getLocalizedHref } from '~/utils'
import styles from './MainNavContainer.module.scss'

const cx = classNames.bind(styles)

const MainNavContainer = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = useLocale()

  return (
    <List>
      {MAIN_NAV_SIDEBAR.map(({ Icon, title, href }, key) => {
        return (
          <List.Item
            key={key}
            className={cx('wrapper-item', { active: pathname === getLocalizedHref(href, locale) })}
            href={href}
          >
            <i className={cx('wrapper-icon')}>
              <Icon width="3.2rem" height="3.2rem" className={cx('icon')} />
            </i>
            <h4 className={cx('title')}>{t(title as any)}</h4>
          </List.Item>
        )
      })}
    </List>
  )
}

export default MainNavContainer
