import React, { useId } from 'react'

import classNames from 'classnames/bind'
import styles from './ToggleButton.module.scss'

const cx = classNames.bind(styles)

const ToggleButton = () => {
  const id = useId()

  return (
    <div className={cx('wrapper')}>
      <input type="checkbox" id={id} />
      <label htmlFor={id} />
    </div>
  )
}

export default ToggleButton
