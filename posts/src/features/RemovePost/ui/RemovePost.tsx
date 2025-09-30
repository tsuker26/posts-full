import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { useRemovePost } from '../api'
import { Button } from '@/shared/ui/button'
import { useModal } from '@/shared/context/modalContext'
import { DialogDescription } from '@radix-ui/react-dialog'

type RemovePostPropsType = {
  postId: number
}
export const RemovePost = ({ postId }: RemovePostPropsType) => {
  const { checkIsOpen, closeModal } = useModal()
  const { mutateAsync: removePost, isPending } = useRemovePost()

  const handleDelete = async () => {
    await removePost(postId)
    closeModal()
  }

  return (
    <Dialog open={checkIsOpen('removePost')} onOpenChange={closeModal}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Подтвердите удаление</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.
        </DialogDescription>
        <DialogFooter className='mt-4 flex justify-end gap-2'>
          <Button variant='outline' onClick={closeModal}>
            Отмена
          </Button>
          <Button variant='destructive' onClick={handleDelete} isLoading={isPending}>
            Удалить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
