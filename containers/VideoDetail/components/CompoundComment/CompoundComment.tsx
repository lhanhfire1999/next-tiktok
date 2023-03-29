import classNames from 'classnames/bind'
import moment from 'moment'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

import { DownIcon, ImageWithFallback, List } from '~/components'
import { useInfiniteScroll } from '~/hooks'
import { Comment } from '~/services/comment'
import { useCommentReply } from '../../contexts/CommentReplyContext'

import styles from './CompoundComment.module.scss'

interface ChildrenProp {
  children: React.ReactNode
}

interface CommentListProp extends ChildrenProp {
  hasSubCommentList?: boolean
}

interface CommentItemProp {
  commentData: Comment
  isLastItem?: boolean
  onUpPage?: () => void
  // children is replyCommentComp
  children?: React.ReactNode
  parentCommentId?: string
}

interface ReplyCommentContainerProp {
  replyCommentData: Comment[]
  parentCommentId: string
}

const cx = classNames.bind(styles)

const CommentContainer: React.FC<ChildrenProp> = ({ children }) => {
  return <div className={cx('comment-container')}>{children}</div>
}

const CommentList: React.FC<CommentListProp> = ({ children, hasSubCommentList }) => {
  return <List className={cx({ 'sub-comment-list': hasSubCommentList })}>{children}</List>
}

const CommentItem: React.FC<CommentItemProp> = ({ commentData, isLastItem, onUpPage, children, parentCommentId }) => {
  const t = useTranslations('VideoDetail')
  const { _id, content, username, userImage, createdAt } = commentData
  const { scrollTriggerRef } = useInfiniteScroll(isLastItem && !parentCommentId ? { callback: onUpPage } : {})
  const { handleChangeReplyComment } = useCommentReply()

  const handleReplyComment = () => {
    handleChangeReplyComment({ parentCommentId: parentCommentId || _id!, username })
  }

  return (
    <List.Item className={cx('comment-item-container')} ref={!parentCommentId && isLastItem ? scrollTriggerRef : null}>
      <div className={cx('comment-item-wrapper')}>
        <ImageWithFallback className={cx('avatar')} src={userImage} alt={`${username}-avatar`} width="40" height="40" />
        <div className={cx('content-wrapper')}>
          <h4 className={cx('username')}>{username}</h4>
          <p className={cx('comment-content')} dangerouslySetInnerHTML={{ __html: content }} />
          <p className={cx('comment-sub-content')}>
            <span className={cx('time')}>{moment(createdAt).fromNow()}</span>
            <span className={cx('button')} onClick={handleReplyComment}>
              {t('reply')}
            </span>
          </p>
        </div>
      </div>

      {children}
    </List.Item>
  )
}

const ReplyCommentContainer: React.FC<ReplyCommentContainerProp> = ({ replyCommentData, parentCommentId }) => {
  const t = useTranslations('VideoDetail')
  const [showSubComments, setShowSubComments] = useState(false)

  const handleShowSubComments = () => {
    setShowSubComments(true)
  }

  if (!replyCommentData || !replyCommentData.length) {
    return null
  }

  if (!showSubComments) {
    return (
      <p className={cx('show-replies')} onClick={handleShowSubComments}>
        <span className={cx('content')}>{`${t('viewMoreReplies')} (${replyCommentData.length})`}</span>
        <DownIcon width="14" height="14" />
      </p>
    )
  }
  return (
    <CommentList hasSubCommentList={true}>
      {replyCommentData.map((replyComment) => (
        <CommentItem key={replyComment._id!} commentData={replyComment} parentCommentId={parentCommentId} />
      ))}
    </CommentList>
  )
}

const NoHaveComment = () => {
  const t = useTranslations('VideoDetail')
  return <p className={cx('no-have-comment')}>{t('firstComment')}</p>
}

const CompoundComment = Object.assign(CommentContainer, {
  CommentList,
  CommentItem,
  NoHaveComment,
  ReplyCommentContainer,
})

export default CompoundComment
