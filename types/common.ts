export interface Pagination {
  page?: string | number
  offset?: string | number
}

export interface Message {
  message: string
}

export interface ApiResponse<T> extends Message {
  data?: T[]
}

export interface ApiDetailResponse<T> extends Message {
  data?: T
}
