'use client'
import React, { useContext, useEffect } from 'react'
import { KeyedMutator } from 'swr'
import { useSocket } from '~/contexts'
import { Discover, updateFollowOrLikeDiscover, UpdateStrategy } from '~/services/discover'
import { useFetchDiscoverById } from '../hooks'

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
  const { data, isError, isLoading, mutate } = useFetchDiscoverById(videoId)
  const { socket } = useSocket()

  useEffect(() => {
    if (socket && videoId) {
      socket.emit('joinChannel', videoId)
      return
    }
  }, [socket, videoId])

  const handleUpdateFollow = async (id: string, username: string) => {
    await updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Follow })
    data && mutate({ ...data, is_followed: !data.is_followed }, false)
  }

  const handleUpdateLike = async (id: string, username: string) => {
    await updateFollowOrLikeDiscover({ id, username, param: UpdateStrategy.Like })
    if (data && data.is_liked) {
      mutate({ ...data, is_liked: false, likes: data.likes - 1 }, false)
      return
    }

    if (data && !data.is_liked) {
      mutate({ ...data, is_liked: true, likes: data.likes + 1 }, false)
      return
    }
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
