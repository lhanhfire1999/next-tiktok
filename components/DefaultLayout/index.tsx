import React from 'react'
import Sidebar from './Sidebar'

interface Prop {
  hasSidebar: boolean
  children: React.ReactNode
}

const DefaultLayout: React.FC<Prop> = ({ hasSidebar, children }) => {
  return (
    <div className="container">
      {hasSidebar && <Sidebar />}
      <div className="content">{children}</div>
    </div>
  )
}

export default DefaultLayout
