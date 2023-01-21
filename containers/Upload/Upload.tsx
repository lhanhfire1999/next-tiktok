'use client'
import classNames from 'classnames/bind'
import { Modal } from '~/components'
import { UploadChangeVideoModal, useUploadChangeVideoModal } from '~/containers/Upload/contexts/UploadChangeVideoModal'
import { FormContainer, UploadVideoContainer } from './component'
import { UploadFormProvider, useUploadForm } from './contexts/UploadFormContext'
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

const ChangeVideoModal = () => {
  const { isOpenModal, handleToggleModal } = useUploadChangeVideoModal()
  const { setValue } = useUploadForm()

  const handleNotChangeVideo = () => {
    handleToggleModal(false)
  }

  const handleChangeVideo = () => {
    setValue('uploadVideo', null)
    handleToggleModal(false)
  }

  if (isOpenModal) {
    return (
      <Modal>
        <Modal.Content className={cx('wrapper-modal')} onClickOutside={handleNotChangeVideo}>
          <header>
            <Modal.Title as="h3" className={cx('title')}>
              Replace this video
            </Modal.Title>
            <p className={cx('paragraph')}>Caption and video settings will still be saved</p>
          </header>
          <span className={cx('btn', 'primary')} onClick={handleChangeVideo}>
            Replace
          </span>
          <span className={cx('btn')} onClick={handleNotChangeVideo}>
            Continue editing
          </span>
        </Modal.Content>
      </Modal>
    )
  }

  return null
}

const CompoundUpload = Object.assign(Upload, { Content, ChangeVideoModal })

export default CompoundUpload
