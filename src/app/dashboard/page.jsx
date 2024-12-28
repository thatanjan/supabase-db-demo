import Posts from '@/components/Posts'
import { getAllPosts } from '@/utils/actions/post'
import React from 'react'

const Page = async () => {
  const { posts } = await getAllPosts({ onlyPublic: false })

  return (
    <div>
      <Posts user={{}} posts={posts} />
    </div>
  )
}

export default Page
