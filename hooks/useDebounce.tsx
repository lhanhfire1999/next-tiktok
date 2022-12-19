import { useEffect, useState } from 'react'

const useDebounce = <T extends {}>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return debouncedValue
}

export default useDebounce
