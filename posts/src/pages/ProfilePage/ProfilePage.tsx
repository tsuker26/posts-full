import { CreatePost } from '@/features/CreateAndEditPost'
import { PostsList } from '@/widgets/PostsList'
import { UserProfile } from '@/widgets/UserProfile'

export const ProfilePage = () => {
  return (
    <main className='flex flex-col gap-y-8 max-w-200 m-auto mt-10 p-10'>
      <UserProfile />
      <CreatePost />
      <PostsList />
    </main>
  )
}
