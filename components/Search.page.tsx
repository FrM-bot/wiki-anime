// import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// import LayoutSearch from 'Layouts/LayoutSearch'
// import { SERACH } from 'services/SEARCH'
// import { IAnime } from 'interfaces/Anime'
import RenderCards from 'components/RenderCards'
// import { IAnimeManga } from 'interfaces/Global'
// import { IPagination } from 'interfaces/Anime'
import { useFetch } from 'utils/useFetch'
import { URL_SEARCH_ANIME, URL_SEARCH_MANGA, URL_SEARCH_CHARACTERS } from 'services/endpoints'
import { types, TypesSearch } from 'utils/types'
import { IQuerySearchAnime, IQuerySearchManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import InputSearch from './inputSearch'
// import RenderCardsCharacter from './RenderCardsCharacter'

export const isStringParam = (str: string | string[] | undefined): string => {
  if (typeof str !== 'string') {
    return ''
  }
  return str
}

const searchTypesURL = {
  character: ({ querys }: {querys: { page?: number, limit?: number, q?: string, order_by?: 'mal_id' | 'name' | 'favorites', sort?: 'desc' | 'asc', letter?: string }}): string => URL_SEARCH_CHARACTERS({ querys: { order_by: 'favorites', sort: 'desc', ...querys } }),
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { order_by: 'favorites', sort: 'desc', ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { order_by: 'favorites', sort: 'desc', ...querys } })
}

export const validateTypeSearch = (str: string | string[] | undefined | TypesSearch): TypesSearch => {
  if (typeof str === 'string') {
    for (const type of types) {
      if (str === type) return str
    }
  }
  return 'anime'
}
const initialStatePagination = { current_page: 1, has_next_page: false, last_visible_page: 1, items: { count: 0, per_page: 0, total: 0 } }
const SearchPage = () => {
  const router = useRouter()
  const page = Number(new URLSearchParams(globalThis?.window?.location?.search).get('page'))
  const q = isStringParam(router.query.name)
  const type = validateTypeSearch(router.query.type)
  const { data, isLoading } = useFetch(searchTypesURL[type]({ querys: { q, page } }))

  return (
    <Layout>
      <>
        <InputSearch valueSearched={q} />
        <RenderCards type={type} data={data?.data || []} sizeCard={'medium'} pagination={data?.pagination || initialStatePagination} isLoading={isLoading} />
      </>
    </Layout>
  )
}

export default SearchPage
