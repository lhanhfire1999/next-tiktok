import React from 'react'

interface ProviderProp {
  children: React.ReactNode
}
const Context = React.createContext(null)

export const SocketProvider: React.FC<ProviderProp> = ({ children }) => {
  return <Context.Provider value={null}>{children}</Context.Provider>
}

export const useSocket = () => {
  return null
}
