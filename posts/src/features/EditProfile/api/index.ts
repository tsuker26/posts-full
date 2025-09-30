import { api } from '@/shared/api/api'
import type { EditProfileDTO } from '../ui/EditProfileForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const buildEditProfileDTO = (data: EditProfileDTO) => {
  const result: Partial<EditProfileDTO> = {}

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      result[key as keyof EditProfileDTO] = value
    }
  })

  return result
}

export const updateProfile = async (data: EditProfileDTO) => {
  const patchData = buildEditProfileDTO(data)
  const response = await api.patch('/profile', patchData)
  return response.data
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: EditProfileDTO) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error) => {
      console.error('Ошибка обновления профиля:', error)
    },
  })
}
