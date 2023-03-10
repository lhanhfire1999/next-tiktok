import classNames from 'classnames/bind'
import React from 'react'

import { UserDetails, VideoContainer } from '~/containers/Home/components'
import { useVideoDetail } from '../../contexts/VideoDetailContext'

import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

interface ContainerProp {
  className: string
  children: React.ReactNode
}

const RightContainer: React.FC<ContainerProp> = ({ className, children }) => {
  return <div className={cx(className, 'wrapper')}>{children}</div>
}

const TopContent = () => {
  const { data, handleUpdateFollow } = useVideoDetail()

  if (!data) {
    return null
  }

  return (
    <div className={cx('top-content')}>
      <UserDetails data={data} onUpdateFollow={handleUpdateFollow} className={cx('info-content')} />

      <VideoContainer>
        <VideoContainer.VideoDescription>{data.caption}</VideoContainer.VideoDescription>
        <VideoContainer.VideoMusic>{data.music_name} </VideoContainer.VideoMusic>
      </VideoContainer>
    </div>
  )
}

const CompoundRightContainer = Object.assign(RightContainer, { TopContent })

export default CompoundRightContainer
