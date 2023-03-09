import { VideoDetail } from '~/containers'

const Video = async ({ searchParams: { id } }: { searchParams: { id: string } }) => {
  return <VideoDetail videoId={id} />
}

export default Video
