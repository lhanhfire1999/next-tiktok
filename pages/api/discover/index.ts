import { NextApiRequest, NextApiResponse } from 'next'
import { getDiscoverData } from '~/lib/discoverUtil'
import { DiscoverRequestQuery, DiscoverResponse } from '~/services/discover'
import { paginate } from '~/utils'

const handler = (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'GET') {
    const { page = '1', offset = '5' } = req.query as unknown as DiscoverRequestQuery

    const MOCKUP_DATA = getDiscoverData()
    const data = paginate(MOCKUP_DATA, parseInt(page as string), parseInt(offset as string))

    const cookies = req.cookies
    console.log(!cookies['next-auth.session-token'] || !cookies['__Secure-next-auth.session-token'])

    if (!cookies['next-auth.session-token'] && !cookies['__Secure-next-auth.session-token']) {
      const dataNotLogin = data.map((item) => ({ ...item, is_followed: false, is_liked: false }))
      return res.status(201).send({ message: 'Success', data: dataNotLogin })
    }

    return res.status(201).send({ message: 'Success', data: data })
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
