'use client'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import className from 'classnames/bind'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { Button, InboxIcon, LocalizedLink, MessageIcon } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'

import styles from './ActionButtons.module.scss'

const cx = className.bind(styles)

const ActionButtons = () => {
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const t = useTranslations()

  const handleOpenSignInModal = () => {
    handleToggleModal(true)
  }

  if (session)
    return (
      <>
        <Tippy delay={[0, 50]} content={t('Common.message')} placement="bottom">
          <LocalizedLink href="/" className={cx('wrapper-icon', 'wrapper-message-icon')}>
            <MessageIcon className={cx('icon')} />
          </LocalizedLink>
        </Tippy>

        <Tippy delay={[0, 50]} content={t('Common.inbox')} placement="bottom">
          <span className={cx('wrapper-icon')}>
            <InboxIcon className={cx('icon')} />
          </span>
        </Tippy>
      </>
    )

  return (
    <Button primary onClick={handleOpenSignInModal}>
      {t('Auth.signIn')}
    </Button>
  )
}

export default ActionButtons
