import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

import { CommentIcon, HeartIcon, List, MusicIcon, ShareIcon } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import { Discover } from '~/services/discover'
import { useHomeDiscover } from '../../contexts'

import styles from './VideoContainer.module.scss'

const cx = classNames.bind(styles)

interface VideoContainerProp {
  children: React.ReactNode
  className?: string
}

interface VideoDescriptionProp {
  videoDescription: string
}

interface VideoProp {
  videoSrc: string
}

interface ActionListProp {
  data: Discover
}

interface VideoMusic {
  name: string
}

const VideoContainer: React.FC<VideoContainerProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const VideoDescription: React.FC<VideoDescriptionProp> = ({ videoDescription }) => {
  return <p className={cx('video-description')}>{videoDescription}</p>
}

const VideoMusic: React.FC<VideoMusic> = ({ name }) => {
  return (
    <div className={cx('wrapper-video-music')}>
      <MusicIcon className={cx('music-icon')} />
      <Link href="/">{name}</Link>
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
    handleUpdateLike(data.id)
  }

  return (
    <List className={cx('action-list')}>
      <List.Item className={cx('btn')} onClick={handlePressLikeButton}>
        <i className={cx('wrapper-icon', { active: data.is_liked })}>
          <HeartIcon className={cx('icon', 'like-icon')} />
        </i>
        <span className={cx('count')}>{data.likes}</span>
      </List.Item>
      <List.Item className={cx('btn')}>
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
