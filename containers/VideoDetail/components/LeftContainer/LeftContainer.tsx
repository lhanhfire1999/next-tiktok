import classNames from 'classnames/bind'
import React from 'react'
import { CircleXIcon, CloseXIcon, LocalizedLink } from '~/components'
import { useVideoDetail } from '../../contexts/VideoDetailContext'
import styles from './LeftContainer.module.scss'

interface ContainerProp {
  className: string
}

const cx = classNames.bind(styles)

const LeftContainer: React.FC<ContainerProp> = ({ className }) => {
  const { data } = useVideoDetail()

  return (
    <div className={cx(className, 'wrapper')}>
      {data?.video && (
        <video className={cx('video')} controls>
          <source type="video/mp4" src={data.video} />
        </video>
      )}

      <LocalizedLink href="/" className={cx('wrapper-icon')}>
        <CloseXIcon className={cx('back-icon')} />
      </LocalizedLink>
    </div>
  )
}

export default LeftContainer
