import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useSocket } from '~/contexts'
import { Comment } from '~/services/comment'
import { useCommentContent } from '../contexts/CommentContentContext'

interface Prop {
  callback?: () => void
}

const usePostSocketComment = ({ callback }: Prop) => {
  const { data: session } = useSession()
  const { socket } = useSocket()
  const searchParams = useSearchParams()
  const { commentContentRef } = useCommentContent()

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

      socket.emit('createComment', newComment)

      if (callback) {
        callback()
      }
    }
  }

  return { handlePost }
}

export default usePostSocketComment
