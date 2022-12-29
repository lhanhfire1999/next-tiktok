import classNames from 'classnames/bind'
import { usePathname } from 'next/navigation'
import { useId } from 'react'

import { List } from '~/components'
import { MAIN_NAV_SIDEBAR } from '~/constants'
import styles from './MainNavContainer.module.scss'

const cx = classNames.bind(styles)

const MainNavContainer = () => {
  const id = useId()
  const pathName = usePathname()

  return (
    <List>
      {MAIN_NAV_SIDEBAR.map(({ Icon, title, href }, key) => (
        <List.Item key={key} className={cx('wrapper-item')} href={href}>
          <input type="radio" id={id + `-${key}`} defaultChecked={pathName === href} />
          <label htmlFor={id + `-${key}`}>
            <i className={cx('wrapper-icon')}>
              <Icon width="3.2rem" height="3.2rem" className={cx('icon')} />
            </i>
            <h4 className={cx('title')}>{title}</h4>
          </label>
        </List.Item>
      ))}
    </List>
  )
}

export default MainNavContainer
