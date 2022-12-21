import useSWR from 'swr'
import { getSearchAccounts, SearchQueryParam } from '~/services/search'

interface Params extends SearchQueryParam {
  shouldCallApi: boolean
}

const useSearchAccounts = ({ shouldCallApi, query, type = 'less' }: Params) => {
  const { data, error, mutate } = useSWR(shouldCallApi ? { query, type } : null, getSearchAccounts)

  return {
    data,
    isLoading: shouldCallApi && !error && !data,
    mutate,
    isError: !!error?.status,
  }
}

export default useSearchAccounts
