import { Card } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import type { UserType } from '../api'
import { UserAvatar } from './UserAvatar'
import { UserSkeleton } from './UserSkeleton'
import { Pencil } from 'lucide-react'

type UserPropsType = {
  user: UserType
  isLoading: boolean
  onEditAvatar: () => void
  onEditProfile: () => void
}

export const User = ({ user, isLoading, onEditAvatar, onEditProfile }: UserPropsType) => {
  const avatarFallbackText = `${user.firstName?.at(0)}${user.lastName?.at(0)}`

  if (isLoading) return <UserSkeleton />

  return (
    <Card className='p-5 flex gap-5'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-5'>
          <UserAvatar
            fallbackText={avatarFallbackText}
            avatarUrl={user.avatar}
            onEditAvatar={onEditAvatar}
          />
          <div>
            <h2 className='text-xl font-bold'>
              {user?.firstName} {user?.lastName}
            </h2>
            {user?.email && (
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            )}
            {user?.phone && (
              <p>
                <strong>Телефон:</strong> {user?.phone}
              </p>
            )}
            {user?.birthDate && (
              <p>
                <strong>Дата рождения:</strong> {user?.birthDate}
              </p>
            )}
          </div>
        </div>
        <Button variant='outline' onClick={onEditProfile}>
          <Pencil className='w-4 h-4 sm:hidden' />
          <span className='hidden sm:inline'>Редактировать профиль</span>
        </Button>
      </div>
      <div className='w-full mt-3 sm:ml-3 sm:mt-0'>
        {user?.about ? (
          <p className='text-sm sm:text-base leading-relaxed'>
            <strong>О себе:</strong> {user?.about}
          </p>
        ) : (
          <span className='text-gray-500 italic text-sm sm:text-base'>
            Укажите информацию о себе
          </span>
        )}
      </div>
    </Card>
  )
}
