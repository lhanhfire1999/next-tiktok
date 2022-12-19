import { JSONResponse, SearchQueryParam } from './type'

export const getSearchAccounts = async ({ query, type = 'less' }: SearchQueryParam) => {
  try {
    const queryParams = new URLSearchParams({ q: query, type })
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/search?${queryParams}`)
    if (response.ok) {
      const { data }: JSONResponse = await response.json()
      return data
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
