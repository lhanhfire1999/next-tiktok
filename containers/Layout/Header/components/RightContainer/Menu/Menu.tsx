import classNames from 'classnames/bind'
import { signOut, useSession } from 'next-auth/react'
import React, { useRef } from 'react'

import { BackIcon, Button, ImageWithFallback, MoreIcon, Popper } from '~/components'
import { DEFAULT_IMAGE_FALLBACK, LANGUAGE, NON_USER_ITEMS, USER_ITEMS } from '~/constants'
import useOnClickOutside from '~/hooks/useOnClickOutside'
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext'
import { MenuPopperProvider, useMenuPopper } from '../contexts/MenuPopperContext'
import ToggleThemeButton from '../ToggleThemeButton'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

interface Children {
  children: React.ReactNode
}

const Menu: React.FC<Children> = ({ children }) => {
  return (
    <LanguageProvider>
      <MenuPopperProvider>{children}</MenuPopperProvider>
    </LanguageProvider>
  )
}

const Wrapper: React.FC<Children> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { isShowing: isShowingPopper, handleChangeShowPopper } = useMenuPopper()
  const { handleChangeShowLanguages } = useLanguage()

  useOnClickOutside(wrapperRef, () => {
    handleChangeShowPopper(false)
  })

  const handleOnMouseLeave = () => {
    handleChangeShowPopper(false)
    handleChangeShowLanguages(false)
  }

  return (
    <div
      className={cx('wrapper', { active: isShowingPopper })}
      ref={wrapperRef}
      onMouseEnter={handleChangeShowPopper.bind(null, true)}
      onMouseLeave={handleOnMouseLeave}
    >
      {children}
    </div>
  )
}

const AvatarOrIcon = () => {
  const { data: session } = useSession()
  if (session)
    return (
      <ImageWithFallback
        src={session.user?.image || DEFAULT_IMAGE_FALLBACK}
        alt="Avatar"
        className={cx('avatar')}
        width={32}
        height={32}
      />
    )

  return <MoreIcon className={cx('more-icon')} width="2rem" height="2rem" />
}

const MenuPopper = () => {
  return (
    <Popper className={cx('popper-wrapper')}>
      <MainListPopper />
    </Popper>
  )
}

const MainListPopper = () => {
  const { data: session } = useSession()
  const { isShow: isShowLanguage, handleChangeShowLanguages } = useLanguage()

  const LIST = React.useMemo(() => {
    return session ? USER_ITEMS : NON_USER_ITEMS
  }, [session])

  if (isShowLanguage) {
    return (
      <>
        <Popper.Header className={cx('header')}>
          <i onMouseDown={handleChangeShowLanguages.bind(null, false)}>
            <BackIcon className={cx('back-icon')} />
          </i>
          <h4 className={cx('title')}>{LANGUAGE.title}</h4>
        </Popper.Header>

        <Popper.MenuList className={cx('language-list')}>
          {LANGUAGE.data.map((language) => (
            <Popper.MenuItem key={language.code} className={cx('language-item')}>
              {language.title}
            </Popper.MenuItem>
          ))}
        </Popper.MenuList>
      </>
    )
  }

  return (
    <Popper.MenuList>
      {LIST.map(({ Icon, title, to, isTheme, isSeparate, children, id }) => {
        const isLanguages = !!children

        return (
          <Popper.MenuItem key={id} className={cx('wrapper-item', { separate: isSeparate })}>
            <Button
              href={to ? to(session?.user?.name || '') : null}
              className={cx('item')}
              LeftIcon={<Icon />}
              onClick={
                isSeparate
                  ? () => signOut({ callbackUrl: '/' })
                  : isLanguages
                  ? handleChangeShowLanguages.bind(null, true)
                  : undefined
              }
            >
              {title}
            </Button>
            {isTheme && <ToggleThemeButton />}
          </Popper.MenuItem>
        )
      })}
    </Popper.MenuList>
  )
}

const CompoundMenu = Object.assign(Menu, { Wrapper, AvatarOrIcon, MenuPopper })
export default CompoundMenu
