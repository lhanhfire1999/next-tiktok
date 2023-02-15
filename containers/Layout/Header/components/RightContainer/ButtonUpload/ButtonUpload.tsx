import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

import { Button, UploadIcon } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'

const ButtonUpload = () => {
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const t = useTranslations()

  return (
    <Button
      href={session ? `/upload` : null}
      onClick={!session ? handleToggleModal.bind(null, true) : undefined}
      outlineGray
      LeftIcon={<UploadIcon width="100%" height="100%" />}
    >
      {t('Common.upload')}
    </Button>
  )
}

export default ButtonUpload
