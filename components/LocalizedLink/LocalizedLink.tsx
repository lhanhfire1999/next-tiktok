import { useLocale } from 'next-intl'
import Link from 'next/link'
import { ComponentProps, forwardRef } from 'react'
import { getLocalizedHref } from '~/utils'

type Props = ComponentProps<typeof Link>

function LocalizedLink({ href, ...rest }: Props, ref: Props['ref']) {
  const locale = useLocale()

  const localizedHref =
    typeof href === 'string'
      ? getLocalizedHref(href, locale)
      : href.pathname != null
      ? { ...href, pathname: getLocalizedHref(href.pathname, locale) }
      : href

  return <Link ref={ref} href={localizedHref} {...rest} />
}

export default forwardRef(LocalizedLink)
