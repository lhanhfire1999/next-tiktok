import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import { Comment } from '~/services/comment'

const CommentSchema = new Schema<Comment>(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    _id: false,
    collection: 'comments',
  }
)

const CommentModel = models.comments || model<Comment>('comments', CommentSchema)

export default CommentModel
