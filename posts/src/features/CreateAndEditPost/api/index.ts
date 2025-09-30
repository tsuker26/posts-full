import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/api/api'
import type { PostType } from '@/entities/Post'

export interface CreatePostDTO {
  text: string
  images?: string[]
}

export interface UpdatePostDTO {
  id: number
  text: string
  images?: string[]
}

export const createPost = async (data: CreatePostDTO) => {
  const formData = new FormData()
  formData.append('text', data.text)
  data.images?.forEach((file) => formData.append('images', file))

  const response = await api.post('/posts', data)
  return response.data
}

export const updatePost = async (dto: UpdatePostDTO) => {
  const { id, ...post } = dto
  const response = await api.patch(`/posts/${id}`, post)
  return response.data
}

export const getPostById = async (id: number): Promise<PostType> => {
  const response = await api.get(`/posts/${id}`)
  return response.data
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreatePostDTO) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
    onError: (error) => {
      console.error('Ошибка при создании поста:', error)
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dto: UpdatePostDTO) => updatePost(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] })
    },
    onError: (error) => {
      console.error('Ошибка при обновлении поста:', error)
    },
  })
}

export const usePostById = (id: number) => {
  return useQuery<PostType>({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
  })
}
