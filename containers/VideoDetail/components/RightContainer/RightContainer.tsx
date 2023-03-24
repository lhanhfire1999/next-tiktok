import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

import { CircleTwitterIcon, CommentIcon, FacebookIcon, HeartIcon, List, Loading } from '~/components'
import { UserDetails, VideoContainer } from '~/containers/Home/components'
import { useAuthModal } from '~/contexts'
import { useEventListener } from '~/hooks'

import { CommentContentProvider, useCommentContent } from '../../contexts/CommentContentContext'
import { CommentReplyProvider, useCommentReply } from '../../contexts/CommentReplyContext'
import { useVideoDetail } from '../../contexts/VideoDetailContext'
import { useFetchCommentById, usePostSocketComment } from '../../hooks'
import CompoundComment from '../CompoundComment'

import styles from './RightContainer.module.scss'

const cx = classNames.bind(styles)

interface ContainerProp {
  className: string
  children: React.ReactNode
}

enum ACTION_NAMES {
  Like = 'Like',
  Comment = 'Comment',
  Embed = 'Embed',
  ShareToFB = 'Share to FaceBooks',
  ShareToTwitter = 'Share to Twitter',
}

const ACTION_BUTTONS = {
  leftContainer: [
    { id: ACTION_NAMES.Like, Icon: HeartIcon },
    { id: ACTION_NAMES.Comment, Icon: CommentIcon },
  ],
  rightContainer: [
    { id: ACTION_NAMES.ShareToFB, Icon: FacebookIcon },
    { id: ACTION_NAMES.ShareToTwitter, Icon: CircleTwitterIcon },
  ],
} as const

const RightContainer: React.FC<ContainerProp> = ({ className, children }) => {
  return (
    <CommentContentProvider>
      <CommentReplyProvider>
        <div className={cx(className, 'wrapper')}>{children}</div>
      </CommentReplyProvider>
    </CommentContentProvider>
  )
}

const TopContainer = () => {
  const t = useTranslations('VideoDetail')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data, handleUpdateFollow, handleUpdateLike } = useVideoDetail()

  const getCurrentUrl = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_URL}${pathname}?id=${searchParams?.get('id')}`
  }, [pathname, searchParams])

  const handleCopyVideoLink = async () => {
    await navigator.clipboard.writeText(getCurrentUrl)
  }

  const handleClickLikeOrCommentButton = ({ strategy }: { strategy: ACTION_NAMES.Like | ACTION_NAMES.Comment }) => {
    if (strategy === ACTION_NAMES.Like) {
      handleUpdateLike(data!.id, data!.username)
      return
    }
  }

  const getShareUrl = ({ strategy }: { strategy: ACTION_NAMES.ShareToFB | ACTION_NAMES.ShareToTwitter }) => {
    if (strategy === ACTION_NAMES.ShareToFB) {
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getCurrentUrl)}&t=${encodeURIComponent(
        `${data!.username} on TopTop`
      )}`
    }

    if (strategy === ACTION_NAMES.ShareToTwitter) {
      return `http://twitter.com/share?text=${encodeURIComponent(
        `${data!.username} on TopTop`
      )}&url=${encodeURIComponent(getCurrentUrl)}`
    }
  }

  if (!data) {
    return null
  }

  return (
    <div className={cx('top-container')}>
      <UserDetails data={data} onUpdateFollow={handleUpdateFollow} className={cx('info-content')} />

      <VideoContainer>
        <VideoContainer.VideoDescription>{data.caption}</VideoContainer.VideoDescription>
        <VideoContainer.VideoMusic>{data.music_name} </VideoContainer.VideoMusic>
      </VideoContainer>

      <div className={cx('wrapper-action-buttons')}>
        <List className={cx('left-action-buttons')}>
          {ACTION_BUTTONS.leftContainer.map(({ id, Icon }) => (
            <List.Item key={id} className={cx('button', { 'cursor-pointer': id === ACTION_NAMES.Like })}>
              <i
                key={id}
                className={cx('wrapper-icon', { active: data.is_liked })}
                onClick={handleClickLikeOrCommentButton.bind(null, { strategy: id })}
              >
                <Icon className={cx('icon', { 'like-icon': id === ACTION_NAMES.Like })} />
              </i>
              <span className={cx('quantity')}> {id === ACTION_NAMES.Like ? data.likes : data.comments}</span>
            </List.Item>
          ))}
        </List>

        <List className={cx('right-actions-buttons')}>
          {ACTION_BUTTONS.rightContainer.map(({ id, Icon }) => (
            <List.Item
              key={id}
              className={cx('wrapper-icon')}
              href={getShareUrl({ strategy: id })}
              title={id}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon width="2.4rem" height="2.4rem" />
            </List.Item>
          ))}
        </List>
      </div>

      <div className={cx('copy-link-container')}>
        <p>{getCurrentUrl}</p>
        <button onClick={handleCopyVideoLink}>{t('copyLink')}</button>
      </div>
    </div>
  )
}

const CommentContainer = () => {
  const { data: comments, isLoading, handleIncreasePage } = useFetchCommentById()

  return (
    <CompoundComment>
      {!comments.length && <CompoundComment.NoHaveComment />}
      {!!comments.length && (
        <CompoundComment.CommentList>
          {comments.map((comment, index) => (
            <CompoundComment.CommentItem
              key={comment._id!}
              commentData={comment}
              isLastItem={comments.length - 1 === index}
              onUpPage={handleIncreasePage}
            >
              {!!comment.reply && comment.reply.length > 0 && (
                <CompoundComment.ReplyCommentContainer
                  replyCommentData={comment.reply}
                  parentCommentId={comment._id!}
                />
              )}
            </CompoundComment.CommentItem>
          ))}
        </CompoundComment.CommentList>
      )}
      {isLoading && <Loading />}
    </CompoundComment>
  )
}

const BottomContainer = () => {
  const t = useTranslations('VideoDetail')
  const { data: session } = useSession()
  const { handleToggleModal } = useAuthModal()
  const { commentContentRef } = useCommentContent()
  const { replyComment } = useCommentReply()

  const handleClickLoginBar = () => {
    if (!session) {
      handleToggleModal(true)
      return
    }
  }

  return (
    <div className={cx('bottom-container')}>
      {!session ? (
        <div className={cx('login-bar')} onClick={handleClickLoginBar}>
          {t('loginToComment')}
        </div>
      ) : (
        <>
          {replyComment.username && <span className={cx('reply')}>{`Reply to ${replyComment.username}:`}</span>}
          <div className={cx('bottom-comment-wrapper')}>
            <div className={cx('comment-bar')}>
              <p
                className={cx('paragraph')}
                ref={commentContentRef}
                data-placeholder={t('addCommentPlaceholder')}
                contentEditable
                suppressContentEditableWarning
              />
            </div>

            <PostButton />
            <RemoveReplyButton />
          </div>
        </>
      )}
    </div>
  )
}

const PostButton = () => {
  const t = useTranslations('VideoDetail')
  const [isActive, setIsActive] = useState(false)
  const { commentContentRef, handleUpdateComment } = useCommentContent()

  const { handlePost } = usePostSocketComment({
    callback: handleUpdateComment.bind(null, ''),
  })

  const handleTogglePostBtn = () => {
    // To avoid spam, so should use textContent
    if (commentContentRef.current?.textContent) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }
  useEventListener('input', handleTogglePostBtn, commentContentRef)

  return (
    <button className={cx('btn', { active: isActive })} onClick={handlePost}>
      {t('post')}
    </button>
  )
}

const RemoveReplyButton = () => {
  const t = useTranslations('VideoDetail')
  const { replyComment, handleChangeReplyComment } = useCommentReply()

  const handleRemoveReply = () => {
    handleChangeReplyComment({ parentCommentId: null, username: null })
  }

  if (!replyComment.username) return null

  return (
    <button className={cx('btn', { active: true })} onClick={handleRemoveReply}>
      {t('removeReply')}
    </button>
  )
}

const CompoundRightContainer = Object.assign(RightContainer, { TopContainer, BottomContainer, CommentContainer })

export default CompoundRightContainer
