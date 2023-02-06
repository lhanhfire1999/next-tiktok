import { NextApiRequest, NextApiResponse } from 'next'
import { getFollowAccountData } from '~/lib/discoverUtil'
import { DiscoverResponse } from '~/services/discover'

const handler = (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'GET') {
    const MOCKUP_DATA = getFollowAccountData()
    return res.status(201).send({ message: 'Success', data: MOCKUP_DATA })
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
