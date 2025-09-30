import { api } from '@/shared/api/api'
import { useQuery } from '@tanstack/react-query'

export type UserType = {
  id: number
  login: string
  firstName?: string
  lastName?: string
  birthDate?: string
  about?: string
  email?: string
  phone?: string
  avatar?: string
}

export const useProfile = () => {
  return useQuery<UserType>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data
    },
  })
}
