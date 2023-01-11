'use client'
import classNames from 'classnames/bind'
import { Button, List } from '~/components'
import { UploadPageUploadVideoContainer } from '~/constants'

import styles from './UploadVideoContainer.module.scss'

const cx = classNames.bind(styles)

const UploadVideoContainer = () => {
  return (
    <div className={cx('wrapper') + ' mt-6'}>
      <input type="file" accept="video/*" />
      <div className={cx('upload-card')}>
        <UploadPageUploadVideoContainer.Icon className={cx('cloud-icon')} />
        <h4 className={'mt-6'}>{UploadPageUploadVideoContainer.title}</h4>
        <span className={'mt-1'}>{UploadPageUploadVideoContainer.content}</span>

        <List className={cx('list') + ' mt-6'}>
          {UploadPageUploadVideoContainer.subContentList.map((content, idx) => (
            <List.Item key={idx} className={cx('sub-content')}>
              {content}
            </List.Item>
          ))}
        </List>

        <Button primary className={cx('button')}>
          Select file
        </Button>
      </div>
    </div>
  )
}

export default UploadVideoContainer
