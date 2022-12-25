import classNames from 'classnames/bind'
import { Button, UploadIcon } from '~/components'
import ActionButtons from './ActionButtons'
import Profile from './Profile'
import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

const RightContainer = () => {
  return (
    <div className={cx('wrapper')}>
      <Button href="upload" outlineGray LeftIcon={<UploadIcon width="100%" height="100%" />}>
        Upload
      </Button>

      <ActionButtons />

      <Profile>
        <Profile.AvatarOrIcon />
        <Profile.MenuPopper />
      </Profile>
    </div>
  )
}

export default RightContainer
