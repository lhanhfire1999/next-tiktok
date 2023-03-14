import Link from 'next/link'
import React, { ComponentProps } from 'react'
import LocalizedLink from '../LocalizedLink'

interface Children {
  children: React.ReactNode
}

interface ListProp extends Children {
  className?: string
}

interface ItemProp extends Omit<ComponentProps<typeof Link>, 'href'> {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string | null
  title?: string
}

const List: React.FC<ListProp> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>
}

// eslint-disable-next-line react/display-name
const Item = React.forwardRef<HTMLLIElement, ItemProp>(
  ({ children, href, className, title, target, rel, onClick }, ref) => {
    const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
      e.stopPropagation()
      if (onClick) onClick()
    }

    return (
      <li ref={ref} className={!href ? className : undefined} onClick={handleClick} title={title}>
        {href ? (
          <LocalizedLink href={href} className={className} target={target} rel={rel}>
            {children}
          </LocalizedLink>
        ) : (
          children
        )}
      </li>
    )
  }
)

const CompoundList = Object.assign(List, { Item })

export default CompoundList
