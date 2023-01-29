'use client'
import { useUploadModal } from '../../contexts/UploadModalContext'
import CompoundUploadModal from './CompoundUploadModal'

const UploadModal = () => {
  const { isOpenModal, strategy } = useUploadModal()

  if (isOpenModal && strategy) {
    return (
      <CompoundUploadModal>
        {strategy === 'change-video' && <CompoundUploadModal.ChangeVideoModalContent />}
        {strategy === 'post' && <CompoundUploadModal.PostModalContent />}
      </CompoundUploadModal>
    )
  }

  return null
}

export default UploadModal
