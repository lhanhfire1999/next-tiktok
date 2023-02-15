'use client'
import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef } from 'react'
import { useWatch } from 'react-hook-form'

import { Button, List } from '~/components'
import { UploadPageUploadVideoContainer } from '~/constants'
import { useUploadModal } from '../../contexts'
import { useUploadForm } from '../../contexts/UploadFormContext'

import styles from './UploadVideoContainer.module.scss'

const cx = classNames.bind(styles)

const UploadVideoContainer = () => {
  const t = useTranslations('UploadPage')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { control, setValue, getValues, register, resetField } = useUploadForm()
  const { ref, ...rest } = register('uploadVideo', { required: true })
  const uploadVideo = useWatch({ control, name: 'uploadVideo' })

  const { handleShowModal } = useUploadModal()

  useEffect(() => {
    // Caption field
    if (!getValues('caption') && uploadVideo) {
      setValue('caption', uploadVideo[0].name, { shouldValidate: true })
      return
    }

    if (!uploadVideo) {
      resetField('caption')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadVideo])

  const handleClickUpload = () => {
    inputRef.current!.click()
  }

  const handleClickChangeVideo = () => {
    handleShowModal({ strategy: 'change-video' })
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const { files } = e.dataTransfer
    if (files[0].type.startsWith('video/')) {
      setValue('uploadVideo', e.dataTransfer.files, { shouldValidate: true })
    }
  }

  if (uploadVideo) {
    return (
      <div className={cx('wrapper-change-video')}>
        <div className={cx('file')}>
          <span className={cx('name')}>{uploadVideo![0].name}</span>
        </div>
        <span className={cx('button')} onClick={handleClickChangeVideo}>
          {t('changeVideo')}
        </span>
      </div>
    )
  }

  return (
    <div className={cx('wrapper') + ' mt-6'} onClick={handleClickUpload} onDragOver={handleDrag} onDrop={handleDrop}>
      <input
        type="file"
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
        {...rest}
        accept="video/*"
        hidden
      />

      <UploadPageUploadVideoContainer.Icon className={cx('cloud-icon')} />
      <h4 className={'mt-6'}>{t(UploadPageUploadVideoContainer.title as any)}</h4>
      <span className={'mt-1'}>{t(UploadPageUploadVideoContainer.content as any)}</span>

      <List className={cx('list') + ' mt-6'}>
        {UploadPageUploadVideoContainer.subContentList.map((content, idx) => (
          <List.Item key={idx} className={cx('sub-content')}>
            {t(content as any)}
          </List.Item>
        ))}
      </List>

      <Button primary className={cx('button')}>
        {t('selectFile')}
      </Button>
    </div>
  )
}

export default UploadVideoContainer
