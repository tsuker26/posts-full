import { api } from '@/shared/api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const removePost = async (id: number) => {
  const response = await api.delete(`/posts/${id}`)
  return response.data
}

export const useRemovePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => removePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
    onError: (error) => {
      console.error('Ошибка при удалении поста:', error)
    },
  })
}
