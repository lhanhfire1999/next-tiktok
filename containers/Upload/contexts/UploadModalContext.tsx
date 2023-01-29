'use client'
import { createContext, useContext, useState } from 'react'

type Strategy = 'post' | 'change-video'

interface ContextProp {
  isOpenModal: boolean
  handleCloseModal: () => void
  strategy: Strategy | null
  handleShowModal: ({ strategy }: { strategy: Strategy }) => void
}

interface ProviderContext {
  children: React.ReactNode
}

const Context = createContext<ContextProp | null>(null)

export const UploadModalProvider: React.FC<ProviderContext> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [strategy, setStrategy] = useState<Strategy | null>(null)

  const handleShowModal = ({ strategy }: { strategy: Strategy }) => {
    setStrategy(strategy)
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return (
    <Context.Provider value={{ isOpenModal, strategy, handleCloseModal, handleShowModal }}>{children}</Context.Provider>
  )
}

export const useUploadModal = () => useContext(Context) as ContextProp
