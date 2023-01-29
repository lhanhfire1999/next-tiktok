import classNames from 'classnames/bind'
import React from 'react'
import { Button, Modal } from '~/components'
import styles from './CompoundUploadModal.module.scss'

import { useUploadForm } from '../../contexts/UploadFormContext'
import { useUploadModal } from '../../contexts/UploadModalContext'

const cx = classNames.bind(styles)

interface UploadModalProp {
  children: React.ReactNode
}

const UploadModal: React.FC<UploadModalProp> = ({ children }) => {
  return <Modal>{children}</Modal>
}

const ChangeVideoModalContent = () => {
  const { handleCloseModal } = useUploadModal()
  const { setValue } = useUploadForm()

  const handleChangeVideo = () => {
    setValue('uploadVideo', null, { shouldValidate: true })
    handleCloseModal()
  }

  return (
    <Modal.Content className={cx('change-video-modal-content')} onClickOutside={handleCloseModal}>
      <header>
        <Modal.Title as="h3" className={cx('title')}>
          Replace this video
        </Modal.Title>
        <p className={cx('paragraph')}>Caption and video settings will still be saved</p>
      </header>
      <span className={cx('btn', 'primary')} onClick={handleChangeVideo}>
        Replace
      </span>
      <span className={cx('btn')} onClick={handleCloseModal}>
        Continue editing
      </span>
    </Modal.Content>
  )
}

const PostModalContent = () => {
  const { handleCloseModal } = useUploadModal()
  const { reset } = useUploadForm()

  const handleResetForm = () => {
    reset()
    handleCloseModal()
  }

  return (
    <Modal.Content className={cx('post-modal-content')} onClickOutside={handleCloseModal}>
      <Modal.Title as="h3" className={cx('title')}>
        Your videos are being uploaded to TikTok!
      </Modal.Title>

      <Button className={cx('btn') + ' mt-6'} primary onClick={handleResetForm}>
        Upload another video
      </Button>
      <Button className={cx('btn')} outlineGray href="/">
        Return home page
      </Button>
    </Modal.Content>
  )
}

const CompoundUploadModal = Object.assign(UploadModal, { ChangeVideoModalContent, PostModalContent })

export default CompoundUploadModal
