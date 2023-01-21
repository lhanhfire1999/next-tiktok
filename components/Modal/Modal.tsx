import React, { useRef } from 'react'

import classNames from 'classnames/bind'
import { CloseIcon } from '../Icons'
import styles from './Modal.module.scss'
import useOnClickOutside from '~/hooks/useOnClickOutside'

interface Children {
  children: React.ReactNode
}
interface ClassName {
  className?: string
}

type GeneralProp = Children & ClassName

interface TitleProp extends GeneralProp {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface ContentProp extends Children, ClassName {
  onClickOutside: () => void
}

interface CloseButton extends ClassName {
  onClick?: () => void
}

const cx = classNames.bind(styles)

const Modal: React.FC<GeneralProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const CloseButton: React.FC<CloseButton> = ({ className, onClick }) => {
  return (
    <i className={cx('close-btn', className)} onClick={onClick}>
      <CloseIcon />
    </i>
  )
}

const Content: React.FC<ContentProp> = ({ children, onClickOutside, className }) => {
  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, onClickOutside)

  return (
    <div className={cx('wrapper-content', className)} ref={wrapperRef}>
      {children}
    </div>
  )
}

const Title: React.FC<TitleProp> = ({ children, as = 'h3', ...restProp }) => {
  return React.createElement(as, { ...restProp }, children)
}

const Footer: React.FC<GeneralProp> = ({ children, className }) => {
  return <footer className={cx('footer', className)}>{children}</footer>
}

const CompoundModal = Object.assign(Modal, { CloseButton, Content, Title, Footer })

export default CompoundModal
