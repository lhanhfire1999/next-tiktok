import classNames from 'classnames/bind'
import Link from 'next/link'

import { LogoIcon } from '~/components/Icons'
import { RightContainer, Search } from './components'

import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <Link href="/">
          <LogoIcon />
        </Link>

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
