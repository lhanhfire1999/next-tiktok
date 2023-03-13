import React, { useState } from 'react'
import { DownIcon, ImageWithFallback, List } from '~/components'
import styles from './CompoundComment.module.scss'
import classNames from 'classnames/bind'

interface ChildrenProp {
  children: React.ReactNode
}

interface CommentListProp extends ChildrenProp {
  isSubCommentList?: boolean
}

interface CommentItemProp {
  parentId: string
  parentUsername: string
  childrenId?: string
  childrenUsername?: string
  subCommentList?: []
}

const cx = classNames.bind(styles)

const CommentContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('comment-container')}>{children}</div>
}

const CommentList: React.FC<CommentListProp> = ({ children, isSubCommentList }) => {
  return <List className={cx({ 'sub-comment-list': isSubCommentList })}>{children}</List>
}

const CommentItem: React.FC<CommentItemProp> = ({
  parentId,
  parentUsername,
  childrenId,
  childrenUsername,
  subCommentList,
}) => {
  const [showSubComments, setShowSubComments] = useState(false)

  const handleShowSubComments = () => {
    setShowSubComments(true)
  }

  return (
    <List.Item className={cx('comment-item-container')}>
      <div className={cx('comment-item-wrapper')}>
        <ImageWithFallback className={cx('avatar')} src={''} alt={'string'} width="40" height="40" />
        <div className={cx('content-wrapper')}>
          <h4 className={cx('username')}>tintin</h4>
          <p className={cx('comment-content')}>
            đừng share địa điểm yên bình, hãy để nó yên. Cứ ngó chỗ bãi đất Hồ Xanh chỗ Sơn Trà là thấy cái cảnh
          </p>
          <p className={cx('comment-sub-content')}>
            <span className={cx('time')}>2-27</span>
            <span className={cx('button')}>Reply</span>
          </p>
        </div>
      </div>
      {subCommentList?.length && !showSubComments && (
        <p className={cx('show-replies')} onClick={handleShowSubComments}>
          <span className={cx('content')}>View more replies ({subCommentList.length})</span>
          <DownIcon width="14" height="14" />
        </p>
      )}

      {subCommentList?.length && showSubComments && (
        <CommentList isSubCommentList={true}>
          <CommentItem
            parentId={parentId}
            parentUsername={parentUsername}
            childrenId={childrenId}
            childrenUsername={childrenUsername}
          />
          <CommentItem
            parentId={parentId}
            parentUsername={parentUsername}
            childrenId={childrenId}
            childrenUsername={childrenUsername}
          />
        </CommentList>
      )}
    </List.Item>
  )
}

const CompoundComment = Object.assign(CommentContainer, { CommentList, CommentItem })

export default CompoundComment
