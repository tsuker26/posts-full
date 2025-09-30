import { Loader } from '../ui/loader'

export const PageLoader = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-background/80 z-50'>
      <div className='flex flex-col items-center gap-2'>
        <Loader />
        <p className='text-sm text-muted-foreground'>Загрузка...</p>
      </div>
    </div>
  )
}
