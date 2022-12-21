import Link from 'next/link'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

interface Children {
  children: React.ReactNode
}

interface ButtonProp extends Children {
  href?: string
  disabled?: boolean
  className?: string
  onClick?: () => void

  LeftIcon?: React.ReactElement
  RightIcon?: React.ReactElement
  outlineGray?: boolean
  primary?: boolean
  outlinePrimary?: boolean
  rounded?: boolean
  small?: boolean
  large?: boolean
}

const cx = classNames.bind(styles)

const Button: React.FC<ButtonProp> = ({
  children,
  className,
  LeftIcon,
  RightIcon,
  primary = false,
  outlinePrimary = false,
  outlineGray = false,
  rounded = false,
  small = false,
  large = false,
  ...restProps
}) => {
  let Comp: keyof JSX.IntrinsicElements | any = 'button'
  const classes = cx('wrapper', className, { primary, outlinePrimary, outlineGray, rounded, small, large })

  if (restProps.href) {
    Comp = Link
  }

  if (restProps.disabled) {
    ;(Object.keys(restProps) as (keyof typeof restProps)[]).forEach((key) => {
      if (key.startsWith('on') && typeof restProps[key] === 'function') {
        delete restProps[key]
      }
    })
  }

  return (
    <Comp className={classes} {...restProps}>
      {LeftIcon && <span className={cx('icon')}>{LeftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {RightIcon && <span className={cx('icon')}>{RightIcon}</span>}
    </Comp>
  )
}

export default Button
