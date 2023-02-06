'use client'
import { Loading } from '~/components'
import useSuggestAccount from '../../hooks/useSuggestAccount'
import Account from '../Account'

const SuggestedAccountsContainer = () => {
  const { data, isLoading, isShowMore, handleShowMore } = useSuggestAccount()

  return (
    <Account>
      <Account.Title>Suggested Accounts</Account.Title>
      <Account.List>
        {data?.map((item) => (
          <Account.Item
            key={item.id}
            id={item.id}
            imageSrc={item.image_url}
            imageAlt={item.name}
            userName={item.user_name}
            name={item.name}
            hasTick={item.has_tick}
          />
        ))}
      </Account.List>
      <Account.MoreOrLessButton isShowMore={isShowMore} onClick={handleShowMore} />
      {isLoading && <Loading />}
    </Account>
  )
}

export default SuggestedAccountsContainer
