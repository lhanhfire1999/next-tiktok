import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server as IOServer } from 'socket.io'

import dbConnect from '~/lib/dbConnection'
import CommentModel from '~/models/comment.model'
import DiscoverModel from '~/models/discover.model'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '~/services/comment'
import { Discover } from '~/services/discover'

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

      // Create comment
      socket.on('createComment', async (comment, parentCommentId) => {
        const { videoId, content, username, userImage, reply = [] } = comment

        await dbConnect()

        if (parentCommentId) {
          // This is create reply comment base on parentId
          const comment = await CommentModel.findById(parentCommentId)

          if (comment) {
            comment.reply?.unshift({ videoId, content, username, userImage })
            await comment.save()
            io.to(videoId).emit('sendReplyCommentToClient', comment)
          }
        } else {
          // This is create comment
          const newCommentModal = new CommentModel({
            videoId,
            content,
            username,
            userImage,
            reply,
          })
          await DiscoverModel.findOneAndUpdate<Discover>({ id: videoId }, { $inc: { comments: 1 } }, { new: true })
          await newCommentModal.save()

          comment._id = newCommentModal._id
          io.to(videoId).emit('sendCommentToClient', comment)
        }
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
