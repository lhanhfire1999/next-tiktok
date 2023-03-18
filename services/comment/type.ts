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
  content: String
  discover_id: String
  user_id: String
  username: String
  created_at: Date
  updated_at: Date
  reply?: Comment[]
}

export interface CommentRequestQuery extends Pagination {
  id: string
}
