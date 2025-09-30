import { useModal } from '@/shared/context/modalContext'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Plus } from 'lucide-react'
import { PostForm, type PostFormData } from './PostForm'
import { useCreatePost } from '../api'

export const CreatePost = () => {
  const { checkIsOpen, openModal, closeModal } = useModal()

  const { mutateAsync: createPost, isPending } = useCreatePost()

  const handleSubmit = async (data: PostFormData) => {
    await createPost(data)
    closeModal()
  }
  const handleOpenModal = () => {
    openModal('createPost')
  }

  return (
    <div className='flex items-center justify-center h-0.5'>
      <Button onClick={handleOpenModal} className='w-full' variant='outline'>
        <div className='flex items-center gap-2'>
          <Plus className='w-4 h-4' />
          <span>Создать пост</span>
        </div>
      </Button>
      <Dialog open={checkIsOpen('createPost')} onOpenChange={closeModal}>
        <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
          <DialogHeader>
            <DialogTitle>Создать пост</DialogTitle>
          </DialogHeader>
          <DialogDescription>Напишите текст и добавьте изображения</DialogDescription>
          <PostForm isLoading={isPending} onSubmit={handleSubmit} onCancel={closeModal} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
