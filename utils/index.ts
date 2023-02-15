export const getVideoDuration = (file: File) =>
  new Promise<number>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const media = new Audio(reader?.result as string | undefined)
      media.onloadedmetadata = () => resolve(media.duration)
    }
    reader.readAsDataURL(file)
    reader.onerror = (error) => reject(error)
  })

export const paginate = <T>(data: T[], page: number, offset: number): T[] => {
  return data.slice((page - 1) * offset, page * offset)
}

export const removeTrailingSlash = (str: string) => {
  return str.replace(/\/+$/, '')
}

export const getLocalizedHref = (originalHref: string, locale: string) => {
  return removeTrailingSlash(originalHref.replace(/^\//, '/' + locale + '/'))
}

export const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
