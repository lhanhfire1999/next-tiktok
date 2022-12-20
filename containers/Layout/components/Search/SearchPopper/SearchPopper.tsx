import classNames from 'classnames/bind'

import { TickIcon } from '~/components/Icons'
import ImageWithFallback from '~/components/ImageWithFallback'
import Popper from '~/components/Popper'
import { useSearchPopper } from '~/containers/Layout/contexts/SearchPopperContext'

import styles from './SearchPopper.module.scss'

const cx = classNames.bind(styles)

const SearchPopper = () => {
  const { searchText, accountList, hasShowPopper } = useSearchPopper()

  if (!searchText || !accountList?.length || !hasShowPopper) return null

  return (
    <Popper className={cx('search-popper')}>
      <Popper.HeaderTitle className={cx('title')}>Account</Popper.HeaderTitle>

      <Popper.MenuList>
        {accountList &&
          accountList.map((item) => (
            <Popper.MenuItem className={cx('menu-item')} key={item.id} navigateTo={`/@${item.nickname}`}>
              <ImageWithFallback
                src={item.avatar}
                alt={item.nickname}
                width="40"
                height="40"
                className={cx('avatar')}
                objectFit="cover"
                objectPosition="center"
              />

              <div className={cx('info')}>
                <h4 className={cx('full-name')}>
                  <span>{item.full_name}</span>
                  {item.tick && <TickIcon className={cx('tick-icon')} />}
                </h4>
                <span className={cx('user-name')}>{item.nickname}</span>
              </div>
            </Popper.MenuItem>
          ))}
      </Popper.MenuList>

      <Popper.Footer className={cx('footer')}>
        <p>{`View all results for "${searchText}"`}</p>
      </Popper.Footer>
    </Popper>
  )
}

export default SearchPopper
