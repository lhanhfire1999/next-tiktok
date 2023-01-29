import className from 'classnames/bind'
import { useState } from 'react'

import { SelectMenu } from '~/components'
import { LANGUAGE } from '~/constants'
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
        isActive={isShowLanguage}
        selectedValue={selectedLanguage}
        onClickOutSide={handleClosedSelectPopper}
        onClick={handleClickSelectLanguage}
        wrapperClassName={cx('wrapper-language')}
      >
        <SelectMenu.List className={cx('language-list')}>
          {LANGUAGE.data.map(({ title }) => (
            <SelectMenu.Item onClick={handleChangeLanguage.bind(null, title)} key={title}>
              {title}
            </SelectMenu.Item>
          ))}
        </SelectMenu.List>
      </SelectMenu>
      <div className={cx('copyright')}>© 2023 TikTok</div>
    </div>
  )
}

export default SelectLanguage
