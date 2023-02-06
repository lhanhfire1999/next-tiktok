import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { Loading } from '~/components'
import { useWindowSize } from '~/hooks'
import useFollowAccounts from '../../hooks/useFollowAccount'
import Account from '../Account'

const FollowingAccountsContainer = () => {
  const { data, handleShowMore, isLoading, isShowMore } = useFollowAccounts()
  const { width } = useWindowSize()

  if (width < 1072 && !data.length) return null

  return (
    <Account>
      <Account.Title>Following Accounts</Account.Title>

      {data.length > 0 && (
        <>
          <Account.List>
            {data.map((item) => (
              <Account.Item
                key={item.id}
                id={item.id}
                imageSrc={item.avatar}
                imageAlt={item.name}
                userName={item.username}
                name={item.name}
                hasTick={item.has_tick}
              />
            ))}
          </Account.List>
          <Account.MoreOrLessButton isShowMore={isShowMore} onClick={handleShowMore} />
        </>
      )}

      {!data.length && <Account.Announce>Accounts you follow will appear here</Account.Announce>}
      {isLoading && <Loading />}
    </Account>
  )
}

export default FollowingAccountsContainer
