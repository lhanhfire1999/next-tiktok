import { Pagination } from '~/types/common'

export enum UpdateStrategy {
  Follow = 'follow',
  Like = 'like',
}

export interface Discover {
  id: string
  name: string
  username: string
  avatar: string
  is_followed: boolean
  is_liked: boolean
  video: string
  caption: string
  likes: number
  shares: number
  comments: number
  timestamp: string
  button_visible: boolean
  music_name: string
  has_tick: boolean
}

export type DiscoverStrategyParam = UpdateStrategy.Follow | UpdateStrategy.Like

export interface DiscoverDetailRequestQuery {
  id?: string
}

export interface UpdateDiscoverRequestQuery extends DiscoverDetailRequestQuery {
  username?: string
  param?: DiscoverStrategyParam
}

export interface DiscoverRequestQuery extends UpdateDiscoverRequestQuery, Pagination {}

export interface DiscoverResponse {
  message: string
  data?: Discover[]
}

export interface DiscoverDetailResponse {
  message: string
  data?: Discover
}
