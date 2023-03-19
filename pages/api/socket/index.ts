import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server as IOServer } from 'socket.io'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '~/services/comment'

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

interface User {
  userId: string
  channelId: string
}

const socketHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
      res.socket.server,
      { path: '/api/socket' }
    )
    res.socket.server.io = io

    let allUsers: User[] = []

    io.on('connection', (socket) => {
      // Join room when enter video detail page
      socket.on('joinChannel', (id: string) => {
        const user = { userId: socket.id, channelId: id }

        // Check user has existed in list
        const userIndex = allUsers.findIndex((user) => user.userId === socket.id)

        if (userIndex > 0) {
          socket.leave(allUsers[userIndex].channelId)
          allUsers[userIndex].channelId = user.channelId
        } else {
          allUsers.push(user)
        }

        socket.join(user.channelId)

        // console.log('joinChannel', allUsers)
        // console.log('joinChannel', socket.rooms)
      })

      // When close browser
      socket.on('disconnect', () => {
        allUsers = [...allUsers].filter((user) => user.userId !== socket.id)
        // console.log(socket.id + ' disconnected.')
      })
    })
  }
  res.end()
}

export default socketHandler
