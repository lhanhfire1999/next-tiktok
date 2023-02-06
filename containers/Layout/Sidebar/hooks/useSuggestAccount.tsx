import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { getSuggestAccounts } from '~/services/suggestAccount/suggestAccount'

const useSuggestAccount = () => {
  const {
    data: responseData,
    error,
    mutate,
  } = useSWR('suggest-accounts', getSuggestAccounts, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const [isShowMore, setIsShowMore] = useState(false)

  const data = useMemo(() => {
    if (responseData) {
      if (isShowMore) {
        return responseData
      }

      return responseData.slice(0, 4)
    }
    return []
  }, [isShowMore, responseData])

  const handleShowMore = () => {
    setIsShowMore((prev) => !prev)
  }

  return {
    data,
    isLoading: !error && !data,
    isError: !!error?.status,
    isShowMore,
    mutate,
    handleShowMore,
  }
}

export default useSuggestAccount
