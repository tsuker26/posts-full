import type { ReactNode } from 'react'
import { Card } from '@/shared/ui/card'
import { baseURL } from '@/shared/api/api'
import type { PostType } from '../api'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { PostActions } from './PostActions'

type UserAvatarRenderProps = {
  avatarUrl?: string
  fallbackText: string
  className?: string
  size?: number
  onEditAvatar?: () => void
}

type PostCardProps = {
  post: PostType
  userAvatarRender: (props: UserAvatarRenderProps) => ReactNode
  onEdit: (id: number) => void
  onRemove: (id: number) => void
}

export const PostCard = ({ post, userAvatarRender, onEdit, onRemove }: PostCardProps) => {
  const singleImage = post.images && post.images.length === 1
  const authorName = `${post.author.firstName} ${post.author.lastName}`
  const fallbackText = `${post.author.firstName?.at(0)}${post.author.lastName?.at(0)}`

  return (
    <Card className='p-4 shadow-md rounded-lg overflow-hidden mb-6'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          {userAvatarRender({ fallbackText, avatarUrl: post.author.avatar, size: 10 })}
          <p className='font-semibold'>{authorName}</p>
        </div>
        <PostActions onEdit={() => onEdit(post.id)} onRemove={() => onRemove(post.id)} />
      </div>

      {post.images && post.images.length > 0 && (
        <div className={`flex flex-wrap justify-center gap-2  ${singleImage ? 'p-0' : ''}`}>
          {post.images.map((img, i) => (
            <img
              key={i}
              src={`${baseURL}/${img}`}
              alt={`Post image ${i + 1}`}
              className={`object-cover rounded-lg ${singleImage ? 'w-full h-auto' : 'w-[48%] max-h-80 '}`}
            />
          ))}
        </div>
      )}
      <p>{post.text}</p>
      <div className='flex self-end text-sm text-gray-500'>
        {format(new Date(post.createdAt), 'd MMM yyyy', { locale: ru })}
      </div>
    </Card>
  )
}
