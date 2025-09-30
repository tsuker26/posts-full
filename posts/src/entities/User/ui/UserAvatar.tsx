import { baseURL } from '@/shared/api/api'
import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { PencilLine } from 'lucide-react'

type UserAvatarPropsType = {
  avatarUrl?: string
  fallbackText: string
  className?: string
  size?: number
  onEditAvatar?: () => void
}

export const UserAvatar = ({
  fallbackText,
  avatarUrl,
  className,
  size = 25,
  onEditAvatar,
}: UserAvatarPropsType) => {
  return (
    <div
      onClick={onEditAvatar}
      className={cn(`relative w-${size} h-${size} cursor-pointer group`, className)}
    >
      <Avatar className={`w-${size} h-${size} relative overflow-hidden rounded-full`}>
        <AvatarImage src={`${baseURL}/${avatarUrl}`} />
        <AvatarFallback className={`w-${size} h-${size}`}>{fallbackText}</AvatarFallback>
        {onEditAvatar && (
          <div
            className='absolute bottom-0 left-0 w-full h-1/2 bg-gray-700  flex items-center justify-center 
                     translate-y-full group-hover:translate-y-0 
                    transition-all duration-300'
          >
            <PencilLine className='h-3 w-3 text-white' />
          </div>
        )}
      </Avatar>
    </div>
  )
}
