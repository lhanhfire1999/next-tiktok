import classNames from 'classnames/bind'
import Link from 'next/link'

import { LogoIcon } from '~/components/Icons'
import Search from '../Search'
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
        </Search>

        <div>ACTION</div>
      </div>
    </header>
  )
}

export default Header
