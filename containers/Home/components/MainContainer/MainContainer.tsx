import React, { useRef } from 'react'

import classNames from 'classnames/bind'
import { List } from '~/components'
import styles from './MainContainer.module.scss'
import { useHomeDiscover } from '../../contexts'
import { useInfinityScroll } from '../../hooks'

const cx = classNames.bind(styles)

interface ChildrenProp {
  children: React.ReactNode
}

interface CardItemProp extends ChildrenProp {
  className?: string
  isLastCard?: boolean
}

const MainContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const CardItem: React.FC<CardItemProp> = ({ children, className, isLastCard }) => {
  const { handleUpPage } = useHomeDiscover()
  const lastCardRef = useRef<HTMLLIElement>(null)

  const handleScrollToLastCard = () => {
    handleUpPage()
  }

  useInfinityScroll(lastCardRef, handleScrollToLastCard)

  return (
    <List.Item className={cx('card-item', className)} ref={isLastCard ? lastCardRef : null}>
      {children}
    </List.Item>
  )
}

const CompoundMainContainer = Object.assign(MainContainer, {
  List,
  CardItem,
})

export default CompoundMainContainer
