import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/dbConnection'
import DiscoverModel from '~/models/discover.model'
import {
  Discover,
  DiscoverDetailResponse,
  DiscoverResponse,
  UpdateDiscoverRequestQuery,
  UpdateStrategy,
} from '~/services/discover'

const handler = async (req: NextApiRequest, res: NextApiResponse<DiscoverResponse | DiscoverDetailResponse>) => {
  if (req.method === 'PUT') {
    const { param, id, username } = req.query as UpdateDiscoverRequestQuery

    if (param && id && username) {
      try {
        await dbConnect()
        if (param === UpdateStrategy.Follow) {
          await DiscoverModel.updateMany({ username: username }, [
            {
              $set: {
                is_followed: { $not: '$is_followed' },
              },
            },
          ])

          return res.status(201).send({ message: 'Update follow success' })
        }

        if (param === UpdateStrategy.Like) {
          await DiscoverModel.findOneAndUpdate<Discover>({ id: id }, [
            {
              $set: {
                is_liked: { $not: '$is_liked' },
                likes: {
                  $cond: {
                    if: { $eq: ['$is_liked', true] },
                    then: {
                      $sum: ['$likes', -1],
                    },
                    else: {
                      $sum: ['$likes', 1],
                    },
                  },
                },
              },
            },
          ])

          return res.status(201).send({ message: 'Update like success' })
        }

        return res.status(422).send({ message: 'Strategy param is invalid' })
      } catch (e: any) {
        res.status(422).send({ message: 'Update fail' })
      }
    }

    return res.status(422).send({ message: 'Request query is wrong' })
  }

  if (req.method === 'GET') {
    try {
      await dbConnect()
      const { param: id } = req.query as { param: string }
      const data = await DiscoverModel.findOne<Discover>({ id })

      if (!data) return res.status(422).send({ message: 'VideoId is invalid' })

      return res.status(201).send({ message: 'Discover detail fetch success', data })
    } catch (e: any) {
      res.status(422).send({ message: 'Fetch data fail' })
    }
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
