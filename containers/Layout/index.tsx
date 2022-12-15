'use client'
import React from 'react'
import { Header, Sidebar } from './components'
import { usePathname } from 'next/navigation'

interface Prop {
  children: React.ReactNode
}

const Layout: React.FC<Prop> = ({ children }) => {
  const pathname = usePathname()

  return (
    <div>
      <Header />
      <div className="container">
        {pathname !== '/upload' && <Sidebar />}
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default Layout
