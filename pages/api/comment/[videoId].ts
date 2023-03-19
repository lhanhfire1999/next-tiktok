import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/dbConnection'
import CommentModel from '~/models/comment.model'
import { Comment, CommentRequestQuery } from '~/services/comment'

import { ApiResponse } from '~/types/common'

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse<Comment>>) => {
  if (req.method === 'GET') {
    const { videoId, page = '1', offset = '5' } = req.query as unknown as CommentRequestQuery

    try {
      await dbConnect()

      const data = await CommentModel.find<Comment>({ videoId })
        .skip(parseInt(offset as string) * (parseInt(page as string) - 1))
        .limit(parseInt(offset as string))

      return res.status(201).send({ message: 'Success', data: data })
    } catch (e: any) {
      res.status(422).send({ message: 'Something went wrong at Server' })
    }
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
