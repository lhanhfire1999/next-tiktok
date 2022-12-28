import { createContext, useContext, useState } from 'react'

interface ContextProp {
  isShowing: boolean
  handleChangeShowPopper: (value: boolean) => void
}

interface ProviderProp {
  children: React.ReactNode
}

const Context = createContext<ContextProp | null>(null)

export const MenuPopperProvider: React.FC<ProviderProp> = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false)

  const handleChangeShowPopper = (value: boolean) => {
    setIsShowing(value)
  }

  return <Context.Provider value={{ isShowing, handleChangeShowPopper }}>{children}</Context.Provider>
}

export const useMenuPopper = () => useContext(Context) as ContextProp
