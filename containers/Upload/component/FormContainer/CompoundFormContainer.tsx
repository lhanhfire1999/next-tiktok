'use client'
import classNames from 'classnames/bind'
import React, { useId, useState } from 'react'
import styles from './FormContainer.module.scss'

import { Button, DownIcon, EditIcon, HashtagIcon, List, TagPersonIcon, ToggleButton } from '~/components'
import { UploadPageFormContainer } from '~/constants'

interface FormContainerProp {
  children: React.ReactNode
}

const cx = classNames.bind(styles)

const FormContainer: React.FC<FormContainerProp> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>
}

const EditorEntrance = () => {
  return (
    <div className={cx('editor-entrance')}>
      <i className={cx('wrapper-edit-icon')}>
        <EditIcon width="2.2rem" height="1.8rem" />
      </i>
      <div className={cx('content')}>
        <h4>{UploadPageFormContainer.editorEntrance.title}</h4>
        <p>{UploadPageFormContainer.editorEntrance.content}</p>
      </div>
      <div className={cx('wrapper-btn')}>
        <Button onClick={() => null} primary className={cx('edit-btn')}>
          Edit
        </Button>
      </div>
    </div>
  )
}

const Caption = () => {
  return (
    <div className={cx('wrapper-caption') + ' mt-6'}>
      <div className={cx('wrapper-title')}>
        <h4>{UploadPageFormContainer.caption.title}</h4>
        <span>0 / 150</span>
      </div>

      <div className={cx('wrapper-input') + ' mt-1'}>
        <input type="text" />
        <div className={cx('wrapper-icon')}>
          <TagPersonIcon className={cx('icon')} width="2rem" height="2rem" />
          <HashtagIcon className={cx('icon')} width="2rem" height="1.7rem" />
        </div>
      </div>
    </div>
  )
}

const SettingVideo = () => {
  return (
    <div className={cx('wrapper-setting-video') + ' mt-6'}>
      <h4>{UploadPageFormContainer.whoCanWatch.title}</h4>

      <div className={cx('wrapper-select') + ' mt-1'}>
        <span className={cx('title')}>Public</span>
        <DownIcon />
        <List className={cx('option-list')}>
          {UploadPageFormContainer.whoCanWatch.data.map((optionName, idx) => (
            <List.Item key={idx} className={cx('option-item')}>
              {optionName}
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  )
}

const AllowUser = () => {
  const id = useId()
  return (
    <div className={cx('wrapper-allow-user') + ' mt-6'}>
      <h4>{UploadPageFormContainer.allowUser.title}</h4>

      <List className={cx('option-list') + ' mt-1'}>
        {UploadPageFormContainer.allowUser.data.map((optionName, idx) => (
          <List.Item key={idx} className={cx('option-item')}>
            <input type="checkbox" id={id + `-${idx}`} onChange={() => {}} />
            <label htmlFor={id + `-${idx}`}>{optionName}</label>
          </List.Item>
        ))}
      </List>
    </div>
  )
}

const Copyright = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChangeChecked = () => {
    setIsChecked((prevState) => !prevState)
  }

  return (
    <div className={cx('wrapper-copyright') + ' mt-6'}>
      <div className={cx('wrapper-header')}>
        <h4>{UploadPageFormContainer.copyright.title}</h4>
        <ToggleButton onChange={handleChangeChecked} />
      </div>

      <p className={cx('paragraph')}>
        {isChecked ? UploadPageFormContainer.copyright.checkedText : UploadPageFormContainer.copyright.notCheckedText}
        <span className={cx('learn-more')}> Learn more</span>
      </p>
    </div>
  )
}

const ActionButtons = () => {
  return (
    <div className={cx('wrapper-action-buttons') + ' mt-6'}>
      <Button outlineGray large className={cx('btn')}>
        Discard
      </Button>
      <Button primary large className={cx('btn')}>
        Post
      </Button>
    </div>
  )
}

const CompoundFormContainer = Object.assign(FormContainer, {
  EditorEntrance,
  Caption,
  SettingVideo,
  AllowUser,
  Copyright,
  ActionButtons,
})

export default CompoundFormContainer
