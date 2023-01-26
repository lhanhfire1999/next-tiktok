'use client'
import classNames from 'classnames/bind'
import { UploadChangeVideoModal } from '~/containers/Upload/contexts/UploadChangeVideoModal'
import { FormContainer, ModalChangeVideo, UploadVideoContainer } from './component'
import { UploadFormProvider } from './contexts/UploadFormContext'
import styles from './Upload.module.scss'

const cx = classNames.bind(styles)

interface UploadProp {
  children: React.ReactNode
}

const Upload: React.FC<UploadProp> = ({ children }) => {
  return (
    <UploadFormProvider>
      <UploadChangeVideoModal>{children}</UploadChangeVideoModal>
    </UploadFormProvider>
  )
}

const Content = () => {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Upload video</h2>
      <p className={cx('paragraph')}>Post a video to your account</p>

      <div className={cx('wrapper-content')}>
        <UploadVideoContainer />
        <FormContainer />
      </div>
    </div>
  )
}

const CompoundUpload = Object.assign(Upload, { Content, ModalChangeVideo })

export default CompoundUpload
