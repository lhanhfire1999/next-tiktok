'use client'
import { createContext, useContext, useState } from 'react'

interface Context {
  isOpenModal: boolean
  handleToggleModal: (value: boolean) => void
}

interface ProviderContext {
  children: React.ReactNode
}

const Context = createContext<Context | null>(null)

export const UploadChangeVideoModal: React.FC<ProviderContext> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = (value: boolean) => {
    setIsOpenModal(value)
  }

  return <Context.Provider value={{ isOpenModal, handleToggleModal }}>{children}</Context.Provider>
}

export const useUploadChangeVideoModal = () => useContext(Context) as Context
