import React from 'react'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
import Link from 'next/link'

interface GeneralProp {
  children: React.ReactNode
  className?: string
}

interface MenuItem extends GeneralProp {
  navigateTo: string
}

interface PopperComposition {
  HeaderTitle: typeof HeaderTitle
  MenuList: typeof MenuList
  MenuItem: typeof MenuItem
  Footer: typeof Footer
}

const cx = classNames.bind(styles)

const Popper: React.FC<GeneralProp> & PopperComposition = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const HeaderTitle: React.FC<GeneralProp> = ({ children, className }) => {
  return <h4 className={className}>{children}</h4>
}

const MenuList: React.FC<GeneralProp> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>
}

const MenuItem: React.FC<MenuItem> = ({ children, className, navigateTo }) => {
  return (
    <li className={cx('menu-item', className)}>
      <Link href={navigateTo}>{children}</Link>
    </li>
  )
}

const Footer: React.FC<GeneralProp> = ({ children, className }) => {
  return <footer className={className}>{children}</footer>
}

Popper.HeaderTitle = HeaderTitle
Popper.MenuList = MenuList
Popper.MenuItem = MenuItem
Popper.Footer = Footer

export default Popper
