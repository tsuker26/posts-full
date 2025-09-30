import { useModal } from '@/shared/context/modalContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { PostForm, type PostFormData } from './PostForm'
import { usePostById, useUpdatePost } from '../api'

type EditPostProps = {
  postId: number
}
export const EditPost = ({ postId }: EditPostProps) => {
  const { checkIsOpen, closeModal } = useModal()

  const { data: post, isLoading } = usePostById(postId)
  const { mutateAsync: updatePost } = useUpdatePost()

  const handleSubmit = async (data: PostFormData) => {
    updatePost({ id: postId, ...data })
    closeModal()
  }

  if (isLoading) return null

  return (
    <div className='flex items-center justify-center h-0.5'>
      <Dialog open={checkIsOpen('editPost')} onOpenChange={closeModal}>
        <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
          <DialogHeader>
            <DialogTitle>Редактировать пост</DialogTitle>
          </DialogHeader>
          <DialogDescription>Измените текст или изображения</DialogDescription>
          <PostForm
            initialData={post}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
