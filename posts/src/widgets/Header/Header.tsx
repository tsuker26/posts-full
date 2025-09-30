import { ThemeSwitcher } from '@/shared/components/ThemeSwitcher'
import { Newspaper } from 'lucide-react'

export const Header = () => {
  return (
    <header className='flex items-center justify-between px-6 py-4 bg-card shadow-md border-b border-border dark:border-border-dark transition-colors duration-300 fixed top-0 left-0 w-full z-50'>
      <div className='flex items-center gap-3'>
        <Newspaper className='text-primary w-6 h-6' />
        <h1 className='text-xl font-semibold  dark:text-gray-100'>Posts</h1>
      </div>

      <div className='flex items-center gap-4'>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
