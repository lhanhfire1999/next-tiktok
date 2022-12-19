import React, { useContext, useEffect, useState } from 'react'
import { KeyedMutator } from 'swr/_internal'
import useDebounce from '~/hooks/useDebounce'
import { Account } from '~/services/search'
import useSearchAccounts from '../hooks/useSearchHistory'
import { useSearchBar } from './SearchBarContext'

interface SearchAccountContextProp {
  children: React.ReactNode
}

interface ContextProp {
  debouncedValue: string
  accountList?: Account[]
  isLoading: boolean
  isError: boolean
  mutate: KeyedMutator<Account[]>
}

const Context = React.createContext<ContextProp | null>(null)

export const SearchAccountListProvider: React.FC<SearchAccountContextProp> = ({ children }) => {
  const { searchText } = useSearchBar()
  const debouncedValue = useDebounce(searchText)

  const { data, isLoading, mutate, isError } = useSearchAccounts({
    shouldCallApi: !!debouncedValue,
    query: debouncedValue,
    type: 'less',
  })

  return (
    <Context.Provider
      value={{
        debouncedValue,
        accountList: data,
        isLoading,
        isError,
        mutate,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSearchAccountList = () => {
  return useContext(Context) as ContextProp
}
