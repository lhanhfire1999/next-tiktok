import React, { useContext } from 'react'
import { KeyedMutator } from 'swr/_internal'

import useDebounce from '~/hooks/useDebounce'
import { Account } from '~/services/search'
import useSearchAccounts from '../hooks/useSearchHistory'
import { useSearchBar } from './SearchBarContext'

interface SearchPopperProviderProp {
  children: React.ReactNode
  hasShowPopper: boolean
  onChangeShowPopper: (value: boolean) => void
}

interface ContextProp {
  hasShowPopper: boolean
  handleChangeShowPopper: (value: boolean) => void
  searchText: string
  accountList?: Account[]
  isLoading: boolean
  isError: boolean
  mutate: KeyedMutator<Account[]>
}

const Context = React.createContext<ContextProp | null>(null)

export const SearchPopperProvider: React.FC<SearchPopperProviderProp> = ({
  children,
  hasShowPopper,
  onChangeShowPopper,
}) => {
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
        searchText,
        hasShowPopper,
        accountList: data,
        isLoading,
        isError,
        mutate,
        handleChangeShowPopper: onChangeShowPopper,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSearchPopper = () => {
  return useContext(Context) as ContextProp
}
