import Link from 'next/link'
import createClientForServer from '@/utils/supabase/server'
import login, { logout } from '@/utils/actions/login'

const Nav = async () => {
  const supabase = await createClientForServer()

  const session = await supabase.auth.getUser()

  return (
    <nav className='flex flex-nowrap justify-between items-center mb-5'>
      <Link className='text-4xl' href='/'>
        Posts
      </Link>

      <div className='flex flex-nowrap'>
        <Link
          className='mr-3 btn self-center btn-success btn-ghost'
          href='/create'
        >
          New Post
        </Link>

        <form className=' self-center'>
          {session.error ? (
            <button formAction={login} type='submit' className='btn btn-info'>
              Login
            </button>
          ) : (
            <>
              <Link className='btn self-center btn-success' href='/dashboard'>
                Dashboard
              </Link>
              <button
                formAction={logout}
                className='btn ml-2 self-center btn-success'
                href='/dashboard'
              >
                Logout
              </button>
            </>
          )}
        </form>
      </div>
    </nav>
  )
}

export default Nav
