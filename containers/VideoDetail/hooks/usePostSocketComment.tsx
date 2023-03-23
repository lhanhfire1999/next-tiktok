import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useSocket } from '~/contexts'
import { Comment } from '~/services/comment'

interface Prop {
  callback?: () => void
  commentContent: string
}

const usePostSocketComment = ({ commentContent, callback }: Prop) => {
  const { data: session } = useSession()
  const { socket } = useSocket()
  const searchParams = useSearchParams()

  const handlePost = () => {
    const videoId = searchParams.get('id')
    const userImage = session?.user?.image
    const username = session?.user?.name

    if (videoId && userImage && username) {
      const newComment: Comment = {
        videoId,
        content: commentContent.trim(),
        userImage,
        username,
      }

      socket.emit('createComment', newComment)
    }
    if (callback) {
      callback()
    }
  }

  return { handlePost }
}

export default usePostSocketComment
