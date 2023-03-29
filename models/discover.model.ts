import { models, Schema, model } from 'mongoose'
import { Discover } from '~/services/discover'

const DiscoverSchema = new Schema<Discover>({
  id: String,
  name: String,
  username: String,
  avatar: String,
  is_followed: Boolean,
  is_liked: Boolean,
  video: String,
  caption: String,

  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
  timestamp: String,
  button_visible: Boolean,
  music_name: String,
  has_tick: Boolean,
})

const DiscoverModel = models.discovers || model<Discover>('discovers', DiscoverSchema)

export default DiscoverModel
