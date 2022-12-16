import React from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>HEADER</div>
    </header>
  )
}

export default Header
