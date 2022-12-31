import React from 'react'
import { useAuthentication } from '~/contexts/AuthenticationContext'

import {
  DiscoverContainer,
  FollowingAccountsContainer,
  FooterContainer,
  LoginContainer,
  MainNavContainer,
  SuggestedAccountsContainer,
} from './components'

const Sidebar = () => {
  const { token } = useAuthentication()
  return (
    <>
      <MainNavContainer />
      {!token && <LoginContainer />}
      <SuggestedAccountsContainer />
      {token && <FollowingAccountsContainer />}
      <DiscoverContainer />
      <FooterContainer />
    </>
  )
}

export default Sidebar
