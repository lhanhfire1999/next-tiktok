import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Comment, getCommentsById } from '~/services/comment'

const useCommentById = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Comment[]>([])

  const id = useMemo(() => {
    return searchParams?.get('id')
  }, [searchParams])

  const fetchData = async (videoId: string) => {
    setIsLoading(true)
    const res = await getCommentsById({ videoId, page: page, offset: 5 })

    setData((prev) => {
      if (res.data?.length) {
        const newData = [...prev, ...res.data]
        return newData
      }
      return prev
    })

    setIsLoading(false)
  }

  const handleIncreasePage = () => {
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    if (id) {
      fetchData(id)
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page])

  return { isLoading, data, handleIncreasePage }
}

export default useCommentById
