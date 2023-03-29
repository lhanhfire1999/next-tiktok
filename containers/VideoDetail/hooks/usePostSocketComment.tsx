import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { useSocket } from '~/contexts'
import { Comment } from '~/services/comment'
import { useCommentContentBar } from '../contexts/CommentContentBarContext'
import { useCommentReply } from '../contexts/CommentReplyContext'

interface Prop {
  callback?: () => void
}

const usePostSocketComment = ({ callback }: Prop) => {
  const { data: session } = useSession()
  const { socket } = useSocket()
  const searchParams = useSearchParams()
  const { commentContentRef } = useCommentContentBar()
  const { replyComment, handleChangeReplyComment } = useCommentReply()

  const isReply = useMemo(() => {
    if (replyComment.parentCommentId && replyComment.username) return true
    return false
  }, [replyComment])

  const handlePost = () => {
    const videoId = searchParams.get('id')
    const userImage = session?.user?.image
    const username = session?.user?.name

    if (videoId && userImage && username) {
      const newComment: Comment = {
        videoId,
        content: commentContentRef.current!.innerHTML.trim(),
        userImage,
        username,
      }

      socket.emit('createComment', newComment, isReply ? replyComment.parentCommentId! : null)

      if (isReply) handleChangeReplyComment({ parentCommentId: null, username: null })
      if (callback) callback()
    }
  }

  return { handlePost }
}

export default usePostSocketComment
