// Use type safe message keys with `next-intl`
type Messages = typeof import('~/locales/en/translation.json')
declare interface IntlMessages extends Messages {}
