'use client'
import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useFormState, useWatch } from 'react-hook-form'

import { Button, EditIcon, HashtagIcon, List, SelectMenu, TagPersonIcon, ToggleButton } from '~/components'
import { UPLOAD_PAGE_FORM_CONTAINER } from '~/constants'
import { AllowUserMode, UploadBodyParams, WatchMode } from '~/services/upload'
import { getVideoDuration } from '~/utils'
import { useUploadModal } from '../../contexts'
import { useUploadForm } from '../../contexts/UploadFormContext'
import { usePostUploadForm } from '../../hooks/usePostUploadForm'

import styles from './FormContainer.module.scss'

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
  const { ref, ...rest } = register('caption', { required: true })
  const captionValue = useWatch({ control, name: 'caption' })

  const captionRef = useRef<HTMLInputElement | null>(null)

  const handleClickHashtag = () => {
    const cursorPosition = captionRef.current!.selectionStart || captionValue.length

    setValue(
      'caption',
      captionValue.substring(0, cursorPosition) + '#' + captionValue.substring(cursorPosition, captionValue.length)
    )
    captionRef.current!.setSelectionRange(cursorPosition + 1, cursorPosition + 1)
    captionRef.current!.focus()
  }

  const handleClickTagPerson = () => {
    setValue('caption', '')
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
          <i onClick={handleClickTagPerson}>
            <TagPersonIcon className={cx('icon', '')} width="2rem" height="2rem" />
          </i>

          <i onClick={handleClickHashtag}>
            <HashtagIcon className={cx('icon')} width="2rem" height="1.7rem" />
          </i>
        </div>
      </div>
    </div>
  )
}

const SettingVideo = () => {
  const [isShowSelectMenu, setIsShowSelectMenu] = useState(false)
  const { setValue, control } = useUploadForm()
  const currentWatchMode = useWatch({ control, name: 'watchMode' })

  const currentSelectedValue = useMemo(() => {
    const { data } = UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch
    const infoData = data.find((item) => item.key === currentWatchMode)
    return infoData?.value || data[0].value
  }, [currentWatchMode])

  const handleToggleSelectMenu = () => {
    setIsShowSelectMenu((prev) => !prev)
  }

  const handleClosedSelectMenu = () => {
    setIsShowSelectMenu(false)
  }

  const handleChangeWatchMode = (value: WatchMode) => {
    setValue('watchMode', value)
    handleClosedSelectMenu()
  }

  return (
    <div className={cx('wrapper-setting-video') + ' mt-6'}>
      <h4>{UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.title}</h4>

      <SelectMenu
        onClickOutSide={handleClosedSelectMenu}
        selectedValue={currentSelectedValue}
        onClick={handleToggleSelectMenu}
        isActive={isShowSelectMenu}
      >
        <SelectMenu.List>
          {UPLOAD_PAGE_FORM_CONTAINER.whoCanWatch.data.map(({ key, value }) => (
            <List.Item key={key} className={cx('option-item')} onClick={handleChangeWatchMode.bind(null, key)}>
              {value}
            </List.Item>
          ))}
        </SelectMenu.List>
      </SelectMenu>
    </div>
  )
}

const AllowUser = () => {
  const id = useId()

  const { register, control, setValue, resetField } = useUploadForm()
  const { ...rest } = register('allowUserMode')
  const uploadVideo = useWatch({ control, name: 'uploadVideo' })
  const [isOverVideoDuration, setIsOverVideoDuration] = useState(false)

  useEffect(() => {
    // Upload video field
    if (uploadVideo) {
      const handleUploadVideoField = async (file: File) => {
        const videoDuration = await getVideoDuration(file)
        // > 1 minute
        if (videoDuration > 1) {
          setValue('allowUserMode', ['0'])
          setIsOverVideoDuration(true)
        }
      }

      handleUploadVideoField(uploadVideo[0])
      return
    }

    resetField('allowUserMode')
    setIsOverVideoDuration(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadVideo])

  const handleIsDisabled = useCallback(
    (value: AllowUserMode) => {
      if (isOverVideoDuration && value !== '0') {
        return true
      }
      return false
    },
    [isOverVideoDuration]
  )

  return (
    <div className={cx('wrapper-allow-user') + ' mt-6'}>
      <h4>{UPLOAD_PAGE_FORM_CONTAINER.allowUser.title}</h4>

      <List className={cx('option-list') + ' mt-1'}>
        {UPLOAD_PAGE_FORM_CONTAINER.allowUser.data.map(({ key: idx, value: optionName }) => (
          <List.Item key={idx} className={cx('option-item', { disabled: handleIsDisabled(idx) })}>
            <input {...rest} type="checkbox" id={id + `-${idx}`} value={idx} disabled={handleIsDisabled(idx)} />
            <label htmlFor={id + `-${idx}`}>{optionName}</label>
          </List.Item>
        ))}
      </List>

      {isOverVideoDuration && (
        <p className={cx('warning')}> {UPLOAD_PAGE_FORM_CONTAINER.allowUser.overVideoDuration}</p>
      )}
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
  const { isLoading, handleSubmitForm } = usePostUploadForm()
  const { control, reset, getValues } = useUploadForm()
  const { isValid } = useFormState({ control })
  const { handleShowModal } = useUploadModal()

  const handleDiscard = () => {
    reset()
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('uploadVideo', getValues('uploadVideo')![0])

    const bodyParams: UploadBodyParams = {
      caption: getValues('caption'),
      allowUserMode: getValues('allowUserMode'),
      watchMode: getValues('watchMode'),
      uploadVideo: formData,
    }
    handleSubmitForm(bodyParams, handleShowModal.bind(null, { strategy: 'post' }))
  }

  return (
    <div className={cx('wrapper-action-buttons') + ' mt-6'}>
      <Button outlineGray large className={cx('btn')} onClick={handleDiscard}>
        Discard
      </Button>
      <Button primary large className={cx('btn')} onClick={handleSubmit} disabled={!isValid || isLoading}>
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
