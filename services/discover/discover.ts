import { DiscoverRequestQuery, DiscoverResponse, DiscoverStrategyParam } from './type'

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

export const updateFollowOrLikeDiscover = async ({ id, param }: { id: number; param: DiscoverStrategyParam }) => {
  const queryParams = queryString.stringify({ id })

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
