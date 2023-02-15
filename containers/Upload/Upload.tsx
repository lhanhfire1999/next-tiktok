'use client'
import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('UploadPage')

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>{t('uploadVideo')}</h2>
      <p className={cx('paragraph')}>{t('uploadVideoContent')}</p>

      <div className={cx('wrapper-content')}>
        <UploadVideoContainer />
        <FormContainer />
      </div>
    </div>
  )
}

const CompoundUpload = Object.assign(Upload, { Content, UploadModal })

export default CompoundUpload
