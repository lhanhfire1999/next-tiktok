import React from 'react'
import styles from './Loading.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const Preloader = () => {
  return (
    <div className={cx('loading')}>
      <div className={cx('ball')}></div>
      <div className={cx('ball')}></div>
      <div className={cx('ball')}></div>
    </div>
  )
}
export default React.memo(Preloader)
