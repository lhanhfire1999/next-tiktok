import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'

import React from 'react'

import { Button, ImageWithFallback, LocalizedLink } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { Discover } from '~/services/discover'
import { useHomeDiscover } from '../../contexts'

import styles from './UserDetails.module.scss'

const cx = classNames.bind(styles)

interface FollowButtonProps {
  isFollowing: boolean
  discoverId: number
  username: string
}
interface UserDetailsProps {
  data: Discover
}

const UserDetails: React.FC<UserDetailsProps> = ({ data }) => {
  return (
    <div className={cx('wrapper')}>
      <i className={cx('wrapper-avatar')}>
        <ImageWithFallback src={data.avatar} alt={data.name} fill={true} className={cx('user-avatar')} />
      </i>
      <LocalizedLink href="/" className={cx('wrapper-names')}>
        <h3 className={cx('name')}>{data.name}</h3>
        <h4 className={cx('user-name')}>{data.username}</h4>
      </LocalizedLink>
      <FollowButton isFollowing={data.is_followed} discoverId={data.id} username={data.username} />
    </div>
  )
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, discoverId, username }) => {
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const { handleUpdateFollow } = useHomeDiscover()

  const handleClickFollowButton = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }
    handleUpdateFollow(discoverId, username)
  }

  return (
    <div className={cx('wrapper-btn')}>
      <Button
        small
        primary={!isFollowing}
        outlinePrimary={!isFollowing}
        outlineGray={isFollowing}
        className={cx('follow-btn')}
        onClick={handleClickFollowButton}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}

export default UserDetails
