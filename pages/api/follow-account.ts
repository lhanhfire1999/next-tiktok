import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '~/lib/dbConnection'
import DiscoverModel from '~/models/discover.model'
import { Discover, DiscoverResponse } from '~/services/discover'

const handler = async (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'GET') {
    try {
      await dbConnect()
      const data = await DiscoverModel.find<Discover>({ is_followed: true }).lean()

      let usernameList: string[] = []
      const followAccounts = [...data].reduce<Discover[]>((prev, curr) => {
        const isUsernameExist = usernameList.some((item) => item === curr.username)
        if (isUsernameExist) return prev

        usernameList.push(curr.username)
        return [...prev, curr]
      }, [])

      return res.status(201).send({ message: 'Success', data: followAccounts })
    } catch (e: any) {
      res.status(422).send({ message: 'Fetch  followed accounts fail' })
    }
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
