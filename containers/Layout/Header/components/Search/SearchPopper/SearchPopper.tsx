import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'

import { ImageWithFallback, Popper, TickIcon } from '~/components'
import { useSearchPopper } from '../contexts/SearchPopperContext'

import styles from './SearchPopper.module.scss'

const cx = classNames.bind(styles)

const SearchPopper = () => {
  const t = useTranslations()
  const { searchText, accountList, hasShowPopper } = useSearchPopper()

  if (!searchText || !accountList?.length || !hasShowPopper) return null

  return (
    <Popper className={cx('search-popper')}>
      <Popper.HeaderTitle className={cx('title')}>{t('Common.account')}</Popper.HeaderTitle>

      <Popper.MenuList>
        {accountList &&
          accountList.map((item) => (
            <Popper.MenuItem className={cx('menu-item')} key={item.id} href={`/profile/@${item.nickname}`}>
              <ImageWithFallback
                src={item.avatar}
                alt={item.nickname}
                width="40"
                height="40"
                className={cx('avatar')}
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
        <p>{`${t('Common.viewAllResultsFor')} "${searchText}"`}</p>
      </Popper.Footer>
    </Popper>
  )
}

export default SearchPopper
