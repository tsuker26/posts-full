import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'

type PostActionsProps = {
  onEdit: () => void
  onRemove: () => void
}
export const PostActions = ({ onEdit, onRemove }: PostActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <MoreHorizontal className='w-5 h-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={onEdit}>
          <Edit />
          Редактировать
        </DropdownMenuItem>
        <DropdownMenuItem className='text-red-600 focus:text-red-600' onClick={onRemove}>
          <Trash />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
