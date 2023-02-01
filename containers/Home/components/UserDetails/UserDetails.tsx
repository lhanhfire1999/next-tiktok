import classNames from 'classnames/bind'
import Link from 'next/link'
import React from 'react'

import { Button, ImageWithFallback } from '~/components'

import styles from './UserDetails.module.scss'

const cx = classNames.bind(styles)

interface FollowButtonProps {
  isFollowing: boolean
}
interface UserDetailsProps extends FollowButtonProps {
  name: string
  userName: string
  imgSrc: string
  imgAlt: string
}

const UserDetails: React.FC<UserDetailsProps> = ({ imgSrc, imgAlt, name, userName, isFollowing }) => {
  return (
    <div className={cx('wrapper')}>
      <i className={cx('wrapper-avatar')}>
        <ImageWithFallback src={imgSrc} alt={imgAlt} fill={true} className={cx('user-avatar')} />
      </i>
      <Link href="/" className={cx('wrapper-names')}>
        <h3 className={cx('name')}>{name}</h3>
        <h4 className={cx('user-name')}>{userName}</h4>
      </Link>
      <FollowButton isFollowing={isFollowing} />
    </div>
  )
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing }) => {
  return (
    <div className={cx('wrapper-btn')}>
      <Button
        small
        primary={!isFollowing}
        outlinePrimary={!isFollowing}
        outlineGray={isFollowing}
        className={cx('follow-btn')}
        onClick={() => null}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}

export default UserDetails
