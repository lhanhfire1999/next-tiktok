'use client'
import classNames from 'classnames/bind'
import React, { useRef } from 'react'

import { CircleXIcon, SearchIcon, SpinnerIcon } from '~/components/Icons'
import { SearchBarProvider, useSearchBar } from '../../contexts/SearchBarContext'
import PopperSearch from './SearchPopper'
import styles from './Search.module.scss'
import { SearchAccountListProvider, useSearchAccountList } from '../../contexts/SearchAccountsContext'

interface ChildrenProp {
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const Search: React.FC<ChildrenProp> = ({ children }) => {
  return (
    <SearchBarProvider>
      <SearchAccountListProvider>
        <div className={cx('search')}>{children} </div>
      </SearchAccountListProvider>
    </SearchBarProvider>
  )
}

const SearchBar = () => {
  const { searchText, handleChangeSearchText } = useSearchBar()
  const { isLoading } = useSearchAccountList()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.currentTarget.value)
  }

  const handleClearSearch = () => {
    if (isLoading) return
    handleChangeSearchText('')
    searchRef.current?.focus()
  }

  return (
    <>
      <input
        ref={searchRef}
        type="text"
        value={searchText}
        onChange={handleOnChangeSearch}
        placeholder="Search accounts"
      />
      {!!searchText && (
        <button className={cx('btn')} onClick={handleClearSearch}>
          {isLoading ? <SpinnerIcon className={cx('loading-icon')} /> : <CircleXIcon className={cx('clear-icon')} />}
        </button>
      )}

      <button className={cx('btn', 'search-btn')}>
        <SearchIcon className={cx('search-icon')} />
      </button>
    </>
  )
}

const CompoundSearch = Object.assign(Search, { SearchBar, PopperSearch })

export default CompoundSearch
