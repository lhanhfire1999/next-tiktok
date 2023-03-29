import React, { useContext, useState } from 'react'

interface ContextProp {
  replyComment: ReplyCommentProp
  handleChangeReplyComment: (value: ReplyCommentProp) => void
}

interface ProviderProp {
  children: React.ReactNode
}

interface ReplyCommentProp {
  parentCommentId: string | null
  username: string | null
}

const Context = React.createContext<null | ContextProp>(null)

export const CommentReplyProvider: React.FC<ProviderProp> = ({ children }) => {
  const [replyComment, setReplyComment] = useState<ReplyCommentProp>({
    parentCommentId: null,
    username: null,
  })

  const handleChangeReplyComment = (value: ReplyCommentProp) => {
    setReplyComment({ ...value })
  }
  return <Context.Provider value={{ replyComment, handleChangeReplyComment }}>{children}</Context.Provider>
}

export const useCommentReply = () => {
  return useContext(Context) as ContextProp
}
