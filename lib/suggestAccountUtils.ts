import fs from 'fs'
import path from 'path'
import { SuggestAccount } from '~/services/suggestAccount'

const jsonDirectory = path.join(process.cwd(), 'tmp')

export const getSuggestAccountData = () => {
  const fileContents = fs.readFileSync(jsonDirectory + '/suggestAccount.json', 'utf8')
  const MOCKUP_DATA = JSON.parse(fileContents.toString())
  return MOCKUP_DATA['data'] as SuggestAccount[]
}
