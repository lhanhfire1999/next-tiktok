'use client'
import classNames from 'classnames/bind'
import { usePathname } from 'next/navigation'
import React from 'react'

import AuthModal from '~/containers/AuthModal'
import { Locale } from '~/locales/i18n-config'
import Footer from '../Footer'
import Header from '../Header'
import Sidebar from '../Sidebar'
import styles from './DefaultLayout.module.scss'

const cx = classNames.bind(styles)

interface Prop {
  children: React.ReactNode
  locale: Locale
}

const DefaultLayout: React.FC<Prop> = ({ children, locale }) => {
  const pathname = usePathname()

  if (pathname === `/${locale}/video`) {
    return (
      <>
        {children}
        <AuthModal />
      </>
    )
  }

  return (
    <>
      <Header />

      <div
        className={cx('content', {
          upload: pathname === `/${locale}/upload`,
          home: pathname === `/${locale}`,
          following: pathname === `/${locale}/following`,
        })}
      >
        {pathname !== `/${locale}/upload` && (
          <div className={cx('wrapper-sidebar')}>
            <Sidebar />
          </div>
        )}

        <div className={cx('main-content')}>{children}</div>
      </div>

      {pathname === `/${locale}/upload` && <Footer />}
      <AuthModal />
    </>
  )
}

export default DefaultLayout
