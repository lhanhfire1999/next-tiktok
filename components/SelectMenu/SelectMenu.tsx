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
  wrapperClassName?: string
  titleClassName?: string
  iconClassName?: string
  onClick?: () => void
  onClickOutSide: () => void
}

interface OptionListProp {
  data: string[]
  isActive?: boolean
  listClassName?: string
  itemClassName?: string
  onClick?: (value: string) => void
}

const SelectMenu: React.FC<SelectMenuProp> = ({
  selectedValue,
  children,
  wrapperClassName,
  titleClassName,
  iconClassName,
  onClick,
  onClickOutSide,
}) => {
  const selectMenuRef = useRef(null)
  useOnClickOutside(selectMenuRef, onClickOutSide)

  return (
    <div className={cx('wrapper', wrapperClassName)} onClick={onClick} ref={selectMenuRef}>
      <span className={cx('title', titleClassName)}>{selectedValue}</span>
      <DownIcon className={cx('icon', iconClassName)} />

      {children}
    </div>
  )
}

const OptionList: React.FC<OptionListProp> = ({ isActive = false, data, listClassName, itemClassName, onClick }) => {
  return (
    <List className={cx('option-list', { 'is-active': isActive }, listClassName)}>
      {data.map((optionName, idx) => (
        <List.Item key={idx} className={cx('option-item', itemClassName)} onClick={onClick?.bind(null, optionName)}>
          {optionName}
        </List.Item>
      ))}
    </List>
  )
}

const CompoundSelectMenu = Object.assign(SelectMenu, { OptionList })

export default CompoundSelectMenu
