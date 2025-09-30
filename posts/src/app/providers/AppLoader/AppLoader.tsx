import { useEffect, type ReactNode } from 'react'
import { useLogin } from './useLogin'
import { PageLoader } from '@/shared/components/PageLoader'

export const AppLoader = ({ children }: { children: ReactNode }) => {
  const { mutate, isPending, isError } = useLogin()

  useEffect(() => {
    mutate(
      { login: 'admin', password: 'admin123' },
      {
        onSuccess: (data) => {
          console.log('Успешный вход', data.access_token)
          localStorage.setItem('access_token', data.access_token)
        },
        onError: () => {
          console.log('Ошибка входа')
        },
      }
    )
  }, [])

  if (isPending) return <PageLoader />
  if (isError) return <h1>Ошибка</h1>

  return children
}
