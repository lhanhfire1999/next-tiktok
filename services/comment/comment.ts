import queryString from 'query-string'
import { ApiDetailResponse } from '~/types/common'
import { CommentRequestQuery } from './type'

export const getCommentsById = async ({ id, page = 1, offset = 5 }: CommentRequestQuery) => {
  const queryParams = queryString.stringify({ page, offset })

  try {
    const response = await fetch(`/api/comments/${id}?${queryParams}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: ApiDetailResponse<Comment> = await response.json()
      return res
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
