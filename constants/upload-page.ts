import { CloudIcon } from '~/components'

export type AllowUserMode = typeof UPLOAD_PAGE_FORM_CONTAINER.allowUser.data[number]
export type AllowUserModeList = typeof UPLOAD_PAGE_FORM_CONTAINER.allowUser.data[number][]
export type WatchMode = typeof UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.data[number]

export const UPLOAD_PAGE_FORM_CONTAINER = {
  caption: {
    title: 'Caption',
  },
  editorEntrance: {
    title: 'Divide videos and edit',
    content:
      'You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos',
  },
  whoCanWatch: {
    title: 'Who can watch this video',
    data: ['Public', 'Friends', 'Private'] as const,
  },

  allowUser: {
    title: 'Allow users to',
    data: ['Comment', 'Duet', 'Stitch'] as const,
    overVideoDuration: 'Duet and Stitch not available for videos over 60s',
  },
  copyright: {
    title: 'Run a copyright check',
    notCheckedText: `We'll check your video for potential copyright infringements on used sounds. If infringements are found, you can edit the video before posting.`,
    checkedText: `Note: Results of copyright checks aren't final. For instance, future changes of the copyright holder's authorization to the sound may impact your video may impact your video.`,
  },
}

export const UploadPageUploadVideoContainer = {
  Icon: CloudIcon,
  title: 'Select video to upload',
  content: 'Or drag and drop a file',
  subContentList: ['MP4 or WebM', '720x1280 resolution or higher', 'Up to 30 minutes', 'Less than 2 GB'],
}
