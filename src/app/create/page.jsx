'use client'
import { createPost } from '@/utils/actions/post'
import useResettableActionState from '@/utils/hooks/useResettableActionState'

const Page = () => {
  const initialState = {
    formFields: {
      title: 'dfdf',
      content: 'dfd',
      isPublic: true,
    },
    error: '',
    success: '',
  }

  const { state, isPending, formAction } = useResettableActionState({
    initialState,
    action: createPost,
  })

  const {
    formFields: { title, content, isPublic },
    error,
    success,
  } = state

  return (
    <div className=''>
      <h1>Create Post</h1>

      <form action={formAction}>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Title</span>
          </div>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered w-full'
            defaultValue={title}
            name='title'
            required
          />
        </label>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text'>Content</span>
          </div>
          <textarea
            className='textarea textarea-bordered '
            placeholder='Bio'
            defaultValue={content}
            rows={5}
            name='content'
            required
          ></textarea>
        </label>

        <label className='form-control w-full flex-row items-center'>
          <input
            type='checkbox'
            defaultChecked={isPublic}
            className='checkbox checkbox-md'
            name='isPublic'
          />
          <div className='label'>
            <span className='label-text'>Public</span>
          </div>
        </label>

        <div className='flex flex-wrap gap-2'>
          <button
            type='submit'
            className='btn btn-block btn-primary'
            disabled={isPending}
          >
            {isPending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Create Post
          </button>
        </div>
        <div className='mt-5'>
          {error && (
            <div role='alert' className='alert alert-error'>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div role='alert' className='alert alert-success'>
              <span>{success}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default Page
