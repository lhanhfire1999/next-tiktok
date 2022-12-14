import React from 'react'
import { List, TickIcon } from '~/components'
import classNames from 'classnames/bind'
import styles from './Account.module.scss'
import Image from 'next/image'

const cx = classNames.bind(styles)

interface Children {
  children: React.ReactNode
}

interface AccountProp extends Children {
  className?: string
}

interface MoreOrLessButtonProp {
  isShowMore?: boolean
  onClick?: () => void
}
interface ItemProp {
  src?: string
  alt?: string
}

const Account: React.FC<AccountProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const Title: React.FC<Children> = ({ children }) => {
  return <h4 className={cx('title')}>{children}</h4>
}

const ListItems: React.FC<Children> = ({ children }) => {
  return <List className={cx('list')}>{children}</List>
}

const Item: React.FC<ItemProp> = ({ src = '/images/no-image.webp', alt = 'avatar' }) => {
  return (
    <List.Item className={cx('item')} href="/">
      <Image className={cx('avatar')} src={src} alt={alt} width={32} height={32} />
      <div className={cx('wrapper-info')}>
        <div className={cx('nickname')}>
          <p>quynhalee</p>
          <TickIcon className={cx('tick-icon')} />
        </div>
        <p className={cx('name')}>Quỳnh Alee</p>
      </div>
    </List.Item>
  )
}

const MoreOrLessButton: React.FC<MoreOrLessButtonProp> = ({ isShowMore = true, onClick }) => {
  return (
    <p className={cx('btn')} onClick={onClick}>
      {isShowMore ? 'See more' : 'See less'}
    </p>
  )
}

const CompoundAccount = Object.assign(Account, { Title, List: ListItems, Item, MoreOrLessButton })

export default CompoundAccount
