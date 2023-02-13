import React from 'react'
import classNames from 'classnames/bind'
import styles from './FooterContainer.module.scss'

import { List } from '~/components'
import { FOOTER_SIDEBAR } from '~/constants'
import { useTranslations } from 'next-intl'

const cx = classNames.bind(styles)

const FooterContainer = () => {
  const t = useTranslations()
  return (
    <div className={cx('wrapper')}>
      {(Object.keys(FOOTER_SIDEBAR) as (keyof typeof FOOTER_SIDEBAR)[]).map((key) => (
        <List key={key} className={cx('list')}>
          {FOOTER_SIDEBAR[key].map(({ title, href }) => (
            <List.Item key={title} href={href} className={cx('item')}>
              {t(title as any)}
            </List.Item>
          ))}
        </List>
      ))}
    </div>
  )
}

export default FooterContainer
