import classNames from 'classnames/bind'
import { List } from '~/components'
import { DISCOVER_CONTAINER_SIDEBAR } from '~/constants'
import styles from './DiscoverContainer.module.scss'

const cx = classNames.bind(styles)

const DiscoverContainer = () => {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('header')}>Discover</h4>
      <List className={cx('list')}>
        {DISCOVER_CONTAINER_SIDEBAR.map(({ title, Icon, href }) => (
          <List.Item className={cx('item')} key={title} href={href}>
            <Icon className={cx('icon')} />
            <p className={cx('title')}>{title}</p>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default DiscoverContainer
