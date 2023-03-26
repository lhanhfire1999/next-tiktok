import React, { useContext, useRef } from 'react'

interface ProviderProp {
  children: React.ReactNode
}

interface ContextProp {
  commentContentRef: React.RefObject<HTMLParagraphElement>
  handleUpdateComment: (value: string) => void
}

const Context = React.createContext<ContextProp | null>(null)

export const CommentContentBarProvider: React.FC<ProviderProp> = ({ children }) => {
  const commentContentRef = useRef<HTMLParagraphElement>(null)

  const handleUpdateComment = (value: string) => {
    commentContentRef.current!.innerHTML = value
  }

  return (
    <Context.Provider
      value={{
        commentContentRef,
        handleUpdateComment,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCommentContentBar = () => {
  return useContext(Context) as ContextProp
}
