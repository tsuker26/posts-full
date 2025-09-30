import { Sun, Moon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'
import { useTheme } from '../hooks/useTheme'

export const ThemeSwitcher = () => {
  const { theme, isAnimating, toggleTheme } = useTheme()
  return (
    <Button
      variant='ghost'
      size='icon'
      className={clsx(
        'p-2 rounded-full transition-colors duration-500',
        theme === 'light'
          ? 'bg-gradient-light hover:bg-gradient-light shadow-glow-light'
          : 'bg-gradient-dark hover:bg-gradient-dark shadow-glow-dark'
      )}
      onClick={toggleTheme}
      aria-label='Переключить тему'
    >
      <div
        className={clsx(
          'transition-transform duration-300 ease-in-out',
          isAnimating && 'rotate-180',
          'transition-opacity duration-300'
        )}
      >
        {theme === 'light' ? (
          <Moon size={18} className='text-gray-600 opacity-100 transition-opacity duration-300' />
        ) : (
          <Sun size={18} className='text-yellow-400 opacity-100 transition-opacity duration-300' />
        )}
      </div>
    </Button>
  )
}
