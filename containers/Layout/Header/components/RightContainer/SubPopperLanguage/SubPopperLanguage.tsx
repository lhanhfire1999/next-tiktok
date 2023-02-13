import classNames from 'classnames/bind'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useMemo } from 'react'

import { BackIcon, CheckIcon, Popper } from '~/components'
import { LANGUAGE } from '~/constants'
import { useLanguage } from '../contexts/LanguageContext'

import styles from './SubPopperLanguage.module.scss'

const cx = classNames.bind(styles)

const SubPopperLanguage = () => {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { handleChangeShowLanguages } = useLanguage()

  const LANGUAGE_LIST = useMemo(() => {
    if (LANGUAGE.data[0].code === locale) return LANGUAGE.data

    const languageInfo = LANGUAGE.data.find((item) => item.code === locale)
    const newLanguageList = [...LANGUAGE.data].filter((item) => item.code !== locale)

    return [languageInfo, ...newLanguageList]
  }, [locale])

  const handleChangeLanguage = (newLocale: string) => {
    if (!pathname) return

    const slitPathname = pathname.split('/')
    if (slitPathname[1] === newLocale) {
      handleChangeShowLanguages(false)
    }

    let query = {}
    if (searchParams.get('q')) {
      query = { q: searchParams.get('q'), ...query }
    }

    slitPathname[1] = newLocale
    const url = queryString.stringifyUrl({ url: slitPathname.join('/'), query: query })

    router.push(url)
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
        {LANGUAGE_LIST.map((language) => (
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
