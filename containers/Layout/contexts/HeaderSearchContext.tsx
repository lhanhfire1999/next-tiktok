import React, { useContext, useState } from 'react'

interface HeaderSearchProviderProp {
  children: React.ReactNode
}

interface Context {
  searchText: string
  handleChangeSearchText: (string: string) => void
}

const Context = React.createContext<Context>({
  searchText: '',
  handleChangeSearchText: () => {},
})

export const HeaderSearchProvider: React.FC<HeaderSearchProviderProp> = ({ children }) => {
  const [searchText, setSearchText] = useState('')

  const handleChangeSearchText = (string: string) => {
    setSearchText(string)
  }

  return <Context.Provider value={{ searchText, handleChangeSearchText }}>{children}</Context.Provider>
}

export const useHeaderSearch = () => {
  return useContext(Context)
}
