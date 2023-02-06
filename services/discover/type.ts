export enum UpdateStrategy {
  Follow = 'follow',
  Like = 'like',
}

export interface Discover {
  id: number
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

export interface DiscoverRequestQuery {
  page?: string | number
  offset?: string | number
  param?: DiscoverStrategyParam
  id?: string | number
}

export interface DiscoverResponse {
  message: string
  data?: Discover[]
}
