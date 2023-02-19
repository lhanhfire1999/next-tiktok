import React, { useContext, useEffect, useState } from 'react'
import { Discover, getDiscoverList, updateFollowOrLikeDiscover, UpdateStrategy } from '~/services/discover'

interface ContextProps {
  data: Discover[] | undefined
  isLoading: boolean
  handleUpPage: () => void
  handleUpdateFollow: (id: number, username: string) => void
  handleUpdateLike: (id: number, username: string) => void
}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext<ContextProps | null>(null)

export const HomeDiscoverProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Discover[]>([])

  const handleUpPage = () => {
    setPage((prev) => prev + 1)
  }

  const handleUpdateFollow = (id: number, username: string) => {
    setData((prev) => {
      const newData = [...prev].map((item) => {
        if (item.username === username) return { ...item, is_followed: !item.is_followed }
        return item
      })

      return newData
    })

    // updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Follow })
  }

  const handleUpdateLike = (id: number, username: string) => {
    setData((prev) => {
      const newData = [...prev]
      const index = newData.findIndex((item) => item.id.toString() === id.toString())
      newData[index].is_liked = !newData[index].is_liked

      if (newData[index].is_liked) {
        newData[index].likes = newData[index].likes + 1
      } else {
        newData[index].likes = newData[index].likes - 1
      }

      return newData
    })

    // updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Like })
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const res = await getDiscoverList({ page, offset: 5 })
      setData((prev) => {
        if (res.data && res.data.length > 0) {
          return [...prev, ...res.data]
        }
        return prev
      })

      setIsLoading(false)
    })()
  }, [page])

  return (
    <Context.Provider value={{ data: data, isLoading, handleUpPage, handleUpdateFollow, handleUpdateLike }}>
      {children}
    </Context.Provider>
  )
}

export const useHomeDiscover = () => useContext(Context) as ContextProps
