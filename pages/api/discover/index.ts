import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/dbConnection'
import DiscoverModel from '~/models/discover.model'

import { Discover, DiscoverRequestQuery, DiscoverResponse } from '~/services/discover'

const handler = async (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'GET') {
    const { page = '1', offset = '5' } = req.query as unknown as DiscoverRequestQuery

    try {
      await dbConnect()

      const data = await DiscoverModel.find<Discover>({})
        .skip(parseInt(offset as string) * (parseInt(page as string) - 1))
        .limit(parseInt(offset as string))
        .lean()

      const cookies = req.cookies
      if (!cookies['next-auth.session-token'] && !cookies['__Secure-next-auth.session-token']) {
        const dataNotLogin = data.map((item) => ({ ...item, is_followed: false, is_liked: false }))
        return res.status(201).send({ message: 'Success', data: dataNotLogin })
      }

      return res.status(201).send({ message: 'Success', data: data })
    } catch (e: any) {
      res.status(422).send({ message: 'Fetch data fail' })
    }
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
