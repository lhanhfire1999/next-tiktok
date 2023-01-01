import classNames from 'classnames/bind'
import { Button } from '~/components'
import { useAuthModal } from '~/contexts/AuthModalContext'
import styles from './LoginContainer.module.scss'

const cx = classNames.bind(styles)

const LoginContainer = () => {
  const { handleToggleModal } = useAuthModal()

  const handleOpenSignInModal = () => {
    handleToggleModal(true)
  }
  return (
    <div className={cx('wrapper')}>
      <p className={cx('paragraph')}>Log in to follow creators, like videos, and view comments.</p>
      <Button large outlinePrimary className={cx('login-btn')} onClick={handleOpenSignInModal}>
        Log in
      </Button>
    </div>
  )
}

export default LoginContainer
