import Posts from '@/components/Posts'
import { getAllPosts } from '@/utils/actions/post'

const Home = async ({ searchParams }) => {
  const { page } = await searchParams
  const currentPage = parseInt(page, 10) || 1

  const { posts, totalPages } = await getAllPosts({
    currentPage,
  })

  if (!posts.length)
    return (
      <div>
        <h1>No posts found</h1>
      </div>
    )

  return (
    <div>
      <Posts user={{}} posts={posts} totalPages={totalPages} />
    </div>
  )
}

export default Home
