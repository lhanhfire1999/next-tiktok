'use client'
import React from 'react'
import { Modal } from '~/components'
import styles from './ModalChangeVideo.module.scss'
import classNames from 'classnames/bind'
import { useUploadChangeVideoModal } from '../../contexts/UploadChangeVideoModal'
import { useUploadForm } from '../../contexts/UploadFormContext'

const cx = classNames.bind(styles)

const ModalChangeVideo = () => {
  const { isOpenModal, handleToggleModal } = useUploadChangeVideoModal()
  const { setValue } = useUploadForm()

  const handleNotChangeVideo = () => {
    handleToggleModal(false)
  }

  const handleChangeVideo = () => {
    setValue('uploadVideo', null, { shouldValidate: true })
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

export default ModalChangeVideo
