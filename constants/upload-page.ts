import { CloudIcon } from '~/components'

export const UPLOAD_PAGE_FORM_CONTAINER = {
  caption: {
    title: 'caption',
  },
  editorEntrance: {
    title: 'divideVideo',
    content: 'divideVideoContent',
  },
  whoCanWatch: {
    title: 'whoCan',
    data: [
      {
        key: '0',
        value: 'public',
      },
      {
        key: '1',
        value: 'friend',
      },
      {
        key: '2',
        value: 'private',
      },
    ] as const,
  },

  allowUser: {
    title: 'allowUser',
    data: [
      {
        key: '0',
        value: 'comment',
      },
      {
        key: '1',
        value: 'duet',
      },
      {
        key: '2',
        value: 'stitch',
      },
    ] as const,

    overVideoDuration: 'overVideoDuration',
  },
  copyright: {
    title: 'copyright',
    notCheckedText: `copyrightNote`,
    checkedText: `copyRightText`,
  },
}

export const UploadPageUploadVideoContainer = {
  Icon: CloudIcon,
  title: 'selectVideo',
  content: 'selectVideoContent',
  subContentList: ['selectVideoType', 'selectVideoSize', 'selectVideoTime', 'selectVideoCapacity'],
}
