import Loader from 'components/Loader'
import { lazy, Suspense, useState, useEffect } from 'react'
const SearchPage = lazy(() => import('components/Search.page'))

const Search = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <Suspense fallback={<div className='w-full grid place-content-center h-[40vh]'><Loader /></div>}>
      <SearchPage />
    </Suspense>
  )
}

export default Search
