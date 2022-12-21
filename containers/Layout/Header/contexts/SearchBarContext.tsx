import React, { useContext, useState } from 'react'

interface SearchBarContextProp {
  children: React.ReactNode
}

interface ContextProp {
  searchText: string
  handleChangeSearchText: (string: string) => void
}

const Context = React.createContext<ContextProp | null>(null)

export const SearchBarProvider: React.FC<SearchBarContextProp> = ({ children }) => {
  const [searchText, setSearchText] = useState('')

  const handleChangeSearchText = (text: string) => {
    setSearchText(text)
  }

  return (
    <Context.Provider
      value={{
        searchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSearchBar = () => {
  return useContext(Context) as ContextProp
}
