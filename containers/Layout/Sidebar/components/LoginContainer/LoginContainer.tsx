import React from 'react'
import classNames from 'classnames/bind'
import styles from './LoginContainer.module.scss'
import { Button } from '~/components'

const cx = classNames.bind(styles)

const LoginContainer = () => {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('paragraph')}>Log in to follow creators, like videos, and view comments.</p>
      <Button large outlinePrimary className={cx('login-btn')}>
        Log in
      </Button>
    </div>
  )
}

export default LoginContainer
