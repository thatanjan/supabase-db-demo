import { getSinglePost } from '@/utils/actions/post'
import { getUser } from '@/utils/actions/user'
import Link from 'next/link'
import React from 'react'

const Page = async ({ params }) => {
  const { postID } = await params

  const { blog } = await getSinglePost(postID)

  const {
    user: { name, id: postUserID },
    created_at,
  } = blog

  if (!blog) redirect('/')

  const { user: currentUser } = await getUser()

  return (
    <div>
      <div className='flex gap-3 justify-between mt-10'>
        <h1 className='text-4xl'>{blog.title}</h1>

        {currentUser?.id === postUserID && (
          <Link href={`/post/${postID}/update`} className='btn btn-info'>
            Edit
          </Link>
        )}
      </div>
      <p className='line-clamp-3 text-gray-500 text-sm  mb-5'>
        Created by{' '}
        <Link href={`/profile/${postUserID}`} className='link link-hover'>
          {name}
        </Link>{' '}
        at {new Date(created_at).toDateString()}{' '}
      </p>

      <p className='pr-10 whitespace-break-spaces'>{blog.content}</p>
    </div>
  )
}

export default Page
