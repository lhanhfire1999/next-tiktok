import { useLocale } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useMemo } from 'react'

import { LANGUAGE } from '~/constants'
import { handleScrollTop } from '~/utils'

const useGlobalLanguage = () => {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const languageList = useMemo(() => {
    if (LANGUAGE.data[0].code === locale) return LANGUAGE.data

    const languageInfo = LANGUAGE.data.find((item) => item.code === locale)
    const newLanguageList = [...LANGUAGE.data].filter((item) => item.code !== locale)

    return [languageInfo, ...newLanguageList]
  }, [locale])

  const handleChangeLanguage = (newLocale: string, callback: () => void) => {
    if (!pathname) return

    const slitPathname = pathname.split('/')

    if (slitPathname[1] === newLocale) {
      handleScrollTop()
      callback()
      return
    }

    let query = {}
    if (searchParams.get('q')) {
      query = { q: searchParams.get('q'), ...query }
    }

    slitPathname[1] = newLocale
    const url = queryString.stringifyUrl({ url: slitPathname.join('/'), query: query })

    router.push(url)
  }

  return { languageList, handleChangeLanguage }
}

export default useGlobalLanguage
