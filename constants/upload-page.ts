import { CloudIcon } from '~/components'

export const UploadPageFormContainer = {
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
    data: ['Public', 'Friends', 'Private'],
  },

  allowUser: {
    title: 'Allow users to',
    data: ['Comment', 'Duet', 'Stitch'],
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
