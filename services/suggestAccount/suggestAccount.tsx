import { SuggestAccountResponse } from './type'

export const getSuggestAccounts = async () => {
  try {
    const response = await fetch(`/api/suggest-account`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const res: SuggestAccountResponse = await response.json()
      return res.data
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
