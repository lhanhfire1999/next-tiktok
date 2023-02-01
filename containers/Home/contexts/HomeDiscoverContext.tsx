import React, { useContext, useState } from 'react'
import { KeyedMutator } from 'swr'
import { Discover } from '~/services/discover'
import { useFetchDiscover } from '../hooks'

interface ContextProps {
  data: Discover[] | undefined
  isLoading: boolean
  isError: boolean
  mutate: KeyedMutator<Discover[] | undefined>
  handleUpPage: () => void
}

interface ProviderProps {
  children: React.ReactNode
}

const Context = React.createContext<ContextProps | null>(null)

export const HomeDiscoverProvider: React.FC<ProviderProps> = ({ children }) => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, mutate } = useFetchDiscover({ page, offset: 5 })

  const handleUpPage = () => {
    setPage((prev) => prev + 1)
  }

  return <Context.Provider value={{ data, isLoading, isError, mutate, handleUpPage }}>{children}</Context.Provider>
}

export const useHomeDiscover = () => useContext(Context) as ContextProps
