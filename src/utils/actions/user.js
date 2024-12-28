'use server'

import createClientForServer from '@/utils/supabase/server'

const getUser = async () => {
  const supabase = await createClientForServer()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  return { user, error }
}

const getUserProfile = async userID => {
  const supabase = await createClientForServer()

  const { data, error } = await supabase
    .from('profiles')
    .select('*, profilePhoto:profile_photo')
    .eq('id', userID)
    .single()

  return { profile: data, error: error?.message }
}

const updateUserProfile = async (prev, formData) => {
  const supabase = await createClientForServer()

  const formFields = {
    name: formData.get('name'),
    city: formData.get('city'),
    country: formData.get('country'),
  }

  const { error } = await supabase
    .from('profiles')
    .eq('id', prev.id)
    .update({
      ...formFields,
    })

  if (error) {
    return {
      error: error.message,
      formFields,
      success: '',
    }
  }

  return {
    success: 'Profile updated successfully',
    error: '',
    formFields,
  }
}

export { getUserProfile, updateUserProfile, getUser }
