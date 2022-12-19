import React, { forwardRef } from 'react'
import classNames from 'classnames/bind'
import styles from './Popper.module.scss'
import Link from 'next/link'

interface GeneralProp {
  children: React.ReactNode
  className?: string
}

interface Popper extends GeneralProp {
  isActive: boolean
}

interface MenuItem extends GeneralProp {
  navigateTo: string
}

const cx = classNames.bind(styles)

// eslint-disable-next-line react/display-name
const Popper = forwardRef<HTMLDivElement, Popper>(({ children, className, isActive }, ref) => {
  return (
    <div className={cx('wrapper', className, { active: isActive })} ref={ref}>
      {children}
    </div>
  )
})

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
  return <footer className={cx('footer', className)}>{children}</footer>
}

const CompoundPopper = Object.assign(Popper, { HeaderTitle, MenuList, MenuItem, Footer })

export default CompoundPopper
