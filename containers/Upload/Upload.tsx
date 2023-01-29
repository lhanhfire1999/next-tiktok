'use client'
import classNames from 'classnames/bind'
import { UploadModalProvider } from '~/containers/Upload/contexts/UploadModalContext'
import { FormContainer, UploadModal, UploadVideoContainer } from './component'
import { UploadFormProvider } from './contexts'
import styles from './Upload.module.scss'

const cx = classNames.bind(styles)

interface UploadProp {
  children: React.ReactNode
}

const Upload: React.FC<UploadProp> = ({ children }) => {
  return (
    <UploadFormProvider>
      <UploadModalProvider>{children}</UploadModalProvider>
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

const CompoundUpload = Object.assign(Upload, { Content, UploadModal })

export default CompoundUpload
