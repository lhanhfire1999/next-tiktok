import Image from 'next/image'
import { forwardRef, useState } from 'react'
import { DEFAULT_IMAGE_FALLBACK } from '~/constants'

type SafeNumber = number | `${number}`

interface ImageWithFallbackProp {
  src: string
  fallbackSrc?: string
  alt: string
  width?: SafeNumber
  height?: SafeNumber
  fill?: boolean
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive'
  className?: string
}

// eslint-disable-next-line react/display-name
const ImageWithFallback = forwardRef<HTMLImageElement, ImageWithFallbackProp>((props, ref) => {
  const { src, fallbackSrc = DEFAULT_IMAGE_FALLBACK, alt, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      {...rest}
      ref={ref}
      alt={alt}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
})

export default ImageWithFallback
