import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'

import { List } from '~/components'
import { DISCOVER_CONTAINER_SIDEBAR } from '~/constants'

import styles from './DiscoverContainer.module.scss'

const cx = classNames.bind(styles)

const DiscoverContainer = () => {
  const t = useTranslations('Common')

  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('header')}>{t('discover')}</h4>
      <List className={cx('list')}>
        {DISCOVER_CONTAINER_SIDEBAR.map(({ title, Icon, href }) => (
          <List.Item className={cx('item')} key={title} href={href}>
            <Icon className={cx('icon')} />
            <p className={cx('title')} title={title}>
              {title}
            </p>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default DiscoverContainer
