export interface SuggestAccount {
  id: string
  name: string
  user_name: string
  image_url: string
  has_tick: boolean
}

export interface SuggestAccountResponse {
  message: string
  data?: SuggestAccount[]
}
