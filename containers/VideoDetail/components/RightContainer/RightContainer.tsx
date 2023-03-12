import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'

import { CircleTwitterIcon, CommentIcon, FacebookIcon, HeartIcon, List } from '~/components'
import { UserDetails, VideoContainer } from '~/containers/Home/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { useVideoDetail } from '../../contexts/VideoDetailContext'

import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

interface ContainerProp {
  className: string
  children: React.ReactNode
}

enum ACTION_NAMES {
  Like = 'Like',
  Comment = 'Comment',
  Embed = 'Embed',
  ShareToFB = 'Share to FaceBooks',
  ShareToTwitter = 'Share to Twitter',
}

const ACTION_BUTTONS = {
  leftContainer: [
    { id: ACTION_NAMES.Like, Icon: HeartIcon },
    { id: ACTION_NAMES.Comment, Icon: CommentIcon },
  ],
  rightContainer: [
    { id: ACTION_NAMES.ShareToFB, Icon: FacebookIcon },
    { id: ACTION_NAMES.ShareToTwitter, Icon: CircleTwitterIcon },
  ],
} as const

const RightContainer: React.FC<ContainerProp> = ({ className, children }) => {
  return <div className={cx(className, 'wrapper')}>{children}</div>
}

const TopContainer = () => {
  const t = useTranslations('VideoDetail')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data, handleUpdateFollow } = useVideoDetail()

  const getCurrentUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_URL}${pathname}?id=${searchParams?.get('id')}`
  }, [pathname, searchParams])

  const handleCopyVideoLink = async () => {
    await navigator.clipboard.writeText(getCurrentUrl)
  }

  if (!data) {
    return null
  }

  return (
    <div className={cx('top-container')}>
      <UserDetails data={data} onUpdateFollow={handleUpdateFollow} className={cx('info-content')} />

      <VideoContainer>
        <VideoContainer.VideoDescription>{data.caption}</VideoContainer.VideoDescription>
        <VideoContainer.VideoMusic>{data.music_name} </VideoContainer.VideoMusic>
      </VideoContainer>

      <div className={cx('wrapper-action-buttons')}>
        <List className={cx('left-action-buttons')}>
          {ACTION_BUTTONS.leftContainer.map(({ id, Icon }) => (
            <List.Item key={id} className={cx('button', { 'cursor-pointer': id === ACTION_NAMES.Like })}>
              <i key={id} className={cx('wrapper-icon', { active: data.is_liked })}>
                <Icon className={cx('icon', { 'like-icon': id === ACTION_NAMES.Like })} />
              </i>
              <span className={cx('quantity')}> {id === ACTION_NAMES.Like ? data.likes : data.comments}</span>
            </List.Item>
          ))}
        </List>

        <List className={cx('right-actions-buttons')}>
          {ACTION_BUTTONS.rightContainer.map(({ id, Icon }) => (
            <List.Item key={id} className={cx('wrapper-icon')} title={id}>
              <Icon width="2.4rem" height="2.4rem" />
            </List.Item>
          ))}
        </List>
      </div>

      <div className={cx('copy-link-container')}>
        <p>{getCurrentUrl}</p>
        <button onClick={handleCopyVideoLink}>{t('copyLink')}</button>
      </div>
    </div>
  )
}

const BottomContainer = () => {
  const t = useTranslations('VideoDetail')
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()

  const handleClickLoginBar = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }
  }

  return (
    <div className={cx('bottom-container')}>
      {!session ? (
        <div className={cx('login-bar')} onClick={handleClickLoginBar}>
          {t('loginToComment')}
        </div>
      ) : (
        <div className={cx('wrapper-bottom-comment')}>
          <div className={cx('text-bar')}>
            <p className={cx('text')} contentEditable={true} data-placeholder={t('addCommentPlaceholder')}></p>
          </div>
          <button className={cx({ active: false })}>{t('post')}</button>
        </div>
      )}
    </div>
  )
}

const CommentContainer = () => {
  return <div className={cx('comment-container')}>Comment container</div>
}

const CompoundRightContainer = Object.assign(RightContainer, { TopContainer, BottomContainer, CommentContainer })

export default CompoundRightContainer