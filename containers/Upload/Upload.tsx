import classNames from 'classnames/bind'
import { FormContainer, UploadVideoContainer } from './component'
import styles from './Upload.module.scss'

const cx = classNames.bind(styles)

const Upload = () => {
  return (
    <div className={cx('wrapper')}>
      <h1>Upload video</h1>
      <p>Post a video to your account</p>

      <div className={cx('wrapper-content')}>
        <UploadVideoContainer />
        <FormContainer />
      </div>
    </div>
  )
}

export default Upload
