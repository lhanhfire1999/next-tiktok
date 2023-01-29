'use client'
import React from 'react'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import MainContainer from './components/MainContainer'

const cx = classNames.bind(styles)

const Home = () => {
  return (
    <div className={cx('wrapper')}>
      <MainContainer>
        <MainContainer.List>
          <MainContainer.ContainerItem>assign</MainContainer.ContainerItem>
        </MainContainer.List>
      </MainContainer>
    </div>
  )
}

export default Home
