import { useEffect, useRef } from 'react'

interface InfiniteScrollOptions {
  callback?: () => void
  useParentDivAsRoot?: boolean
  rootMargin?: string
}

const useInfiniteScroll = ({ callback, useParentDivAsRoot = false, rootMargin = '0px' }: InfiniteScrollOptions) => {
  const scrollTriggerRef = useRef<HTMLLIElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!scrollTriggerRef.current && !callback) return

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const trigger = entries[0]

      if (trigger.isIntersecting) {
        if (callback) callback()

        if (scrollTriggerRef.current) observerRef?.current?.unobserve(scrollTriggerRef.current)
      }
    }

    const options = {
      root: useParentDivAsRoot ? (scrollTriggerRef!.current!.parentNode as Element) : null,
      rootMargin,
      threshold: 0,
    }

    observerRef.current = new IntersectionObserver(handleObserver, options)

    if (scrollTriggerRef.current) {
      observerRef.current.observe(scrollTriggerRef.current)
    }

    return () => {
      observerRef?.current?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { scrollTriggerRef }
}

export default useInfiniteScroll
