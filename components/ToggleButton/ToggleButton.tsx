import React, { useId } from 'react'

import classNames from 'classnames/bind'
import styles from './ToggleButton.module.scss'

const cx = classNames.bind(styles)

interface ToggleButtonProp {
  className?: string
  onChange?: () => void
  isChecked?: boolean
}

const ToggleButton: React.FC<ToggleButtonProp> = ({ onChange, className, isChecked }) => {
  const id = useId()

  return (
    <div className={cx('wrapper', className)}>
      <input type="checkbox" id={id} checked={isChecked} onChange={onChange} />
      <label htmlFor={id} />
    </div>
  )
}

export default ToggleButton
