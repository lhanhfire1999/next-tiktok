import Link from 'next/link'
import React from 'react'

interface Children {
  children: React.ReactNode
}

interface ListProp extends Children {
  className?: string
}

interface ItemProp extends Children {
  className?: string
  onClick?: () => void
  href?: string | null
}

const List: React.FC<ListProp> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>
}

const Item: React.FC<ItemProp> = ({ children, href, className, onClick }) => {
  const handleClick: React.MouseEventHandler<HTMLLIElement> = (e) => {
    e.stopPropagation()
    if (onClick) onClick()
  }

  return (
    <li className={!href ? className : undefined} onClick={handleClick}>
      {href ? (
        <Link href={href} className={className}>
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  )
}

const CompoundList = Object.assign(List, { Item })

export default CompoundList
