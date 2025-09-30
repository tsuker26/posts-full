import type { UserType } from '@/entities/User'
import { useModal } from '@/shared/context/modalContext'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { EditProfileForm, type EditProfileDTO } from './EditProfileForm'
import { useUpdateProfile } from '../api'

type EditProfilePropsType = {
  user: UserType
}
export const EditProfile = ({ user }: EditProfilePropsType) => {
  const { checkIsOpen, closeModal } = useModal()
  const { mutate, isPending } = useUpdateProfile()

  const handleSubmit = (data: EditProfileDTO) => {
    mutate(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  return (
    <Dialog open={checkIsOpen('editProfile')} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[425px] max-h-[95vh] '>
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
        </DialogHeader>
        <DialogDescription>Внесите изменения в профиль и сохраните.</DialogDescription>
        <EditProfileForm
          user={user}
          isLoading={isPending}
          onCancel={closeModal}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
