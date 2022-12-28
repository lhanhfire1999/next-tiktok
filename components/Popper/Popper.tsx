import classNames from 'classnames/bind'
import React from 'react'

import styles from './Popper.module.scss'
import Menu from '../Menu'

interface GeneralProp {
  children: React.ReactNode
  className?: string
}

interface Popper extends GeneralProp {}

interface MenuItem extends GeneralProp {
  href?: string
}

const cx = classNames.bind(styles)

const Popper: React.FC<Popper> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const Header: React.FC<GeneralProp> = ({ children, className }) => {
  return <header className={className}>{children}</header>
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

const CompoundPopper = Object.assign(Popper, { Header, HeaderTitle, MenuList: Menu, MenuItem, Footer })

export default CompoundPopper
