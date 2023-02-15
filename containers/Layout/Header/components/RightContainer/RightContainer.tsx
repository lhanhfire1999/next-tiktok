import classNames from 'classnames/bind'
import ActionButtons from './ActionButtons'
import ButtonUpload from './ButtonUpload'
import Menu from './Menu'
import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

const RightContainer = () => {
  return (
    <div className={cx('wrapper')}>
      <ButtonUpload />
      <ActionButtons />

      <Menu>
        <Menu.Wrapper>
          <Menu.AvatarOrIcon />
          <Menu.MenuPopper />
        </Menu.Wrapper>
      </Menu>
    </div>
  )
}

export default RightContainer
