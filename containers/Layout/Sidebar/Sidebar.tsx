import React from 'react'
import { DiscoverContainer, FooterContainer, LoginContainer, MainNavContainer } from './components'

const Sidebar = () => {
  return (
    <>
      <MainNavContainer />
      <LoginContainer />
      <DiscoverContainer />
      <FooterContainer />
    </>
  )
}

export default Sidebar
