import React from 'react'
import classNames from 'classnames/bind'
import styles from './SuggestedAccountsContainer.module.scss'
import Account from '../Account'
const cx = classNames.bind(styles)

const SuggestedAccountsContainer = () => {
  return (
    <div className={cx('wrapper')}>
      <h4 className={cx('title')}>Suggested accounts</h4>

      <Account>
        <Account.Item />
        <Account.Item />
        <Account.Item />
        <Account.Item />
        <Account.Item />
        <Account.Item />
      </Account>

      <p className={cx('btn')}>See more</p>
    </div>
  )
}

export default SuggestedAccountsContainer
