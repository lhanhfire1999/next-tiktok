'use client'
import classNames from 'classnames/bind'
import { LeftContainer, RightContainer } from './components'
import { VideoDetailProvider } from './contexts/VideoDetailContext'
import styles from './VideoDetail.module.scss'

interface VideoDetailProp {
  videoId: string
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const VideoDetail: React.FC<VideoDetailProp> = ({ videoId, children }) => {
  return <VideoDetailProvider videoId={videoId}>{children}</VideoDetailProvider>
}

const Content = () => {
  return (
    <div className={cx('wrapper')}>
      <LeftContainer className={cx('left-container')} />
      <RightContainer className={cx('right-container')}>
        <RightContainer.TopContainer />
        <RightContainer.CommentContainer />
        <RightContainer.BottomContainer />
      </RightContainer>
    </div>
  )
}

const CompoundVideoDetail = Object.assign(VideoDetail, { Content })

export default CompoundVideoDetail
