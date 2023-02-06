import { NextApiRequest, NextApiResponse } from 'next'
import { getSuggestAccountData } from '~/lib/suggestAccountUtils'
import { SuggestAccountResponse } from '~/services/suggestAccount'

const handler = (req: NextApiRequest, res: NextApiResponse<SuggestAccountResponse>) => {
  if (req.method === 'GET') {
    const MOCKUP_DATA = getSuggestAccountData()
    return res.status(201).send({ message: 'Success', data: MOCKUP_DATA })
  }
  return res.status(404).send({ message: 'Invalid request' })
}

export default handler
