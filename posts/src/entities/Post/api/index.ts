import { api } from '@/shared/api/api'
import { useInfiniteQuery } from '@tanstack/react-query'

export type PostType = {
  id: number
  text: string
  images?: string[]
  createdAt: string
  author: {
    id: number
    firstName: string
    lastName: string
    avatar?: string
    email?: string
    phone?: string
    birthDate?: string
    about?: string
  }
}

type GetMyPostsParams = {
  limit?: number
  offset?: number
  sort?: 'ASC' | 'DESC'
}

export const getMyPosts = async (params?: GetMyPostsParams) => {
  const query = new URLSearchParams()

  if (params?.limit) query.append('limit', String(params.limit))
  if (params?.offset) query.append('offset', String(params.offset))
  if (params?.sort) query.append('sort', params.sort)

  const response = await api.get(`/posts/my?${query.toString()}`)
  return response.data as PostType[]
}

export const useMyPosts = (params?: { limit?: number; sort?: 'ASC' | 'DESC' }) => {
  const limit = params?.limit || 10

  const result = useInfiniteQuery({
    queryKey: ['post', params],
    queryFn: ({ pageParam = 0 }) => getMyPosts({ limit, offset: pageParam, sort: params?.sort }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) return undefined
      return allPages.length * limit
    },
    initialPageParam: 0,
  })

  const hasNoPosts = !result.isLoading && result.data?.pages.flat().length === 0

  return {
    ...result,
    hasNoPosts,
  }
}
