import {
  DiscoverDetailRequestQuery,
  DiscoverDetailResponse,
  DiscoverRequestQuery,
  DiscoverResponse,
  UpdateDiscoverRequestQuery,
} from './type'

import queryString from 'query-string'

export const getDiscoverList = async ({ page, offset = '5' }: DiscoverRequestQuery) => {
  const queryParams = queryString.stringify({ page, offset })

  try {
    const response = await fetch(`/api/discover?${queryParams}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: DiscoverResponse = await response.json()
      return res
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}

export const getFollowAccountList = async () => {
  try {
    const response = await fetch(`/api/follow-account`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: DiscoverResponse = await response.json()

      return res.data
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}

export const updateFollowOrLikeDiscover = async ({ id, username, param }: UpdateDiscoverRequestQuery) => {
  const queryParams = queryString.stringify({ id, username })

  try {
    const response = await fetch(`/api/discover/${param}?${queryParams}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: DiscoverResponse = await response.json()
      return res
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}

export const getDiscoverById = async ({ id }: DiscoverDetailRequestQuery) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/discover/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: DiscoverDetailResponse = await response.json()

      return res.data
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
