import { NextApiRequest, NextApiResponse } from 'next'
import { getDiscoverData, updateDiscover } from '~/lib/discoverUtil'
import { DiscoverRequestQuery, DiscoverResponse } from '~/services/discover'

const handler = (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'PUT') {
    const { param: strategy, id } = req.query as unknown as DiscoverRequestQuery

    if (id && strategy) {
      const isUpdated = updateDiscover({ id, strategy })

      if (isUpdated) return res.status(201).send({ message: 'Update success', data: getDiscoverData() })

      return res.status(422).send({ message: `Id don't exist` })
    }

    return res.status(422).send({ message: 'Request query is wrong' })
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
