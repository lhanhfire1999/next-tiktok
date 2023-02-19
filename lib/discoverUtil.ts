import fs from 'fs'
import path from 'path'
import { Discover, UpdateDiscoverRequestQuery, UpdateStrategy } from '~/services/discover'

const jsonDirectory = path.join(process.cwd(), '/tmp')

const saveData = (data: Discover[]) => {
  fs.writeFileSync(jsonDirectory + '/discover.json', JSON.stringify(data, null, 2))
}

export const getDiscoverData = () => {
  const fileContents = fs.readFileSync(jsonDirectory + '/discover.json', 'utf8')
  const MOCKUP_DATA: Discover[] = JSON.parse(fileContents.toString())
  return MOCKUP_DATA
}

export const getFollowAccountData = () => {
  const MOCKUP_DATA = getDiscoverData()
  let usernameList: string[] = []

  const followAccounts = [...MOCKUP_DATA].reduce<Discover[]>((prev, curr) => {
    if (!curr.is_followed) return prev

    const isUsernameExist = usernameList.some((item) => item === curr.username)
    if (isUsernameExist) return prev

    usernameList.push(curr.username)
    return [...prev, curr]
  }, [])

  return followAccounts
}

export const updateDiscover = ({ id, username, param: strategy }: UpdateDiscoverRequestQuery) => {
  const MOCKUP_DATA = getDiscoverData()
  const hasId = MOCKUP_DATA.some((item) => item.id.toString() === id!.toString())

  if (!hasId) return false

  if (strategy == UpdateStrategy.Follow) {
    const newData = [...MOCKUP_DATA].map((item) => {
      if (item.username === username) {
        return { ...item, is_followed: !item.is_followed }
      }
      return item
    })

    saveData(newData)
  }

  if (strategy == UpdateStrategy.Like) {
    const newData = [...MOCKUP_DATA]
    const index = newData.findIndex((item) => item.id.toString() === id!.toString())
    newData[index].is_liked = !newData[index].is_liked

    if (newData[index].is_liked) {
      newData[index].likes = newData[index].likes + 1
    } else {
      newData[index].likes = newData[index].likes - 1
    }
    saveData(newData)
  }

  return true
}
