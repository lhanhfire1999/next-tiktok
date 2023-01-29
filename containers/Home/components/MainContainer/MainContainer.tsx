import React from 'react'

import classNames from 'classnames/bind'
import styles from './MainContainer.module.scss'
import { List } from '~/components'

const cx = classNames.bind(styles)

interface ChildrenProp {
  children: React.ReactNode
}

const MainContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const ContainerItem: React.FC<ChildrenProp> = ({ children }) => {
  return <List.Item className={cx('container-item')}>{children}</List.Item>
}

const CompoundMainContainer = Object.assign(MainContainer, { List, ContainerItem })

export default CompoundMainContainer
