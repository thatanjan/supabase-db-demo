'use server'

import { redirect } from 'next/navigation'
import createClientForServer from '@/utils/supabase/server'

const getAllPosts = async (options = {}) => {
  const {
    currentPage = 1,
    onlyPublic = true,
    userID,
    postsPerPage = 10,
  } = options

  const supabase = await createClientForServer()

  const startingIndex = (currentPage - 1) * postsPerPage
  const endingIndex = currentPage * postsPerPage - 1

  let query = supabase
    .from('posts')
    .select(
      `*,
      user(
        *
      )`,
      {
        count: 'exact',
      },
    )
    // .limit(3)
    .order('created_at', { ascending: false }) // latest posts first
    .range(startingIndex, endingIndex)

  if (onlyPublic) {
    query = query.eq('isPublic', true)

    if (userID) {
      query = query.eq('user', userID)
    }
  }

  // if (userID) {
  //   query = query.eq('user', userID)
  // }

  const { data, count: totalPosts, error } = await query

  if (error) {
    return {
      error: error.message,
      posts: [],
    }
  }

  const totalPages = totalPosts ? Math.ceil(totalPosts / postsPerPage) : 0

  return {
    posts: data,
    totalPosts,
    totalPages,
  }
}

const getSinglePost = async id => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('posts')
    .select(
      `*,
      user(
        *
      )`,
    )
    .eq('id', id)
    .single()

  return { blog: data, error }
}

const getCurentUserPosts = async () => {}

const getDraftPosts = async () => {}

const getTotalPostsCount = async () => {
  const supabase = await createClientForServer()

  const { count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('isPublic', true)

  return { totalPosts: count, error: error.message }
}

const createPost = async (prev, formData) => {
  const supabase = await createClientForServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  const formFields = {
    title: formData.get('title'),
    content: formData.get('content'),
    isPublic: formData.get('isPublic') === 'on',
  }

  if (authError) {
    return {
      error: 'You must be logged in to create a post',
      formFields,
    }
  }

  const { id: userID } = user

  const payload = {
    ...formFields,
    user: userID,
  }

  const { data, error: dbError } = await supabase
    .from('posts')
    .insert([payload])
    .select('*')
    .single()

  if (dbError) {
    return {
      error: dbError.message,
      formFields,
    }
  }

  redirect(`/post/${data.id}`)
}

const updatePost = async (prev, formData) => {
  const { postID } = prev

  const supabase = await createClientForServer()

  const formFields = {
    title: formData.get('title'),
    content: formData.get('content'),
    isPublic: formData.get('isPublic') === 'on',
  }

  const payload = {
    ...formFields,
  }

  const { data, error } = await supabase
    .from('posts')
    .update(payload)
    .eq('id', postID)

  if (error) {
    return {
      error: error.message,
      formFields,
      success: '',
      postID,
    }
  }

  return {
    formFields,
    success: 'Post updated successfully',
    error: '',
    postID,
  }
}

const deletePost = async prev => {
  const { postID } = prev

  const supabase = await createClientForServer()

  const { error } = await supabase.from('posts').delete().eq('id', postID)

  if (error) {
    return {
      error: error.message,
      success: '',
      postID,
    }
  }

  redirect('/dashboard')
}

export {
  createPost,
  getAllPosts,
  getCurentUserPosts,
  getDraftPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getTotalPostsCount,
}
