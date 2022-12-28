import { createContext, FC, ReactNode, useContext, useState } from 'react'

interface ContextProp {
  isShow: boolean
  handleChangeShowLanguages: (value: boolean) => void
}

interface ProviderProp {
  children: ReactNode
}

const Context = createContext<null | ContextProp>(null)

export const LanguageProvider: FC<ProviderProp> = ({ children }) => {
  const [isShow, setIsShow] = useState(false)

  const handleChangeShowLanguages = (value: boolean) => {
    setIsShow(value)
  }
  return <Context.Provider value={{ isShow, handleChangeShowLanguages }}>{children}</Context.Provider>
}

export const useLanguage = () => useContext(Context) as ContextProp
