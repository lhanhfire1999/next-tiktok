import React from 'react'
import {
  DiscoverContainer,
  FooterContainer,
  LoginContainer,
  MainNavContainer,
  SuggestedAccountsContainer,
} from './components'

const Sidebar = () => {
  return (
    <>
      <MainNavContainer />
      <LoginContainer />
      <SuggestedAccountsContainer />
      <DiscoverContainer />
      <FooterContainer />
    </>
  )
}

export default Sidebar
