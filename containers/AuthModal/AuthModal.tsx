'use client'
import { useEffect, useRef, useState } from 'react'
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  KaKaoTalkIcon,
  LineIcon,
  List,
  Modal,
  QRIcon,
  TwitterIcon,
  UserIcon,
} from '~/components'

import classNames from 'classnames/bind'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { useTitle } from '~/hooks'
import styles from './AuthModal.module.scss'

const cx = classNames.bind(styles)

const AUTH_MODAL_DATA = [
  { Icon: QRIcon, title: 'Use QR code' },
  { Icon: UserIcon, title: 'Use phone / mail / username' },
  { Icon: FacebookIcon, title: 'Use with Facebook' },
  { Icon: GoogleIcon, title: 'Use with Google' },
  { Icon: TwitterIcon, title: 'Use with Twitter' },
  { Icon: LineIcon, title: 'Use with Line' },
  { Icon: KaKaoTalkIcon, title: 'Use with KaKaoTalk' },
  { Icon: AppleIcon, title: 'Use with Apple' },
  { Icon: InstagramIcon, title: 'Use with Instagram' },
]

const AuthModal = () => {
  const { isOpenModal } = useAuthModal()

  if (!isOpenModal) return null
  return <Content />
}

const Content = () => {
  const { handleToggleModal } = useAuthModal()
  const [isSignIn, setIsSignIn] = useState(true)
  const scrollBarRef = useRef<HTMLDivElement>(null)

  const handleCloseModal = () => {
    handleToggleModal(false)
  }

  const handleToggleIsSignIn = () => {
    setIsSignIn((prev) => !prev)
  }

  useTitle(isSignIn ? 'Log in | TikTok' : 'Sign Up | TikTok')

  useEffect(() => {
    scrollBarRef.current?.scrollTo(0, 0)
  }, [isSignIn])

  return (
    <Modal>
      <Modal.Content className={cx('wrapper-content')} onClickOutside={handleCloseModal}>
        <Modal.CloseButton onClick={handleCloseModal} />
        <div className={cx('scroll-bar')} ref={scrollBarRef}>
          <div className={cx('content')}>
            <Modal.Title as="h2" className={cx('header-title')}>
              {`${isSignIn ? 'Log in' : 'Sign Up'}`} to TikTok
            </Modal.Title>
            <List className={cx('list')}>
              {AUTH_MODAL_DATA.map(({ Icon, title }, key) => (
                <List.Item key={key} className={cx('item')}>
                  <Icon className={cx('item-icon')} />
                  <span className={cx('item-title')}>{title}</span>
                </List.Item>
              ))}
            </List>
          </div>
        </div>

        {!isSignIn && (
          <p className={cx('policy-confirm-tips')}>
            {` By continuing, you agree to TikTok's Terms of Service and confirm that you have read TikTok's Privacy
            Policy.`}
          </p>
        )}

        <Modal.Footer className={cx('footer')}>
          {`${isSignIn ? `Don't` : 'Already'} have an account?  `}
          <span className={cx('footer-toggle-auth')} onClick={handleToggleIsSignIn}>
            {isSignIn ? 'Sign up' : 'Log in'}
          </span>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default AuthModal
