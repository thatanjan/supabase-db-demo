'use client'
import { deletePost, updatePost } from '@/utils/actions/post'
import useResettableActionState from '@/utils/hooks/useResettableActionState'
import { useEffect } from 'react'

const UpdatePostForm = ({ blog }) => {
  const initialState = {
    formFields: {
      title: blog.title,
      content: blog.content,
      isPublic: blog.isPublic,
    },
    postID: blog.id,
    error: '',
    success: '',
  }

  const {
    state: updateState,
    isPending: isUpdatePending,
    formAction: updatePostAction,
    updateState: updateUpdateState,
  } = useResettableActionState({
    initialState,
    action: updatePost,
  })

  const {
    state: deleteState,
    formAction: deletePostAction,
    isPending: isDeletePending,
    updateState: updateDeleteState,
  } = useResettableActionState({
    action: deletePost,
    initialState: {
      postID: blog.id,
      error: '',
    },
  })

  const {
    formFields: { title, content, isPublic },
    error: updateError,
    success,
  } = updateState

  const { error: deleteError } = deleteState

  const clearState = () => {
    updateUpdateState({ error: '', success: '' })
    updateDeleteState({ error: '', success: '' })
  }

  // Clear state when trying to update or delete
  useEffect(() => {
    if (isDeletePending || isUpdatePending) {
      clearState()
    }
  }, [isUpdatePending, isDeletePending])

  // Clear delete & success state after 5 seconds
  useEffect(() => {
    if (deleteError || updateError || success) {
      setTimeout(clearState, 5000)
    }
  }, [deleteError, updateError, success])

  return (
    <div>
      <form action={updatePostAction}>
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
            disabled={isUpdatePending}
          >
            {isUpdatePending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Update Post
          </button>

          <button
            type='submit'
            className='btn btn-block btn-error'
            disabled={isDeletePending}
            formAction={deletePostAction}
          >
            {isDeletePending && (
              <span className='loading loading-spinner loading-sm'></span>
            )}
            Delete Post
          </button>
        </div>
        <div className='mt-5'>
          {(deleteError || updateError) && (
            <div role='alert' className='alert alert-error'>
              <span>{deleteError || updateError}</span>
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

export default UpdatePostForm
