import React, { useState } from 'react'
import Account from '../Account'

const SuggestedAccountsContainer = () => {
  const [isShowMore, setIsShowMore] = useState(false)

  const handleShowMore = () => {
    setIsShowMore((prev) => !prev)
  }

  return (
    <Account>
      <Account.Title>Suggested Accounts</Account.Title>
      <Account.List>
        <Account.Item />
        <Account.Item />
        <Account.Item />
        <Account.Item />
        <Account.Item />
      </Account.List>
      <Account.MoreOrLessButton isShowMore={isShowMore} onClick={handleShowMore} />
    </Account>
  )
}

export default SuggestedAccountsContainer
