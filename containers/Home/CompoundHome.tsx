'use client'
import classNames from 'classnames/bind'

import { Loading } from '~/components'
import { MainContainer, UserDetails, VideoContainer } from './components'
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
  const { data, isLoading } = useHomeDiscover()

  return (
    <>
      <MainContainer.List>
        {data?.map((info, index) => (
          <MainContainer.CardItem key={info.id} isLastCard={index === data.length - 1}>
            <UserDetails data={info} />

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
      {isLoading && <Loading />}
    </>
  )
}

const CompoundHome = Object.assign(Home, { Content })

export default CompoundHome
