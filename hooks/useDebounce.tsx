import { useEffect, useState } from 'react'

const useDebounce = <T extends {}>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
    return () => {
      clearTimeout(timer)
    }
  }, [delay, value])

  return debouncedValue
}

export default useDebounce
