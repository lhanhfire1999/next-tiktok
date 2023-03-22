import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useSocketListener } from '~/contexts'
import { Comment, getCommentsById } from '~/services/comment'

const useFetchCommentById = () => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Comment[]>([])

  useSocketListener('sendCommentToClient', (newComment) => {
    setData((prev) => [newComment, ...prev])
  })

  const id = useMemo(() => {
    return searchParams?.get('id')
  }, [searchParams])

  const fetchData = async (videoId: string) => {
    setIsLoading(true)
    const res = await getCommentsById({ videoId, page: page, offset: 7 })
    setData((prev) => {
      if (res.data && res.data.length > 0) {
        return [...prev, ...res.data]
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page])

  return { isLoading, data, handleIncreasePage }
}

export default useFetchCommentById
