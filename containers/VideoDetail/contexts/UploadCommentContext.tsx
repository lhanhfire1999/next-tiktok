import React, { useContext, useRef, useState } from 'react'

interface ProviderProp {
  children: React.ReactNode
}

interface ContextProp {
  comment: string
  handleUpdateComment: (value: string) => void
  commentContentRef: React.RefObject<HTMLParagraphElement>
}

const Context = React.createContext<ContextProp | null>(null)

export const UploadCommentProvider: React.FC<ProviderProp> = ({ children }) => {
  const [comment, setComment] = useState<string>('')
  const commentContentRef = useRef<HTMLParagraphElement>(null)

  const handleUpdateComment = (value: string, isTwoWayBinding?: boolean) => {
    setComment(value)

    if (isTwoWayBinding) {
      commentContentRef.current!.innerHTML = value
      return
    }
  }

  return <Context.Provider value={{ comment, handleUpdateComment, commentContentRef }}>{children}</Context.Provider>
}

export const useUploadComment = () => {
  return useContext(Context) as ContextProp
}
