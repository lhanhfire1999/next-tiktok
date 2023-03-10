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
  const { data, isLoading, handleUpdateFollow } = useHomeDiscover()

  return (
    <>
      <MainContainer.List>
        {data?.map((info, index) => (
          <MainContainer.CardItem key={info.id} isLastCard={index === data.length - 1}>
            <UserDetails data={info} onUpdateFollow={handleUpdateFollow} />

            <VideoContainer>
              <VideoContainer.VideoDescription>{info.caption} </VideoContainer.VideoDescription>
              <VideoContainer.VideoMusic>{info.music_name} </VideoContainer.VideoMusic>
            </VideoContainer>

            <VideoContainer className={cx('wrapper-video')}>
              <VideoContainer.Video videoSrc={info.video} />
              <VideoContainer.ActionList data={info} />
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
