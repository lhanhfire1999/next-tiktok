import classNames from 'classnames/bind'
import Image from 'next/image'
import React from 'react'

import { Button, MoreIcon, Popper } from '~/components'
import { NON_USER_ITEMS, USER_ITEMS } from '~/constants'
import { useAuthentication } from '~/contexts/AuthenticationContext'
import ToggleThemeButton from '../ToggleThemeButton'
import styles from './Profile.module.scss'

const cx = classNames.bind(styles)

interface ProfileProp {
  children: React.ReactNode
}

const Profile: React.FC<ProfileProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const AvatarOrIcon = () => {
  const { token } = useAuthentication()
  if (token) return <Image src="/images/no-image.webp" alt="Avatar" className={cx('avatar')} width={32} height={32} />

  return <MoreIcon className={cx('more-icon')} width="2rem" height="2rem" />
}

const MenuPopper = () => {
  const { token, handleSignOut } = useAuthentication()

  const LIST = React.useMemo(() => {
    return token ? USER_ITEMS : NON_USER_ITEMS
  }, [token])

  return (
    <Popper className={cx('popper-wrapper')}>
      <Popper.MenuList>
        {LIST.map(({ Icon, title, to, isTheme, isSeparate }, index) => (
          <Popper.MenuItem key={index} className={cx('wrapper-item', { separate: isSeparate })}>
            <Button
              href={to}
              className={cx('item')}
              LeftIcon={<Icon />}
              onClick={isSeparate ? handleSignOut : undefined}
            >
              {title}
            </Button>
            {isTheme && <ToggleThemeButton />}
          </Popper.MenuItem>
        ))}
      </Popper.MenuList>
    </Popper>
  )
}

const CompoundProfile = Object.assign(Profile, { AvatarOrIcon, MenuPopper })
export default CompoundProfile
