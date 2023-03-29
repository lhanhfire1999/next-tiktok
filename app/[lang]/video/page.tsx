import { VideoDetail } from '~/containers'

interface Prop {
  searchParams?: {
    id?: string
  }
}

const Video = async (props: Prop) => {
  return <VideoDetail videoId={props?.searchParams?.id} />
}

export default Video
