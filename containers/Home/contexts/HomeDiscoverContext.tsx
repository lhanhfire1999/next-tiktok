import React, { useContext, useEffect, useState } from 'react'
import { Discover, getDiscoverList } from '~/services/discover'

interface ContextProps {
  data: Discover[] | undefined
  isLoading: boolean
  handleUpPage: () => void
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

  return <Context.Provider value={{ data: data, isLoading, handleUpPage }}>{children}</Context.Provider>
}

export const useHomeDiscover = () => useContext(Context) as ContextProps
