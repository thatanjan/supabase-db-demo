import Posts from '@/components/Posts'
import { getAllPosts } from '@/utils/actions/post'
import { getUserProfile } from '@/utils/actions/user'
import Image from 'next/image'
import React from 'react'

const Page = async ({ params, searchParams }) => {
  const { userID } = await params

  const { page } = await searchParams
  const currentPage = parseInt(page, 10) || 1

  const { profile, error } = await getUserProfile(userID)

  const { id, profilePhoto, name, email, city, country } = profile

  const { posts, totalPages } = await getAllPosts({ userID, currentPage })

  return (
    <div>
      <div className='flex flex-col gap-3'>
        <Image src={profilePhoto} height={300} width={300} />
        <h1 className='text-4xl'>{name}</h1>
        <p>{email}</p>

        {city && country && (
          <p>
            {city}, {country}
          </p>
        )}
      </div>

      <h2 className='text-4xl my-5 text-center'>Posts</h2>
      <Posts posts={posts} totalPages={totalPages} />
    </div>
  )
}

export default Page
