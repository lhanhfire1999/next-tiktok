'use client'
import { notFound, useSearchParams } from 'next/navigation'
import CompoundVideoDetail from './CompoundVideoDetail'

const VideoDetail = () => {
  const searchParams = useSearchParams()
  const videoId = searchParams.get('id')

  if (!videoId) {
    notFound()
  }

  return (
    <CompoundVideoDetail videoId={videoId}>
      <CompoundVideoDetail.Content />
    </CompoundVideoDetail>
  )
}

export default VideoDetail
