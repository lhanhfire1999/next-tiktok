'use client'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

interface Context {
  isOpenModal: boolean
  handleToggleModal: (value: boolean) => void
}

interface ProviderContext {
  children: React.ReactNode
}

const Context = createContext<Context | null>(null)

export const AuthModalProvider: React.FC<ProviderContext> = ({ children }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: session } = useSession()

  const handleToggleModal = (value: boolean) => {
    setIsOpenModal(value)
  }

  useEffect(() => {
    if (session) {
      handleToggleModal(false)
    }
  }, [session])
  return <Context.Provider value={{ isOpenModal, handleToggleModal }}>{children}</Context.Provider>
}

export const useAuthModal = () => useContext(Context) as Context
