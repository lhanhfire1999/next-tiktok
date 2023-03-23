import React, { useContext, useRef, useState } from 'react'

interface ProviderProp {
  children: React.ReactNode
}

interface ContextProp {
  comment: string
  handleUpdateComment: (value: string, isTwoWayBinding?: boolean) => void
  commentContentRef: React.RefObject<HTMLParagraphElement>
}

const Context = React.createContext<ContextProp | null>(null)

export const CommentProvider: React.FC<ProviderProp> = ({ children }) => {
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

export const useComment = () => {
  return useContext(Context) as ContextProp
}
