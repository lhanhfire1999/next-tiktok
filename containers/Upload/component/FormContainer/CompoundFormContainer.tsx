'use client'
import React, { useId, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './FormContainer.module.scss'

import { Button, EditIcon, HashtagIcon, List, TagPersonIcon, ToggleButton } from '~/components'

interface FormContainerProp {
  children: React.ReactNode
}

const UPLOAD_STATIC_DATA = {
  caption: {
    title: 'Caption',
  },
  editorEntrance: {
    title: 'Divide videos and edit',
    content:
      'You can quickly divide videos into multiple parts, remove redundant parts and turn landscape videos into portrait videos',
  },
  whoCanWatch: {
    title: 'Who can watch this video',
    data: ['Public', 'Friends', 'Private'],
  },

  allowUser: {
    title: 'Allow users to',
    data: ['Comment', 'Duet', 'Stitch'],
  },
  copyright: {
    title: 'Run a copyright check',
    notCheckedText: `We'll check your video for potential copyright infringements on used sounds. If infringements are found, you can edit the video before posting.`,
    checkedText: `Note: Results of copyright checks aren't final. For instance, future changes of the copyright holder's authorization to the sound may impact your video may impact your video.`,
  },
}

const cx = classNames.bind(styles)

const FormContainer: React.FC<FormContainerProp> = ({ children }) => {
  return <div className={cx('form')}>{children}</div>
}

const EditorEntrance = () => {
  return (
    <div className={cx('editor-entrance')}>
      <EditIcon />
      <div className="content">
        <h4>{UPLOAD_STATIC_DATA.editorEntrance.title}</h4>
        <p>{UPLOAD_STATIC_DATA.editorEntrance.content}</p>
      </div>
      <Button onClick={() => null} primary className={cx('edit-btn')}>
        Edit
      </Button>
    </div>
  )
}

const Caption = () => {
  return (
    <div className={cx('wrapper-caption')}>
      <div className={cx('wrapper-title')}>
        <h4>{UPLOAD_STATIC_DATA.caption.title}</h4>
        <p>0 / 150</p>
      </div>

      <div className={cx('wrapper-input')}>
        <input type="text" />
        <TagPersonIcon width="2rem" height="2rem" />
        <HashtagIcon width="2rem" height="2rem" />
      </div>
    </div>
  )
}

const SettingVideo = () => {
  const id = useId()

  return (
    <div className={cx('wrapper-setting-video')}>
      <h4>{UPLOAD_STATIC_DATA.whoCanWatch.title}</h4>

      <div className={cx('selected')}>
        <span className={cx('title')}>Public</span>
        <List className={cx('option-list')}>
          {UPLOAD_STATIC_DATA.whoCanWatch.data.map((optionName, idx) => (
            <List.Item key={idx}>{optionName}</List.Item>
          ))}
        </List>
      </div>

      <h4>{UPLOAD_STATIC_DATA.allowUser.title}</h4>
      <List>
        {UPLOAD_STATIC_DATA.allowUser.data.map((optionName, idx) => (
          <List.Item key={idx}>
            <input type="checkbox" id={id + `-${idx}`} onChange={() => {}} checked={false} />
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
    <div className={cx('wrapper-header')}>
      <h4>{UPLOAD_STATIC_DATA.copyright.title}</h4>
      <ToggleButton onChange={handleChangeChecked} />

      <p>
        {isChecked ? UPLOAD_STATIC_DATA.copyright.checkedText : UPLOAD_STATIC_DATA.copyright.notCheckedText}
        <span>Learn more</span>
      </p>
    </div>
  )
}

const ActionButtons = () => {
  return (
    <div className={cx('wrapper-action-buttons')}>
      <Button outlineGray>Discard</Button>
      <Button primary>Post</Button>
    </div>
  )
}

const CompoundFormContainer = Object.assign(FormContainer, {
  EditorEntrance,
  Caption,
  SettingVideo,
  Copyright,
  ActionButtons,
})

export default CompoundFormContainer
