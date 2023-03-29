import queryString from 'query-string'
import { ApiResponse } from '~/types/common'
import { Comment, CommentRequestQuery } from './type'

export const getCommentsById = async ({ videoId, page = 1, offset = 5 }: CommentRequestQuery) => {
  const queryParams = queryString.stringify({ page, offset })

  try {
    const response = await fetch(`/api/comment/${videoId}?${queryParams}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: ApiResponse<Comment> = await response.json()
      return res
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
