import classNames from 'classnames/bind'
import React from 'react'
import { DownIcon } from '../Icons'
import List from '../List'
import styles from './SelectMenu.module.scss'

const cx = classNames.bind(styles)

interface SelectMenuProp {
  children: React.ReactNode
  data: string[]
  isActive?: boolean
  wrapperClassName?: string
  listClassName?: string
  itemClassName?: string
  titleClassName?: string
  iconClassName?: string
  onClick?: () => void
  onClickItem?: (value: string) => void
}

const SelectMenu: React.FC<SelectMenuProp> = ({
  children,
  isActive,
  wrapperClassName,
  listClassName,
  itemClassName,
  titleClassName,
  iconClassName,
  onClick,
  onClickItem,
  data,
}) => {
  console.log(listClassName)

  return (
    <div className={cx('wrapper', wrapperClassName, { isActive })} onClick={onClick}>
      <span className={cx('title', titleClassName)}>{children}</span>
      <DownIcon className={cx(iconClassName)} />

      <List className={cx('option-list', listClassName)}>
        {data.map((optionName, idx) => (
          <List.Item
            key={idx}
            className={cx('option-item', itemClassName)}
            onClick={onClickItem?.bind(null, optionName)}
          >
            {optionName}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default SelectMenu
