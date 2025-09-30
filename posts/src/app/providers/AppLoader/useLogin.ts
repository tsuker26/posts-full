import { api } from '@/shared/api/api'
import { useMutation } from '@tanstack/react-query'

type LoginResponse = {
  access_token: string
}

type LoginData = {
  login: string
  password: string
}

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data: LoginData) => {
      const res = await api.post('/auth/login', data)
      return res.data
    },
  })
}
