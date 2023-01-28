import { useState } from 'react'
import { UploadResponse } from '~/pages/api/upload'
import { postUploadForm, UploadBodyParams } from '~/services/upload'

export const usePostUploadForm = () => {
  const [data, setData] = useState<null | UploadResponse>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitForm = async (bodyParams: UploadBodyParams) => {
    setIsLoading(true)
    const res = await postUploadForm(bodyParams)
    setData(res)
    setIsLoading(false)
  }

  return { data, isLoading, handleSubmitForm }
}
