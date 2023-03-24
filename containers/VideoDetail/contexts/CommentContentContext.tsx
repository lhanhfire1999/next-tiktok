import React, { useContext, useRef } from 'react'

interface ProviderProp {
  children: React.ReactNode
}

interface ContextProp {
  commentContentRef: React.RefObject<HTMLParagraphElement>
  handleUpdateComment: (value: string) => void
}

const Context = React.createContext<ContextProp | null>(null)

export const CommentContentProvider: React.FC<ProviderProp> = ({ children }) => {
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

export const useCommentContent = () => {
  return useContext(Context) as ContextProp
}
