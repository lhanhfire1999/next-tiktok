import React from 'react'
import styles from './UserDetails.module.scss'
import classNames from 'classnames/bind'
import { Button, ImageWithFallback, MusicIcon } from '~/components'
import Link from 'next/link'

const cx = classNames.bind(styles)

const UserDetails = () => {
  return (
    <div className={cx('wrapper')}>
      <i className={cx('wrapper-avatar')}>
        <ImageWithFallback src="/images/no-image.webp" alt="user-avatar" fill={true} className={cx('user-avatar')} />
      </i>
      <Link href="/" className={cx('wrapper-names')}>
        <h3 className={cx('name')}>Mo Farooq</h3>
        <h4 className={cx('user-name')}>mofarooq32</h4>
      </Link>
      <FollowButton />
    </div>
  )
}

const FollowButton = () => {
  return (
    <div className={cx('wrapper-btn')}>
      <Button small primary outlinePrimary className={cx('follow-btn')} onClick={() => null}>
        Follow
      </Button>
    </div>
  )
}

export default UserDetails
