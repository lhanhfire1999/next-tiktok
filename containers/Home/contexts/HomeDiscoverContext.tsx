import React, { useContext, useEffect, useState } from 'react'
import { Discover, getDiscoverList, updateDiscover, UpdateStrategy } from '~/services/discover'

interface ContextProps {
  data: Discover[] | undefined
  isLoading: boolean
  handleUpPage: () => void
  handleUpdateFollow: (id: number) => void
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

  const handleUpdateFollow = (id: number) => {
    setData((prev) => {
      const newData = [...prev]
      const index = newData.findIndex((item) => item.id.toString() === id.toString())
      newData[index].is_followed = !newData[index].is_followed

      return newData
    })

    updateDiscover({ id, param: UpdateStrategy.Follow })
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
    <Context.Provider value={{ data: data, isLoading, handleUpPage, handleUpdateFollow }}>{children}</Context.Provider>
  )
}

export const useHomeDiscover = () => useContext(Context) as ContextProps
