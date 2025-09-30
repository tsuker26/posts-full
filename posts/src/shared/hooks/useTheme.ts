import { useLayoutEffect, useState } from 'react'

type ThemeType = 'light' | 'dark'

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [isAnimating, setIsAnimating] = useState(false)

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)

    setTimeout(() => setIsAnimating(false), 300)
  }

  return { theme, isAnimating, toggleTheme }
}
