import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'

import React from 'react'

import { CommentIcon, HeartIcon, List, LocalizedLink, MusicIcon, ShareIcon } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { Discover } from '~/services/discover'
import { useHomeDiscover } from '../../contexts'

import styles from './VideoContainer.module.scss'

const cx = classNames.bind(styles)

interface ChildrenProp {
  children: React.ReactNode
}

interface VideoContainerProp extends ChildrenProp {
  className?: string
}

interface VideoProp {
  videoSrc: string
}

interface ActionListProp {
  data: Discover
}

const VideoContainer: React.FC<VideoContainerProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const VideoDescription: React.FC<ChildrenProp> = ({ children }) => {
  return <p className={cx('video-description')}>{children}</p>
}

const VideoMusic: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <div className={cx('wrapper-video-music')}>
      <MusicIcon className={cx('music-icon')} />
      <LocalizedLink href="/">{children}</LocalizedLink>
    </div>
  )
}

const Video: React.FC<VideoProp> = ({ videoSrc }) => {
  return (
    <div className={cx('wrapper-video')}>
      <video className={cx('video')} controls>
        <source type="video/mp4" src={videoSrc} />
      </video>
    </div>
  )
}

const ActionList: React.FC<ActionListProp> = ({ data }) => {
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const { handleUpdateLike } = useHomeDiscover()

  const handlePressLikeButton = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }
    handleUpdateLike(data.id, data.username)
  }

  return (
    <List className={cx('action-list')}>
      <List.Item className={cx('btn')} onClick={handlePressLikeButton}>
        <i className={cx('wrapper-icon', { active: data.is_liked })}>
          <HeartIcon className={cx('icon', 'like-icon')} />
        </i>
        <span className={cx('count')}>{data.likes}</span>
      </List.Item>
      <List.Item href={`/video?id=${data.id}`} className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <CommentIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>{data.comments}</span>
      </List.Item>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <ShareIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>{data.shares}</span>
      </List.Item>
    </List>
  )
}

const CompoundVideoContainer = Object.assign(VideoContainer, { Video, ActionList, VideoDescription, VideoMusic })

export default CompoundVideoContainer
