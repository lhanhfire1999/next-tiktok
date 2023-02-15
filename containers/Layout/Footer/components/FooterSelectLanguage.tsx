import className from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { SelectMenu } from '~/components'
import { useGlobalLanguage } from '~/hooks'

import styles from './FooterSelectLanguage.module.scss'

const cx = className.bind(styles)

const SelectLanguage = () => {
  const t = useTranslations()
  const [isShowLanguage, setIsShowLanguage] = useState(false)
  const { languageList, handleChangeLanguage: onChangeLanguage } = useGlobalLanguage()

  const handleClickSelectLanguage = () => {
    setIsShowLanguage((prev) => {
      return !prev
    })
  }

  const handleClosedSelectPopper = () => {
    setIsShowLanguage(false)
  }

  const handleChangeLanguage = (newLocale: string) => {
    onChangeLanguage(newLocale, () => setIsShowLanguage(false))
  }
  return (
    <div className={cx('wrapper-footer-bottom')}>
      <SelectMenu
        isActive={isShowLanguage}
        selectedValue={languageList[0]!.title}
        onClickOutSide={handleClosedSelectPopper}
        onClick={handleClickSelectLanguage}
        wrapperClassName={cx('wrapper-language')}
      >
        <SelectMenu.List className={cx('language-list')}>
          {languageList.map((item) => (
            <SelectMenu.Item onClick={handleChangeLanguage.bind(null, item!.code)} key={item!.code}>
              {item!.title}
            </SelectMenu.Item>
          ))}
        </SelectMenu.List>
      </SelectMenu>
      <div className={cx('copyright')}>{t('Footer.copyright')}</div>
    </div>
  )
}

export default SelectLanguage
