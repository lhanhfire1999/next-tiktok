import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import { Button, ImageWithFallback } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { Discover } from '~/services/discover'
import { useHomeDiscover } from '../../contexts'

import styles from './UserDetails.module.scss'

const cx = classNames.bind(styles)

interface FollowButtonProps {
  isFollowing: boolean
  discoverId: number
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
      <Link href="/" className={cx('wrapper-names')}>
        <h3 className={cx('name')}>{data.name}</h3>
        <h4 className={cx('user-name')}>{data.username}</h4>
      </Link>
      <FollowButton isFollowing={data.is_followed} discoverId={data.id} />
    </div>
  )
}

const FollowButton: React.FC<FollowButtonProps> = ({ isFollowing, discoverId }) => {
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const { handleUpdateFollow } = useHomeDiscover()

  const handleClickFollowButton = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }
    handleUpdateFollow(discoverId)
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
