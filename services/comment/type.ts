import { Pagination } from '~/types/common'

// Socket interface
// Emit from socket server
export interface ServerToClientEvents {
  sendCommentToClient: (comment: Comment) => void
}

// On from socket server
export interface ClientToServerEvents {
  joinChannel: (id: string) => void
  createComment: (newComment: Comment, isReply?: boolean) => void
}

export interface InterServerEvents {}

export interface SocketData {
  id: string
}

// Service interface

export interface ReplyComment {
  isReply?: boolean
}
export interface Comment {
  _id?: string
  videoId: string
  content: string
  username: string
  userImage: string
  createdAt?: Date
  reply?: Comment[]
}

export interface CommentRequestQuery extends Pagination {
  videoId: string
}
