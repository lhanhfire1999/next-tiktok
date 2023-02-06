import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { getFollowAccountList } from '~/services/discover'

const useFollowAccounts = () => {
  const {
    data: responseData,
    error,
    mutate,
  } = useSWR('follow-account', getFollowAccountList, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const [isShowMore, setIsShowMore] = useState(false)

  const data = useMemo(() => {
    if (responseData) {
      if (isShowMore) {
        return responseData
      }

      return responseData.slice(0, 3)
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

export default useFollowAccounts
