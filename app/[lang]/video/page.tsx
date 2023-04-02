import { Suspense } from 'react'
import { Loading } from '~/components'
import { VideoDetail } from '~/containers'

const Video = () => {
  return (
    <Suspense fallback={<Loading isMaxHeightWindow />}>
      <VideoDetail />
    </Suspense>
  )
}

export default Video
