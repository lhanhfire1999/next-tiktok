import { useEffect, useRef } from 'react'

const useTitle = (title: string) => {
  const originalTitleRef = useRef(document.title)

  useEffect(() => {
    const { current: originalTitle } = originalTitleRef

    if (document.title !== title) document.title = title

    return () => {
      document.title = originalTitle || ''
    }
  }, [title])
}

export default useTitle
