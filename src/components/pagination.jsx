'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

const Pagination = ({ totalPages }) => {
  const currentPath = usePathname()
  const params = useSearchParams()

  let page = parseInt(params.get('page'), 10) || 1

  return (
    <div className='grid place-items-center my-5'>
      <div className='join'>
        <Link
          className={`join-item btn ${page <= 1 ? 'btn-disabled' : ''}`}
          href={`${currentPath}?page=${page - 1}`}
        >
          «
        </Link>
        <div className='join-item btn no-animation'>Page {page}</div>
        <Link
          className={`join-item btn ${page >= totalPages ? 'btn-disabled' : ''}`}
          href={`${currentPath}?page=${page + 1}`}
        >
          »
        </Link>
      </div>
    </div>
  )
}

export default Pagination
