import { PostCard, useMyPosts, type PostType } from '@/entities/Post'
import { UserAvatar } from '@/entities/User'
import { RemovePost } from '@/features/RemovePost'
import { useModal } from '@/shared/context/modalContext'
import { useState } from 'react'
import { Loader } from '@/shared/ui/loader'
import { useInView } from 'react-intersection-observer'
import { SelectSort } from './SelectSort'
import { EditPost } from '@/features/CreateAndEditPost'

export const PostsList = () => {
  const [postId, setPostId] = useState<number | null>(null)
  const [sort, setSort] = useState<'ASC' | 'DESC'>('DESC')
  const { openModal } = useModal()

  const {
    data: posts,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    hasNoPosts,
  } = useMyPosts({
    limit: 5,
    sort,
  })

  const handleChangePage = (inView: boolean) => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const handleRemovePost = (id: number) => {
    openModal('removePost')
    setPostId(id)
  }

  const handleEditPost = (id: number) => {
    openModal('editPost')
    setPostId(id)
  }
  const handleSortChange = (value: 'ASC' | 'DESC') => {
    setSort(value)
  }

  const { ref } = useInView({
    threshold: 1,
    onChange: handleChangePage,
  })

  if (isLoading) return <Loader />
  if (hasNoPosts) return <h2 className='m-auto'>Постов нет</h2>

  return (
    <div className='flex flex-col'>
      <SelectSort sort={sort} onChangeSort={handleSortChange} />
      {posts?.pages.map((page) =>
        page.map((post: PostType) => (
          <PostCard
            key={post.id}
            post={post}
            userAvatarRender={(props) => <UserAvatar {...props} />}
            onEdit={handleEditPost}
            onRemove={handleRemovePost}
          />
        ))
      )}

      {hasNextPage && (
        <div ref={ref} className='flex justify-center p-4'>
          <Loader />
        </div>
      )}

      {postId && <RemovePost postId={postId} />}
      {postId && <EditPost postId={postId} />}
    </div>
  )
}
