'use client'
import classNames from 'classnames/bind'
import React from 'react'

import { CircleXIcon, SearchIcon, SpinnerIcon } from '~/components/Icons'
import { HeaderSearchProvider, useHeaderSearch } from '../../contexts/HeaderSearchContext'
import PopperSearch from './PopperSearch'
import styles from './Search.module.scss'

interface ChildrenProp {
  children: React.ReactNode
}

interface SearchComposition {
  SearchBar: typeof SearchBar
  PopperSearch: typeof PopperSearch
}

const cx = classNames.bind(styles)

const Search: React.FC<ChildrenProp> & SearchComposition = ({ children }) => {
  return (
    <HeaderSearchProvider>
      <div className={cx('search')}>{children} </div>
    </HeaderSearchProvider>
  )
}

const SearchBar = () => {
  const { searchText, handleChangeSearchText } = useHeaderSearch()
  const loading = false

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.currentTarget.value)
  }

  const handleClearSearch = () => {
    handleChangeSearchText('')
  }

  return (
    <>
      <input type="text" value={searchText} onChange={handleChangeSearch} placeholder="Search accounts" />

      {loading && <SpinnerIcon className={cx('loading-icon')} />}

      {!loading && !!searchText && (
        <button className={cx('btn', 'clear-btn')} onClick={handleClearSearch}>
          <CircleXIcon className={cx('clear-icon')} />
        </button>
      )}

      <button className={cx('btn', 'search-btn')}>
        <SearchIcon className={cx('search-icon')} />
      </button>
    </>
  )
}

Search.SearchBar = SearchBar
Search.PopperSearch = PopperSearch

export default Search
