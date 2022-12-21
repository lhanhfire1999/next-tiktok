'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import classNames from 'classnames/bind'

import Header from '../Header'
import Sidebar from '../Sidebar'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

interface Prop {
  children: React.ReactNode
}

const DefaultLayout: React.FC<Prop> = ({ children }) => {
  const pathname = usePathname()

  return (
    <>
      <Header />
      <div className={cx('content')}>
        {pathname !== '/upload' && (
          <div className={cx('wrapper-sidebar')}>
            <Sidebar />
          </div>
        )}
        <div className={cx('main-content')}>{children}</div>
      </div>
    </>
  )
}

export default DefaultLayout
