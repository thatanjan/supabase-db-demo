import Link from 'next/link'
import Pagination from '@/components/pagination'

import React from 'react'

const Post = ({
  title,
  content,
  id,
  isPublic,
  created_at,
  user: { name, id: userID },
}) => {
  return (
    <div className='card bg-base-100 w-96 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p className='line-clamp-3 text-gray-500 text-sm'>
          Created by{' '}
          <Link href={`/profile/${userID}`} className='link link-hover'>
            {name}
          </Link>{' '}
          at {new Date(created_at).toDateString()}{' '}
        </p>
        <p className='line-clamp-3'>{content}</p>

        <div className='card-actions justify-end'>
          {isPublic ? (
            <Link href={`/post/${id}`} className='btn btn-primary'>
              View Post
            </Link>
          ) : (
            <Link href={`/post/${id}/update`} className='btn btn-info'>
              Edit Post
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const Posts = ({ posts, totalPages }) => {
  return (
    <>
      <div className='flex flex-wrap gap-3'>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </>
  )
}

export default Posts
