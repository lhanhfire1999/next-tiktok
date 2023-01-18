'use client'
import classNames from 'classnames/bind'
import React, { useId, useRef, useState } from 'react'
import styles from './FormContainer.module.scss'

import { useWatch } from 'react-hook-form'
import { Button, DownIcon, EditIcon, HashtagIcon, List, TagPersonIcon, ToggleButton } from '~/components'
import { UPLOAD_PAGE_FORM_CONTAINER } from '~/constants'
import { useUploadForm } from '../../contexts/UploadFormContext'

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
        <h4>{UPLOAD_PAGE_FORM_CONTAINER.editorEntrance.title}</h4>
        <p>{UPLOAD_PAGE_FORM_CONTAINER.editorEntrance.content}</p>
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
  const { control, register, setValue } = useUploadForm()
  const { ref, ...rest } = register('caption')
  const captionValue = useWatch({ control, name: 'caption' })

  const captionRef = useRef<HTMLInputElement | null>(null)

  const handleAddHashtag = () => {
    const cursorPosition = captionRef.current!.selectionStart || captionValue.length

    setValue(
      'caption',
      captionValue.substring(0, cursorPosition) + '#' + captionValue.substring(cursorPosition, captionValue.length)
    )
    captionRef.current!.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
    captionRef.current!.focus()
  }

  return (
    <div className={cx('wrapper-caption') + ' mt-6'}>
      <div className={cx('wrapper-title')}>
        <h4>{UPLOAD_PAGE_FORM_CONTAINER.caption.title}</h4>
        <span>{captionValue.length} / 150</span>
      </div>

      <div className={cx('wrapper-input') + ' mt-1'}>
        <input
          ref={(e) => {
            ref(e)
            captionRef.current = e
          }}
          {...rest}
          type="text"
          autoFocus
        />
        <div className={cx('wrapper-icon')}>
          <TagPersonIcon className={cx('icon')} width="2rem" height="2rem" />

          <i onClick={handleAddHashtag}>
            <HashtagIcon className={cx('icon')} width="2rem" height="1.7rem" />
          </i>
        </div>
      </div>
    </div>
  )
}

const SettingVideo = () => {
  return (
    <div className={cx('wrapper-setting-video') + ' mt-6'}>
      <h4>{UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.title}</h4>

      <div className={cx('wrapper-select') + ' mt-1'}>
        <span className={cx('title')}>Public</span>
        <DownIcon />
        <List className={cx('option-list')}>
          {UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.data.map((optionName, idx) => (
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

  const { register } = useUploadForm()
  const { ...rest } = register('allowUserMode')

  return (
    <div className={cx('wrapper-allow-user') + ' mt-6'}>
      <h4>{UPLOAD_PAGE_FORM_CONTAINER.allowUser.title}</h4>

      <List className={cx('option-list') + ' mt-1'}>
        {UPLOAD_PAGE_FORM_CONTAINER.allowUser.data.map((optionName, idx) => (
          <List.Item key={idx} className={cx('option-item')}>
            <input {...rest} type="checkbox" id={id + `-${idx}`} value={optionName} />
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
        <h4>{UPLOAD_PAGE_FORM_CONTAINER.copyright.title}</h4>
        <ToggleButton onChange={handleChangeChecked} />
      </div>

      <p className={cx('paragraph')}>
        {isChecked
          ? UPLOAD_PAGE_FORM_CONTAINER.copyright.checkedText
          : UPLOAD_PAGE_FORM_CONTAINER.copyright.notCheckedText}
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
