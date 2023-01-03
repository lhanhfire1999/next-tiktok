'use client'
import { useSession } from 'next-auth/react'

import {
  DiscoverContainer,
  FollowingAccountsContainer,
  FooterContainer,
  LoginContainer,
  MainNavContainer,
  SuggestedAccountsContainer,
} from './components'

const Sidebar = () => {
  const { data: session } = useSession()
  return (
    <>
      <MainNavContainer />
      {!session && <LoginContainer />}
      <SuggestedAccountsContainer />
      {session && <FollowingAccountsContainer />}
      <DiscoverContainer />
      <FooterContainer />
    </>
  )
}

export default Sidebar
