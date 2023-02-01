import { useState } from 'react'
import useSWR from 'swr'
import { DiscoverRequestQuery } from '~/services/discover'
import { getDiscoverList } from '~/services/discover/discover'

const useFetchDiscover = ({ page, offset = 5 }: DiscoverRequestQuery) => {
  const { data, error, mutate } = useSWR({ page, offset }, getDiscoverList)

  return {
    data,
    isLoading: !error && !data,
    isError: !!error?.status,
    mutate,
  }
}

export default useFetchDiscover
