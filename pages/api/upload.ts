import { NextApiRequest, NextApiResponse } from 'next'
import { UploadRequestBody } from '~/services/upload'

interface UploadNextApiRequest extends NextApiRequest {
  body: UploadRequestBody
}

export interface UploadResponse {
  message: string
}

const handler = (req: UploadNextApiRequest, res: NextApiResponse<UploadResponse>) => {
  if (req.method === 'POST') {
    const { caption, allowUserMode, watchMode } = req.body

    if (!caption || !allowUserMode || !watchMode) {
      return res.status(422).send({ message: 'Invalid input' })
    }

    return res.status(201).send({ message: 'Upload successful' })
  }
  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
