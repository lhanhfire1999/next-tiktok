import React, { createContext, useContext } from 'react'

interface FormProviderProp {
  children: React.ReactNode
}

const Context = createContext<null>(null)

export const UploadFormProvider: React.FC<FormProviderProp> = ({ children }) => {
  return <Context.Provider value={null}>{children}</Context.Provider>
}

export const useUploadForm = () => useContext(Context)
