import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { Comment } from '~/services/comment'

const ReplyCommentSchema = new Schema<Comment>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    content: String,
    videoId: String,
    userImage: String,
    username: String,
  },
  {
    versionKey: false,
    _id: false,
    timestamps: { createdAt: true },
  }
)

const CommentSchema = new Schema<Comment>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    content: String,
    videoId: String,
    userImage: String,
    username: String,
    reply: [ReplyCommentSchema],
  },
  {
    versionKey: false,
    _id: false,
    timestamps: { createdAt: true },
    collection: 'comments',
  }
)

const CommentModel = models.comments || model<Comment>('comments', CommentSchema)

export default CommentModel
