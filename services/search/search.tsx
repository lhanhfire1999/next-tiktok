import { JSONResponse } from './type'

export const getAccountList = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL as string)
    if (response.ok) {
      const { data }: JSONResponse = await response.json()
      return data
    } else {
      throw response
    }
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
