import classNames from 'classnames/bind'
import Link from 'next/link'
import React from 'react'
import { CommentIcon, HeartIcon, List, MusicIcon, ShareIcon } from '~/components'
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
  likes: number
  comments: number
  shares: number
}

const VideoContainer: React.FC<VideoContainerProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const VideoDescription: React.FC<VideoDescriptionProp> = ({ videoDescription }) => {
  return <p className={cx('video-description')}>{videoDescription}</p>
}

const VideoMusic = () => {
  return (
    <div className={cx('wrapper-video-music')}>
      <MusicIcon className={cx('music-icon')} />
      <Link href="/">I Dont Talk Anymore</Link>
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

const ActionList: React.FC<ActionListProp> = ({ likes, comments, shares }) => {
  return (
    <List className={cx('action-list')}>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <HeartIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>{likes}</span>
      </List.Item>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <CommentIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>{comments}</span>
      </List.Item>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <ShareIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>{shares}</span>
      </List.Item>
    </List>
  )
}

const CompoundVideoContainer = Object.assign(VideoContainer, { Video, ActionList, VideoDescription, VideoMusic })

export default CompoundVideoContainer
