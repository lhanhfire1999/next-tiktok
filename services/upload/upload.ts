import { UploadResponse } from '~/pages/api/upload'
import { UploadRequestBody } from './type'

export const postUploadForm = async (bodyParams: UploadRequestBody) => {
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyParams),
    })
    if (response.ok) {
      const res: UploadResponse = await response.json()
      return res
    } else {
      throw response
    }
  } catch (error) {
    throw error
  }
}
