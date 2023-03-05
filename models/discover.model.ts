import { models, Schema, model } from 'mongoose'
import { Discover } from '~/services/discover'

const DiscoverSchema = new Schema<Discover>()

const DiscoverModel = models.discovers || model<Discover>('discovers', DiscoverSchema)

export default DiscoverModel
