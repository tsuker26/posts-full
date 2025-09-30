import { Card } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'

export const UserSkeleton = () => {
  return (
    <Card className='p-5 flex flex-col gap-5'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex items-center gap-5'>
          <Skeleton className='w-25 h-25 rounded-full' />

          <div className='flex flex-col gap-2'>
            <Skeleton className='w-48 h-6 rounded-md' />

            <Skeleton className='w-36 h-4 rounded-md' />

            <Skeleton className='w-36 h-4 rounded-md' />

            <Skeleton className='w-36 h-4 rounded-md' />
          </div>
        </div>

        <Skeleton className='w-50 h-7 rounded-md' />
      </div>

      <div className='w-full ml-3'>
        <Skeleton className='w-full h-16 rounded-md' />
      </div>
    </Card>
  )
}
