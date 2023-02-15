'use client'
import classNames from 'classnames/bind'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'
import React, { useRef, useState } from 'react'

import { CircleXIcon, SearchIcon, SpinnerIcon } from '~/components/Icons'
import useOnClickOutside from '~/hooks/useOnClickOutside'
import { SearchBarProvider, useSearchBar } from './contexts/SearchBarContext'
import { SearchPopperProvider, useSearchPopper } from './contexts/SearchPopperContext'

import styles from './Search.module.scss'
import PopperSearch from './SearchPopper'

interface ChildrenProp {
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const Search: React.FC<ChildrenProp> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [hasShowPopper, setHasShowPopper] = useState(false)

  useOnClickOutside(wrapperRef, () => {
    setHasShowPopper(false)
  })

  const handleChangeShowPopper = (value: boolean) => {
    setHasShowPopper(value)
  }

  return (
    <SearchBarProvider>
      <SearchPopperProvider hasShowPopper={hasShowPopper} onChangeShowPopper={handleChangeShowPopper}>
        <div className={cx('search')} ref={wrapperRef}>
          {children}
        </div>
      </SearchPopperProvider>
    </SearchBarProvider>
  )
}

const SearchBar = () => {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()

  const { searchText, handleChangeSearchText } = useSearchBar()
  const { isLoading, handleChangeShowPopper, mutate } = useSearchPopper()
  const searchRef = useRef<HTMLInputElement>(null)

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeSearchText(e.currentTarget.value.trimStart())
  }

  const handleClearSearch = () => {
    if (isLoading) return
    mutate([])
    handleChangeShowPopper(false)
    handleChangeSearchText('')
    searchRef.current?.focus()
  }

  const handleClickSearchButton = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e && e.preventDefault()

    if (searchText) {
      const url = queryString.stringifyUrl({ url: `/${locale}/search`, query: { q: searchText } })
      router.push(url)
      handleChangeShowPopper(false)
    }
  }

  const handleOnKeydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const { selectionStart, value } = e.currentTarget
    const { key } = e.nativeEvent

    if (e.key === 'Enter' && value.trim()) {
      handleClickSearchButton()
    }

    if (selectionStart === 0 && key === ' ') {
      e.preventDefault()
    }
  }

  const handleOnFocus = () => {
    handleChangeShowPopper(true)
  }

  return (
    <>
      <input
        ref={searchRef}
        type="text"
        value={searchText}
        onChange={handleOnChangeSearch}
        onKeyDown={handleOnKeydown}
        onFocus={handleOnFocus}
        placeholder={t('Common.searchAccounts')}
      />
      {!!searchText && (
        <button className={cx('btn')} onClick={handleClearSearch}>
          {isLoading ? <SpinnerIcon className={cx('loading-icon')} /> : <CircleXIcon className={cx('clear-icon')} />}
        </button>
      )}

      <button className={cx('btn', 'search-btn')} onMouseDown={handleClickSearchButton}>
        <SearchIcon className={cx('search-icon')} />
      </button>
    </>
  )
}

const CompoundSearch = Object.assign(Search, { SearchBar, PopperSearch })

export default CompoundSearch
