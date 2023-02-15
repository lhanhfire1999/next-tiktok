import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Button, Modal } from '~/components'
import { useUploadForm } from '../../contexts/UploadFormContext'
import { useUploadModal } from '../../contexts/UploadModalContext'

import styles from './CompoundUploadModal.module.scss'

const cx = classNames.bind(styles)

interface UploadModalProp {
  children: React.ReactNode
}

const UploadModal: React.FC<UploadModalProp> = ({ children }) => {
  return <Modal>{children}</Modal>
}

const ChangeVideoModalContent = () => {
  const t = useTranslations('UploadPage')
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
          {t('replaceTitle')}
        </Modal.Title>
        <p className={cx('paragraph')}>{t('replaceContent')}</p>
      </header>
      <span className={cx('btn', 'primary')} onClick={handleChangeVideo}>
        {t('replace')}
      </span>
      <span className={cx('btn')} onClick={handleCloseModal}>
        {t('continuesEditing')}
      </span>
    </Modal.Content>
  )
}

const PostModalContent = () => {
  const t = useTranslations('UploadPage')
  const { handleCloseModal } = useUploadModal()
  const { reset } = useUploadForm()

  const handleResetForm = () => {
    reset()
    handleCloseModal()
  }

  return (
    <Modal.Content className={cx('post-modal-content')} onClickOutside={handleCloseModal}>
      <Modal.Title as="h3" className={cx('title')}>
        {t('uploadModalTitle')}
      </Modal.Title>

      <Button className={cx('btn') + ' mt-6'} primary onClick={handleResetForm}>
        {t('uploadModalUpload')}
      </Button>
      <Button className={cx('btn')} outlineGray href="/">
        {t('uploadModalReturn')}
      </Button>
    </Modal.Content>
  )
}

const CompoundUploadModal = Object.assign(UploadModal, { ChangeVideoModalContent, PostModalContent })

export default CompoundUploadModal
