import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

import { List, TickIcon } from '~/components'
import styles from './Account.module.scss'

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
  imageSrc: string
  imageAlt: string
  name: string
  userName: string
  id: string | number
  hasTick: boolean
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

const Item: React.FC<ItemProp> = ({
  name,
  userName,
  imageSrc = '/images/no-image.webp',
  imageAlt = 'avatar',
  hasTick,
}) => {
  return (
    <List.Item className={cx('item')} href="/">
      <Image className={cx('avatar')} src={imageSrc} alt={imageAlt} width={32} height={32} />
      <div className={cx('wrapper-info')}>
        <div className={cx('nickname')}>
          <p>{name}</p>
          {hasTick && <TickIcon className={cx('tick-icon')} />}
        </div>
        <p className={cx('name')}>{userName}</p>
      </div>
    </List.Item>
  )
}

const MoreOrLessButton: React.FC<MoreOrLessButtonProp> = ({ isShowMore = true, onClick }) => {
  const t = useTranslations('Common')
  return (
    <p className={cx('btn')} onClick={onClick}>
      {isShowMore ? t('seeLess') : t('seeMore')}
    </p>
  )
}

const Announce: React.FC<Children> = ({ children }) => {
  return <p className={cx('announce')}>{children}</p>
}

const CompoundAccount = Object.assign(Account, { Title, List: ListItems, Item, MoreOrLessButton, Announce })

export default CompoundAccount
