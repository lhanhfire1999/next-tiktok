import fs from 'fs'
import path from 'path'
import { Discover, DiscoverStrategyParam, UpdateStrategy } from '~/services/discover'

const jsonDirectory = path.join(process.cwd(), 'json')

const saveData = (data: Discover[]) => {
  fs.writeFileSync(jsonDirectory + '/follow.json', JSON.stringify(data, null, 2))
}

export const getDiscoverData = () => {
  const fileContents = fs.readFileSync(jsonDirectory + '/follow.json', 'utf8')
  const MOCKUP_DATA: Discover[] = JSON.parse(fileContents.toString())
  return MOCKUP_DATA
}

export const updateDiscover = ({ id, strategy }: { id: string | number; strategy: DiscoverStrategyParam }) => {
  const MOCKUP_DATA = getDiscoverData()
  const newData = [...MOCKUP_DATA]
  const index = MOCKUP_DATA.findIndex((item) => item.id.toString() === id.toString())

  if (index < 0) return false

  if (strategy == UpdateStrategy.Follow) newData[index].is_followed = !MOCKUP_DATA[index].is_followed

  if (strategy == UpdateStrategy.Like) {
    newData[index].is_liked = !newData[index].is_liked

    if (newData[index].is_liked) {
      newData[index].likes = newData[index].likes + 1
    } else {
      newData[index].likes = newData[index].likes - 1
    }
  }

  saveData(newData)
  return true
}
