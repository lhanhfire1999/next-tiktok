import React from 'react'

import classNames from 'classnames/bind'
import { List } from '~/components'
import styles from './MainContainer.module.scss'

const cx = classNames.bind(styles)

interface ChildrenProp {
  children: React.ReactNode
}

interface CardItemProp extends ChildrenProp {
  className: string
}

const MainContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const CardItem: React.FC<CardItemProp> = ({ children, className }) => {
  return <List.Item className={cx('card-item', className)}>{children}</List.Item>
}

const CompoundMainContainer = Object.assign(MainContainer, {
  List,
  CardItem,
})

export default CompoundMainContainer
