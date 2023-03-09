'use client'
import React, { useContext } from 'react'
import { KeyedMutator } from 'swr'
import { Discover, DiscoverDetailResponse } from '~/services/discover'
import useDiscoverById from '../hooks/useDiscoverById'

interface ProviderProp {
  children: React.ReactNode
  videoId: string
}

interface ContextProp {
  data: Discover | undefined
  isError: boolean
  isLoading: boolean
  mutate: KeyedMutator<DiscoverDetailResponse>
}

const Context = React.createContext<null | ContextProp>(null)

export const VideoDetailProvider: React.FC<ProviderProp> = ({ children, videoId }) => {
  const { data, isError, isLoading, mutate } = useDiscoverById(videoId)

  return <Context.Provider value={{ data, isError, isLoading, mutate }}>{children}</Context.Provider>
}

export const useVideoDetail = () => {
  return useContext(Context) as ContextProp
}
