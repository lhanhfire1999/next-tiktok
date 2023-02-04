import { useEffect } from 'react'

const useInfinityScroll = (ref: React.RefObject<HTMLLIElement>, callback: () => void) => {
  useEffect(() => {
    const lastItem = ref.current

    if (!lastItem) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(entry.target)
      }
    })

    observer.observe(ref.current)

    return () => {
      observer.unobserve(lastItem)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useInfinityScroll
