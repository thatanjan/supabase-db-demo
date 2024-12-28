import UpdatePostForm from '@/components/Forms/UpdatePostForm'
import { getSinglePost } from '@/utils/actions/post'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const page = async ({ params }) => {
  const { postID } = await params

  const { blog } = await getSinglePost(postID)

  if (!blog) redirect('/dashboard')

  return (
    <div>
      <Link className='btn btn-ghost' href={`/post/${postID}`}>
        {'<-'} Go back to post
      </Link>
      <UpdatePostForm blog={blog} />
    </div>
  )
}

export default page
