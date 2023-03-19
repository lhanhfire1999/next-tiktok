import { Pagination } from '~/types/common'

// Socket interface
// Emit from socket server
export interface ServerToClientEvents {}

// On from socket server
export interface ClientToServerEvents {
  joinChannel: (id: string) => void
}

export interface InterServerEvents {}

export interface SocketData {
  id: string
}

// Service interface
export interface Comment {
  _id: string
  videoId: string
  content: string
  username: string
  userImage: string
  createdAt: Date
  updatedAt: Date
  reply?: Comment[]
}

export interface CommentRequestQuery extends Pagination {
  videoId: string
}
