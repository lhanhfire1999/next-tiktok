export interface Discover {
  id: number
  name: string
  username: string
  avatar: string
  is_followed: boolean
  video: string
  caption: string
  likes: number
  shares: number
  comments: number
  timestamp: string
  button_visible: boolean
}

export interface DiscoverRequestQuery {
  page?: string | number
  offset?: string | number
}

export interface DiscoverResponse {
  message: string
  data?: Discover[]
}
