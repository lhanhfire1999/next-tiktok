import { NextApiRequest, NextApiResponse } from 'next'
import { getDiscoverData, updateDiscover } from '~/lib/discoverUtil'
import { DiscoverResponse, UpdateDiscoverRequestQuery } from '~/services/discover'

const handler = (req: NextApiRequest, res: NextApiResponse<DiscoverResponse>) => {
  if (req.method === 'PUT') {
    const { param, id, username } = req.query as unknown as UpdateDiscoverRequestQuery

    if (param && id && username) {
      const isUpdated = updateDiscover({ id, username, param })

      if (isUpdated) return res.status(201).send({ message: 'Update success', data: getDiscoverData() })

      return res.status(422).send({ message: `Id don't exist` })
    }

    return res.status(422).send({ message: 'Request query is wrong' })
  }

  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
