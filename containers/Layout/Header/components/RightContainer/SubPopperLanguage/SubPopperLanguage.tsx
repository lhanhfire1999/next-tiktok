import classNames from 'classnames/bind'
import { useLocale, useTranslations } from 'next-intl'

import { BackIcon, CheckIcon, Popper } from '~/components'
import { LANGUAGE } from '~/constants'
import { useGlobalLanguage } from '~/hooks'

import { useLanguage } from '../contexts/LanguageContext'

import styles from './SubPopperLanguage.module.scss'

const cx = classNames.bind(styles)

const SubPopperLanguage = () => {
  const t = useTranslations()
  const locale = useLocale()
  const { languageList, handleChangeLanguage: onChangeLanguage } = useGlobalLanguage()
  const { handleChangeShowLanguages } = useLanguage()

  const handleChangeLanguage = (newLocale: string) => {
    onChangeLanguage(newLocale, () => handleChangeShowLanguages(false))
  }

  return (
    <>
      <Popper.Header className={cx('header')}>
        <i className={cx('back-icon')} onMouseDown={handleChangeShowLanguages.bind(null, false)}>
          <BackIcon />
        </i>
        <h4 className={cx('title')}>{t(LANGUAGE.title as any)}</h4>
      </Popper.Header>

      <Popper.MenuList className={cx('language-list')}>
        {languageList.map((language) => (
          <Popper.MenuItem
            key={language!.code}
            className={cx('language-item', { active: language!.code === locale })}
            onClick={handleChangeLanguage.bind(null, language!.code)}
          >
            {language!.title}
            {language!.code === locale && <CheckIcon className={cx('check-icon')} />}
          </Popper.MenuItem>
        ))}
      </Popper.MenuList>
    </>
  )
}

export default SubPopperLanguage
