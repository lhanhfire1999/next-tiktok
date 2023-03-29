import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'

import React from 'react'

import { Button, ImageWithFallback, LocalizedLink } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { Discover } from '~/services/discover'

import styles from './UserDetails.module.scss'

const cx = classNames.bind(styles)

interface UserDetailsProps {
  data: Discover
  className?: string
  onUpdateFollow: (id: string, username: string) => void | Promise<void>
}

const UserDetails: React.FC<UserDetailsProps> = ({ data, className, onUpdateFollow }) => {
  const { id, username, is_followed, avatar, name } = data
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()

  const handleClickFollowButton = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }

    onUpdateFollow(id, username)
  }

  return (
    <div className={cx(className, 'wrapper')}>
      <i className={cx('wrapper-avatar')}>
        <ImageWithFallback src={avatar} alt={name} fill={true} className={cx('user-avatar')} />
      </i>
      <LocalizedLink href="/" className={cx('wrapper-names')}>
        <h3 className={cx('name')}>{name}</h3>
        <h4 className={cx('user-name')}>{username}</h4>
      </LocalizedLink>

      <div className={cx('wrapper-btn')}>
        <Button
          small
          primary={!is_followed}
          outlinePrimary={!is_followed}
          outlineGray={is_followed}
          className={cx('follow-btn')}
          onClick={handleClickFollowButton}
        >
          {is_followed ? 'Following' : 'Follow'}
        </Button>
      </div>
    </div>
  )
}

export default UserDetails
