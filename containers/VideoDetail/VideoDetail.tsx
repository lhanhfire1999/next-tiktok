'use client'
import { notFound } from 'next/navigation'
import React from 'react'
import CompoundVideoDetail from './CompoundVideoDetail'

interface ContainerProp {
  videoId: string
}

const VideoDetail: React.FC<ContainerProp> = ({ videoId }) => {
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
