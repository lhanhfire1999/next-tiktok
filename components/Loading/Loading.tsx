import React from 'react'
import styles from './Loading.module.scss'
import classNames from 'classnames/bind'

interface PreloaderProp {
  isMaxHeight?: boolean
  isMaxHeightWindow?: boolean
}

const cx = classNames.bind(styles)

const Preloader: React.FC<PreloaderProp> = ({ isMaxHeight, isMaxHeightWindow }) => {
  return (
    <div className={cx('loading', { 'max-height': isMaxHeight, 'max-height-window': isMaxHeightWindow })}>
      <div className={cx('ball')}></div>
      <div className={cx('ball')}></div>
      <div className={cx('ball')}></div>
    </div>
  )
}
export default React.memo(Preloader)
