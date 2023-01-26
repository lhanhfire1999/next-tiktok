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