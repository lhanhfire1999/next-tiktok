'use client'

import classNames from 'classnames/bind'

import { Logo, RightContainer, Search } from './components'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <Logo />

        <Search>
          <Search.SearchBar />
          <Search.PopperSearch />
        </Search>

        <RightContainer />
      </div>
    </header>
  )
}

export default Header
