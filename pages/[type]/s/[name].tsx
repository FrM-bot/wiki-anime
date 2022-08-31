import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LayoutSearch from 'Layouts/LayoutSearch'
import { SERACH } from 'services/SEARCH'
// import { IAnime } from 'interfaces/Anime'
import RenderCards from 'components/RenderCards'
import { IAnimeManga } from 'interfaces/Global'
import { IPagination } from 'interfaces/Anime'
const Search = () => {
  const router = useRouter()

  const [searched, setSearched] = useState<IAnimeManga[]>()
  const [pagination, setPagination] = useState<IPagination>()

  useEffect(() => {
    if ((typeof router.query.type !== 'string') || (typeof router.query.name !== 'string')) {
      return () => {}
    }
    SERACH({ name: router.query.name, type: router.query.type, page: Number(new URLSearchParams(window?.location?.search).get('page')) || 1 })
      .then(res => {
        setPagination(res.pagination)
        setSearched(res.data)
      })
  }, [router.query.name, router.query.type, globalThis?.window?.location?.search])
  // console.log(pagination)
  return (
    <LayoutSearch>
      <>
        <RenderCards data={searched || []} typeCard={'medium'} pagination={pagination || { current_page: 1, has_next_page: false, last_visible_page: 1, items: { count: 0, per_page: 0, total: 0 } }} />
      </>
    </LayoutSearch>
  )
}

export default Search
