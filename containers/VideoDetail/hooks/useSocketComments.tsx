import React, { useEffect, useState } from 'react'
import { Comment } from '~/services/comment'

const useSocketComments = () => {
  const [data, setData] = useState<Comment[]>()

  useEffect(() => {
    ;(async () => {})()
  }, [])

  return <></>
}

export default useSocketComments
