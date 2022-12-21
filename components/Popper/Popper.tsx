import React, { forwardRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
import Link from 'next/link'
import Menu from '../Menu'

interface GeneralProp {
  children: React.ReactNode
  className?: string
}

interface Popper extends GeneralProp {
  isActive?: boolean
}

interface MenuItem extends GeneralProp {
  href?: string
}

const cx = classNames.bind(styles)

const Popper: React.FC<Popper> = ({ children, className, isActive = true }) => {
  return <div className={cx('wrapper', className, { active: isActive })}>{children}</div>
}

const HeaderTitle: React.FC<GeneralProp> = ({ children, className }) => {
  return <h4 className={className}>{children}</h4>
}

const MenuItem: React.FC<MenuItem> = ({ children, href, className }) => {
  return (
    <Menu.Item className={cx('menu-item', className)} href={href}>
      {children}
    </Menu.Item>
  )
}

const Footer: React.FC<GeneralProp> = ({ children, className }) => {
  return <footer className={cx('footer', className)}>{children}</footer>
}

const CompoundPopper = Object.assign(Popper, { HeaderTitle, MenuList: Menu, MenuItem, Footer })

export default CompoundPopper
