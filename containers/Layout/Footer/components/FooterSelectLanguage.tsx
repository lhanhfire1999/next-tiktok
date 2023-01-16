import React, { useState } from 'react'
import { SelectMenu } from '~/components'
import { LANGUAGE } from '~/constants'
import className from 'classnames/bind'
import styles from './FooterSelectLanguage.module.scss'

const cx = className.bind(styles)

const SelectLanguage = () => {
  const [isShowLanguage, setIsShowLanguage] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const handleClickSelectLanguage = () => {
    setIsShowLanguage((prev) => {
      return !prev
    })
  }

  const handleClosedSelectPopper = () => {
    setIsShowLanguage(false)
  }

  const handleChangeLanguage = (value: string) => {
    setSelectedLanguage(value)
    handleClosedSelectPopper()
  }
  return (
    <div className={cx('wrapper-footer-bottom')}>
      <SelectMenu
        wrapperClassName={cx('wrapper-language')}
        onClickOutSide={handleClosedSelectPopper}
        selectedValue={selectedLanguage}
        onClick={handleClickSelectLanguage}
      >
        <SelectMenu.OptionList
          isActive={isShowLanguage}
          listClassName={cx('language-list')}
          data={LANGUAGE.data.map((item) => item.title)}
          onClick={handleChangeLanguage}
        />
      </SelectMenu>
      <div className={cx('copyright')}>© 2023 TikTok</div>
    </div>
  )
}

export default SelectLanguage
