import classNames from 'classnames/bind'
import React from 'react'
import { CommentIcon, HeartIcon, List, MusicIcon, ShareIcon } from '~/components'
import styles from './VideoContainer.module.scss'

const cx = classNames.bind(styles)

interface VideoContainerProp {
  children: React.ReactNode
  className?: string
}

const VideoContainer: React.FC<VideoContainerProp> = ({ children, className }) => {
  return <div className={cx('wrapper', className)}>{children}</div>
}

const VideoDescription = () => {
  return <p className={cx('video-description')}>These ducks are MEGA cute</p>
}

const VideoMusic = () => {
  return (
    <div className={cx('wrapper-video-music')}>
      <MusicIcon className={cx('music-icon')} />
      <p>I Dont Talk Anymore</p>
    </div>
  )
}

const Video = () => {
  return (
    <div className={cx('wrapper-video')}>
      <video className={cx('video')}>
        <source type="video/mp4" />
      </video>
    </div>
  )
}

const ActionList = () => {
  return (
    <List className={cx('action-list')}>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <HeartIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>0</span>
      </List.Item>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <CommentIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>0</span>
      </List.Item>
      <List.Item className={cx('btn')}>
        <i className={cx('wrapper-icon')}>
          <ShareIcon className={cx('icon')} />
        </i>
        <span className={cx('count')}>0</span>
      </List.Item>
    </List>
  )
}

const CompoundVideoContainer = Object.assign(VideoContainer, { Video, ActionList, VideoDescription, VideoMusic })

export default CompoundVideoContainer
