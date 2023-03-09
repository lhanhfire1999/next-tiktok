import React from 'react'
import classNames from 'classnames/bind'
import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

interface ContainerProp {
  className: string
}

const RightContainer: React.FC<ContainerProp> = ({ className }) => {
  return <div className={cx(className, 'wrapper')}>RightContainer</div>
}

export default RightContainer
