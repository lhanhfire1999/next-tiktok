import classNames from 'classnames/bind'

import { TickIcon } from '~/components/Icons'
import ImageWithFallback from '~/components/ImageWithFallback'
import Popper from '~/components/Popper'
import { useHeaderSearch } from '~/containers/Layout/contexts/HeaderSearchContext'
import useDebounce from '~/hooks/useDebounce'
import { Account } from '~/services/search/type'
import styles from './PopperSearch.module.scss'

interface SearchHistoryAccountProp {
  accountList: Account[]
}

const MOCKUP_DATA = [
  {
    id: 1,
    first_name: 'Đào Lê',
    last_name: 'Phương Hoa',
    full_name: 'Đào Lê Phương Hoa',
    nickname: 'hoaahanassii',
    avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
    bio: `✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !`,
    tick: true,
    followings_count: 1,
    followers_count: 37,
    likes_count: 1000,
    website_url: 'https://fullstack.edu.vn/',
    facebook_url: '',
    youtube_url: '',
    twitter_url: '',
    instagram_url: '',
    created_at: '2022-05-05 23:10:05',
    updated_at: '2022-05-05 23:11:39',
  },
  {
    id: 2,
    first_name: 'Đào Lê',
    last_name: 'Phương Hoa',
    full_name: 'Đào Lê Phương Hoa',
    nickname: 'hoaahanassii',
    avatar: 'https://files.fullstack.edu.vn/f8-tiktok/users/2/627394cb56d66.jpg',
    bio: `✨ 1998 ✨\nVietnam 🇻🇳\nĐỪNG LẤY VIDEO CỦA TÔI ĐI SO SÁNH NỮA. XIN HÃY TÔN TRỌNG !`,
    tick: true,
    followings_count: 1,
    followers_count: 37,
    likes_count: 1000,
    website_url: 'https://fullstack.edu.vn/',
    facebook_url: '',
    youtube_url: '',
    twitter_url: '',
    instagram_url: '',
    created_at: '2022-05-05 23:10:05',
    updated_at: '2022-05-05 23:11:39',
  },
]

const cx = classNames.bind(styles)

const PopperSearch = () => {
  const { searchText } = useHeaderSearch()
  const debouncedSearchText = useDebounce(searchText, 500)

  return (
    <Popper className={cx('search-popper')}>
      <Popper.HeaderTitle className={cx('title')}>Account</Popper.HeaderTitle>

      <Popper.MenuList>
        {MOCKUP_DATA.map((info) => (
          <Popper.MenuItem className={cx('menu-item')} key={info.id} navigateTo={`/@${info.nickname}`}>
            <ImageWithFallback
              src={info.avatar}
              alt={info.nickname}
              width="40"
              height="40"
              className={cx('avatar')}
              objectFit="cover"
              objectPosition="center"
            />

            <div className={cx('info')}>
              <h4 className={cx('full-name')}>
                <span>{info.full_name}</span>
                {info.tick && <TickIcon className={cx('tick-icon')} />}
              </h4>
              <span className={cx('user-name')}>{info.nickname}</span>
            </div>
          </Popper.MenuItem>
        ))}
      </Popper.MenuList>

      <Popper.Footer className={cx('footer')}>
        <p>{`View all results for "${debouncedSearchText}"`}</p>
      </Popper.Footer>
    </Popper>
  )
}

export default PopperSearch
