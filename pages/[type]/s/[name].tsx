import { lazy, Suspense, useState, useEffect } from 'react'
const SearchPage = lazy(() => import('components/Search.page'))

const Search = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <Suspense fallback="loading...">
      <SearchPage />
    </Suspense>
  )
}

export default Search
