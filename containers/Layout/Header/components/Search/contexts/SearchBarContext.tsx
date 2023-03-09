import { useLocale } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

interface SearchBarContextProp {
  children: React.ReactNode
}

interface ContextProp {
  searchText: string
  handleChangeSearchText: (string: string) => void
}

const Context = React.createContext<ContextProp | null>(null)

export const SearchBarProvider: React.FC<SearchBarContextProp> = ({ children }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const locale = useLocale()

  useEffect(() => {
    setSearchText(() => {
      const querySearch = searchParams?.get('q')
      if (pathname === `/${locale}/search` && querySearch) {
        return querySearch
      }

      // clear searchText when click logo
      return ''
    })
  }, [locale, pathname, searchParams])

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
