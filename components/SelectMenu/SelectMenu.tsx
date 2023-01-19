import classNames from 'classnames/bind'
import React, { useRef } from 'react'

import { useOnClickOutside } from '~/hooks'
import { DownIcon } from '../Icons'
import List from '../List'
import styles from './SelectMenu.module.scss'

const cx = classNames.bind(styles)

interface SelectMenuProp {
  children: React.ReactNode
  selectedValue: string
  isActive?: boolean
  wrapperClassName?: string
  titleClassName?: string
  iconClassName?: string
  onClickOutSide: () => void
  onClick?: () => void
}

interface ListProp {
  className?: string
  children?: React.ReactNode
}

interface ItemProp {
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

const SelectMenu: React.FC<SelectMenuProp> = ({
  selectedValue,
  children,
  wrapperClassName,
  titleClassName,
  iconClassName,
  isActive,
  onClick,
  onClickOutSide,
}) => {
  const selectMenuRef = useRef(null)
  useOnClickOutside(selectMenuRef, onClickOutSide)

  return (
    <div className={cx('wrapper', wrapperClassName, { 'is-active': isActive })} onClick={onClick} ref={selectMenuRef}>
      <span className={cx('title', titleClassName)}>{selectedValue}</span>
      <DownIcon className={cx('icon', iconClassName)} />

      {children}
    </div>
  )
}

const Menu: React.FC<ListProp> = ({ children, className }) => {
  return <List className={cx('option-list', className)}>{children}</List>
}

const Item: React.FC<ItemProp> = ({ children, className, onClick }) => {
  return (
    <List.Item className={cx('option-item', className)} onClick={onClick}>
      {children}
    </List.Item>
  )
}

const CompoundSelectMenu = Object.assign(SelectMenu, { List: Menu, Item })

export default CompoundSelectMenu
