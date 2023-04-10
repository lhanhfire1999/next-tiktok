import { Suspense } from 'react'
import { Loading } from '~/components'
import { VideoDetail } from '~/containers'
import { getDiscoverById } from '~/services/discover'

type Props = {
  searchParams?: { id?: string }
}

export const dynamic = 'force-dynamic'

export const generateMetadata = async (props: Props) => {
  const videoId = props?.searchParams?.id
  if (!videoId) return {}

  const video = await getDiscoverById({ id: videoId })
  if (!video) return {}

  return {
    openGraph: {
      title: `${video.username} on TopTop`,
      description: 'Video | TopTop',
      images: [
        {
          url: video.avatar,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${video.username} on TopTop`,
      description: 'Video | TopTop',
      siteId: video.username,
      images: [video.avatar],
    },
  }
}

const Video = () => {
  return (
    <Suspense fallback={<Loading isMaxHeightWindow />}>
      <VideoDetail />
    </Suspense>
  )
}

export default Video
