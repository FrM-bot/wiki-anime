import { lazy, Suspense, useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import LayoutSearch from 'Layouts/LayoutSearch'
// import { SERACH } from 'services/SEARCH'
// import { IAnime } from 'interfaces/Anime'
// import RenderCards from 'components/RenderCards'
// import { IAnimeManga } from 'interfaces/Global'
// import { IPagination } from 'interfaces/Anime'
// import { useFetch } from 'utils/useFetch'
// import { URL_SEARCH } from 'services/endpoints'

// const util = (str: string | string[] | undefined): string => {
//   if (typeof str !== 'string') {
//     return ''
//   }
//   return str
// }

const SearchPage = lazy(() => import('components/Search.page'))

const Search = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // const router = useRouter()
  // const [searched, setSearched] = useState<IAnimeManga[]>()
  // const [pagination, setPagination] = useState<IPagination>()
  // const page = Number(new URLSearchParams(globalThis?.window?.location?.search).get('page'))
  // const { data, isError, isLoading } = useFetch(URL_SEARCH({ name: util(router.query.name), page: page || 1, type: util(router.query.type) }))

  // useEffect(() => {
  //   if ((typeof router.query.type !== 'string') || (typeof router.query.name !== 'string')) {
  //     return () => {}
  //   }
  //   SERACH({ name: router.query.name, type: router.query.type, page: Number(new URLSearchParams(window?.location?.search).get('page')) || 1 })
  //     .then(res => {
  //       setPagination(res.pagination)
  //       setSearched(res.data)
  //     })
  // }, [router.query.name, router.query.type, globalThis?.window?.location?.search])
  // console.log(pagination)
  // if (isError) {
  //   return <div>error</div>
  // }
  // if (isLoading) {
  //   return <div>loading...</div>
  // }
  // console.log(data?.pagination, { page }, data)
  return mounted && (
    // <LayoutSearch>
    //   <>
    //     <RenderCards data={searched || []} typeCard={'medium'} pagination={pagination || { current_page: 1, has_next_page: false, last_visible_page: 1, items: { count: 0, per_page: 0, total: 0 } }} isLoading={false} />
    //   </>
    // </LayoutSearch>
    <Suspense fallback="loading...">
      <SearchPage />
    </Suspense>
  )
}

export default Search
