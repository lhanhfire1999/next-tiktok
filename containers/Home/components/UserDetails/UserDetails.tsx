import React from 'react'
import styles from './UserDetails.module.scss'
import classNames from 'classnames/bind'
import { Button, ImageWithFallback, MusicIcon } from '~/components'

const cx = classNames.bind(styles)

const UserDetails = () => {
  return (
    <div className={cx('wrapper')}>
      <i className={cx('wrapper-avatar')}>
        <ImageWithFallback src="/images/no-image.webp" alt="user-avatar" fill={true} className={cx('user-avatar')} />
      </i>
      <div className={cx('wrapper-names')}>
        <h3 className={cx('name')}>Mo Farooq</h3>
        <h4 className={cx('user-name')}>mofarooq32</h4>
      </div>
      <FollowButton />
    </div>
  )
}

const FollowButton = () => {
  return (
    <Button small primary outlinePrimary className={cx('follow-btn')} onClick={() => null}>
      Follow
    </Button>
  )
}

export default UserDetails
