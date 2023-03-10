import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import useSWR from 'swr'
import { getDiscoverById } from '~/services/discover'

const useDiscoverById = (videoId: string) => {
  const { data, mutate, error } = useSWR(videoId ? { id: videoId } : null, getDiscoverById)

  useEffect(() => {
    if (!!error?.status) {
      notFound()
    }
  }, [error])

  return {
    data,
    isLoading: !error && !data,
    mutate,
    isError: !!error?.status,
  }
}

export default useDiscoverById
