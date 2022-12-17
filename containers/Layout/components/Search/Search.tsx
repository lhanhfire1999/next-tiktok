'use client'
import classNames from 'classnames/bind'
import Image from 'next/image'
import React from 'react'

import { CircleXIcon, SearchIcon, SpinnerIcon } from '~/components/Icons'
import useDebounce from '~/hooks/useDebounce'
import { Account } from '~/services/search/type'
import { HeaderSearchProvider, useHeaderSearch } from '../../contexts/HeaderSearchContext'
import styles from './Search.module.scss'

interface ChildrenProp {
  children: React.ReactNode
}

interface SearchHistoryAccountProp {
  accountList: Account[]
}

interface SearchComposition {
  SearchBar: typeof SearchBar
  SearchHistoryAccountList: typeof SearchHistoryAccountList
  SearchHistoryAccountItem: typeof SearchHistoryAccountItem
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

  return (
    <>
      <input type="text" value={searchText} onChange={handleChangeSearch} placeholder="Search accounts" />

      {loading && <SpinnerIcon className={cx('loading-icon')} />}

      {!loading && !!searchText && (
        <button className={cx('btn', 'clear-btn')}>
          <CircleXIcon className={cx('clear-icon')} />
        </button>
      )}

      <button className={cx('btn', 'search-btn')}>
        <SearchIcon className={cx('search-icon')} />
      </button>
    </>
  )
}

const SearchHistoryAccountList = () => {
  const { searchText } = useHeaderSearch()
  const debouncedSearchText = useDebounce(searchText, 1000)

  return <ul className={cx('wrapper-search', { active: !!debouncedSearchText })}></ul>
}

const SearchHistoryAccountItem: React.FC<SearchHistoryAccountProp> = ({ accountList }) => {
  return (
    <>
      {accountList.map((account) => (
        <li key={account.id}>
          <Image src={account.avatar} alt={account.nickname} />
          <div className={cx('account-info-detail')}></div>
        </li>
      ))}
    </>
  )
}

Search.SearchBar = SearchBar
Search.SearchHistoryAccountList = SearchHistoryAccountList
Search.SearchHistoryAccountItem = SearchHistoryAccountItem

export default Search
