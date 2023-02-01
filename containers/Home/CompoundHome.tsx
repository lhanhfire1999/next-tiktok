'use client'
import classNames from 'classnames/bind'

import { UserDetails, VideoContainer } from './components'
import MainContainer from './components/MainContainer'
import { HomeDiscoverProvider, useHomeDiscover } from './contexts'

import style from './Home.module.scss'

const cx = classNames.bind(style)
interface HomeProps {
  children: React.ReactNode
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return (
    <HomeDiscoverProvider>
      <MainContainer>{children}</MainContainer>
    </HomeDiscoverProvider>
  )
}

const Content = () => {
  const { data, isLoading, isError } = useHomeDiscover()

  if (isLoading || isError) {
    return null
  }

  return (
    <MainContainer.List>
      {data?.map((info) => (
        <MainContainer.CardItem key={info.id}>
          <UserDetails
            imgSrc={info.avatar}
            imgAlt={info.caption}
            userName={info.username}
            name={info.name}
            isFollowing={info.is_followed}
          />

          <VideoContainer>
            <VideoContainer.VideoDescription videoDescription={info.caption} />
            <VideoContainer.VideoMusic />
          </VideoContainer>

          <VideoContainer className={cx('wrapper-video')}>
            <VideoContainer.Video videoSrc={info.video} />
            <VideoContainer.ActionList likes={info.likes} shares={info.shares} comments={info.comments} />
          </VideoContainer>
        </MainContainer.CardItem>
      ))}
    </MainContainer.List>
  )
}

const CompoundHome = Object.assign(Home, { Content })

export default CompoundHome
