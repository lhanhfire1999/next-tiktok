import Link from 'next/link'
import React from 'react'

interface Children {
  children: React.ReactNode
}

interface MenuProp extends Children {
  className?: string
}

interface ItemProp extends Children {
  className?: string
  onClick?: () => void
  href?: string
}

const Menu: React.FC<MenuProp> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>
}

const Item: React.FC<ItemProp> = ({ children, href, ...restProp }) => {
  return <li {...restProp}>{href ? <Link href={href}>{children}</Link> : children}</li>
}

const CompoundMenu = Object.assign(Menu, { Item })

export default CompoundMenu