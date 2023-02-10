'use client'
import { useEffect, useRef, useState } from 'react'
import { List, Modal } from '~/components'

import classNames from 'classnames/bind'
import Link from 'next/link'
import { AUTH_MODAL_DATA } from '~/constants'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { useTitle } from '~/hooks'
import styles from './AuthModal.module.scss'
import { useTranslations } from 'next-intl'

const cx = classNames.bind(styles)

const AuthModal = () => {
  const { isOpenModal } = useAuthModal()

  if (!isOpenModal) return null
  return <Content />
}

const Content = () => {
  const { handleToggleModal } = useAuthModal()
  const [isSignIn, setIsSignIn] = useState(true)
  const scrollBarRef = useRef<HTMLDivElement>(null)

  const t = useTranslations()

  const handleCloseModal = () => {
    handleToggleModal(false)
  }

  const handleToggleIsSignIn = () => {
    setIsSignIn((prev) => !prev)
  }

  useTitle(isSignIn ? `${t('Auth.signIn')} | TikTok` : `${t('Auth.signUp')} | TikTok`)

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
              {isSignIn ? t('ModalAuth.signIn') : t('ModalAuth.signUp')}
            </Modal.Title>
            <List className={cx('list')}>
              {AUTH_MODAL_DATA.map(({ Icon, titleKey, onClick }, key) => (
                <List.Item key={key} className={cx('item', { disabled: !onClick })} onClick={onClick}>
                  <Icon className={cx('item-icon')} />
                  <span className={cx('item-title')}>{t(titleKey as any)}</span>
                </List.Item>
              ))}
            </List>
          </div>
        </div>

        {!isSignIn && (
          <p className={cx('policy-confirm-tips')}>
            {t('ModalAuth.policyConfirm1')}
            <Link href="https://www.tiktok.com/legal/page/row/terms-of-service/en" target="_blank">
              {t('ModalAuth.terms')}
            </Link>
            {t('ModalAuth.policyConfirm2')}
            <Link href="https://www.tiktok.com/legal/page/row/privacy-policy/en" target="_blank">
              {t('ModalAuth.policy')}
            </Link>
            {t('ModalAuth.policyConfirm3')}
          </p>
        )}

        <Modal.Footer className={cx('footer')}>
          {isSignIn ? t('ModalAuth.inBottomText') : t('ModalAuth.upBottomText')}
          <span className={cx('footer-toggle-auth')} onClick={handleToggleIsSignIn}>
            {isSignIn ? t('Auth.signUp') : t('Auth.signIn')}
          </span>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default AuthModal
