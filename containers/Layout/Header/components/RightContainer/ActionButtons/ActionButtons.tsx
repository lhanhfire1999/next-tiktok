import 'tippy.js/dist/tippy.css'

import Tippy from '@tippyjs/react'
import Link from 'next/link'

import { Button, InboxIcon, MessageIcon } from '~/components'
import { useAuthentication } from '~/contexts/AuthenticationContext'
import className from 'classnames/bind'
import styles from './ActionButtons.module.scss'

const cx = className.bind(styles)

const ActionButtons = () => {
  const { token, handleSignIn } = useAuthentication()

  if (token)
    return (
      <>
        <Tippy delay={[0, 50]} content="Message" placement="bottom">
          <Link href="messages" className={cx('wrapper-icon', 'wrapper-message-icon')}>
            <MessageIcon className={cx('icon')} />
          </Link>
        </Tippy>

        <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
          <span className={cx('wrapper-icon')}>
            <InboxIcon className={cx('icon')} />
          </span>
        </Tippy>
      </>
    )

  return (
    <Button primary onClick={handleSignIn}>
      Login
    </Button>
  )
}

export default ActionButtons
