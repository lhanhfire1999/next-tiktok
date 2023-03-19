import classNames from 'classnames/bind'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { DownIcon, ImageWithFallback, List } from '~/components'
import { Comment } from '~/services/comment'

import styles from './CompoundComment.module.scss'

interface ChildrenProp {
  children: React.ReactNode
}

interface CommentListProp extends ChildrenProp {
  hasSubCommentList?: boolean
}

interface CommentItemProp {
  commentData: Comment
}

interface ReplyCommentContainerProp {
  replyComments?: Comment[]
}

const cx = classNames.bind(styles)

const CommentContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('comment-container')}>{children}</div>
}

const CommentList: React.FC<CommentListProp> = ({ children, hasSubCommentList }) => {
  return <List className={cx({ 'sub-comment-list': hasSubCommentList })}>{children}</List>
}

const CommentItem: React.FC<CommentItemProp> = ({ commentData }) => {
  const t = useTranslations('VideoDetail')
  const { content, username, userImage, reply, createdAt } = commentData
  return (
    <List.Item className={cx('comment-item-container')}>
      <div className={cx('comment-item-wrapper')}>
        <ImageWithFallback className={cx('avatar')} src={userImage} alt={`${username}-avatar`} width="40" height="40" />
        <div className={cx('content-wrapper')}>
          <h4 className={cx('username')}>{username}</h4>
          <p className={cx('comment-content')}>{content}</p>
          <p className={cx('comment-sub-content')}>
            <span className={cx('time')}>{moment(createdAt).fromNow()}</span>
            <span className={cx('button')}>{t('reply')}</span>
          </p>
        </div>
      </div>

      <ReplyCommentContainer replyComments={reply} />
    </List.Item>
  )
}

const ReplyCommentContainer: React.FC<ReplyCommentContainerProp> = ({ replyComments }) => {
  const t = useTranslations('VideoDetail')
  const [showSubComments, setShowSubComments] = useState(false)

  const handleShowSubComments = () => {
    setShowSubComments(true)
  }

  if (!replyComments || !replyComments.length) {
    return null
  }

  if (!showSubComments) {
    return (
      <p className={cx('show-replies')} onClick={handleShowSubComments}>
        <span className={cx('content')}>{`${t('viewMoreReplies')} (${replyComments.length})`}</span>
        <DownIcon width="14" height="14" />
      </p>
    )
  }
  return (
    <CommentList hasSubCommentList={true}>
      {replyComments.map((replyComment) => (
        <CommentItem key={replyComment._id} commentData={replyComment} />
      ))}
    </CommentList>
  )
}

const NoHaveComment = () => {
  const t = useTranslations('VideoDetail')
  return <p className={cx('no-have-comment')}>{t('firstComment')}</p>
}

const CompoundComment = Object.assign(CommentContainer, { CommentList, CommentItem, NoHaveComment })

export default CompoundComment
