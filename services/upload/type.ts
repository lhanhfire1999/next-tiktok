import { UPLOAD_PAGE_FORM_CONTAINER } from '~/constants'

export type AllowUserMode = typeof UPLOAD_PAGE_FORM_CONTAINER.allowUser.data[number]['key']
export type WatchMode = typeof UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.data[number]['key']

export interface UploadBodyParams {
  caption: string
  allowUserMode: AllowUserMode[]
  uploadVideo: FormData
  watchMode: WatchMode
}
