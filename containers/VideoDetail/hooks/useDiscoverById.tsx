import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'
import { getDiscoverById } from '~/services/discover'

const useDiscoverById = (videoId: string) => {
  const { data: response, mutate, error } = useSWR(videoId ? { id: videoId } : null, getDiscoverById)

  useEffect(() => {
    if (!!error?.status) {
      notFound()
    }
  }, [error])

  return {
    data: response?.data,
    isLoading: !error && !response?.data,
    mutate,
    isError: !!error?.status,
  }
}

export default useDiscoverById
