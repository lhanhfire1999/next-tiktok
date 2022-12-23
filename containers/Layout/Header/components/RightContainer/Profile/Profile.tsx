import classNames from 'classnames/bind'
import React from 'react'

import { Button, MoreIcon, Popper, ToggleButton } from '~/components'

import { NON_USER_ITEMS } from '~/constants'

import styles from './Profile.module.scss'
const cx = classNames.bind(styles)

interface ProfileProp {
  children: React.ReactNode
}

const Profile: React.FC<ProfileProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const AvatarOrIcon = () => {
  return <MoreIcon className={cx('more-icon')} width="2rem" height="2rem" />
}

const MenuPopper = () => {
  return (
    <Popper className={cx('popper-wrapper')}>
      <Popper.MenuList>
        {NON_USER_ITEMS.map(({ Icon, title, to, isTheme }, index) => (
          <Popper.MenuItem key={index} className={cx('wrapper-item')}>
            <Button href={to} className={cx('item')} LeftIcon={<Icon />}>
              {title}
            </Button>
            {isTheme && <ToggleButton />}
          </Popper.MenuItem>
        ))}
      </Popper.MenuList>
    </Popper>
  )
}

const CompoundProfile = Object.assign(Profile, { AvatarOrIcon, MenuPopper })
export default CompoundProfile
