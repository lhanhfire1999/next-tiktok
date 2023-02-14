import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { Button } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import styles from './LoginContainer.module.scss'

const cx = classNames.bind(styles)

const LoginContainer = () => {
  const t = useTranslations()
  const { handleToggleModal } = useAuthModal()

  const handleOpenSignInModal = () => {
    handleToggleModal(true)
  }
  return (
    <div className={cx('wrapper')}>
      <p className={cx('paragraph')}>{t('Auth.signInContent')}</p>
      <Button large outlinePrimary className={cx('login-btn')} onClick={handleOpenSignInModal}>
        {t('Auth.signIn')}
      </Button>
    </div>
  )
}

export default LoginContainer
