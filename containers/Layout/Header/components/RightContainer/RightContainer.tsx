import classNames from 'classnames/bind'
import React from 'react'
import { Button, UploadIcon } from '~/components'
import Profile from './Profile'
import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

const RightContainer = () => {
  const hasToken = false
  return (
    <div className={cx('wrapper')}>
      <Button href="upload" outlineGray LeftIcon={<UploadIcon width="100%" height="100%" />}>
        Upload
      </Button>
      <Button primary>Login</Button>

      <Profile>
        <Profile.AvatarOrIcon />
        <Profile.MenuPopper />
      </Profile>
    </div>
  )
}

export default RightContainer
