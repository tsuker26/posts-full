import { api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const uploadAvatar = async (url: string) => {
  const response = await api.patch('/profile/avatar', { avatar: url })
  return response.data
}

export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (url: string) => uploadAvatar(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
    onError: (error) => {
      console.error('Ошибка обновления аватара:', error)
    },
  })
}
