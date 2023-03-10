'use client'
import React, { useContext } from 'react'
import { KeyedMutator } from 'swr'
import { Discover, DiscoverDetailResponse, updateFollowOrLikeDiscover, UpdateStrategy } from '~/services/discover'
import useDiscoverById from '../hooks/useDiscoverById'

interface ProviderProp {
  children: React.ReactNode
  videoId: string
}

interface ContextProp {
  data: Discover | undefined
  isError: boolean
  isLoading: boolean
  mutate: KeyedMutator<Discover | undefined>
  handleUpdateFollow: (id: string, username: string) => Promise<void>
  handleUpdateLike: (id: string, username: string) => Promise<void>
}

const Context = React.createContext<null | ContextProp>(null)

export const VideoDetailProvider: React.FC<ProviderProp> = ({ children, videoId }) => {
  const { data, isError, isLoading, mutate } = useDiscoverById(videoId)

  const handleUpdateFollow = async (id: string, username: string) => {
    await updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Follow })
    data && mutate({ ...data, is_followed: !data.is_followed })
  }

  const handleUpdateLike = async (id: string, username: string) => {
    await updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Like })
    mutate()
  }

  return (
    <Context.Provider value={{ data, isError, isLoading, mutate, handleUpdateFollow, handleUpdateLike }}>
      {children}
    </Context.Provider>
  )
}

export const useVideoDetail = () => {
  return useContext(Context) as ContextProp
}
