import { useRouter } from 'next/router'
import RenderCards from 'components/RenderCards'
import { useFetch } from 'utils/useFetch'
import { URL_SEARCH_ANIME, URL_SEARCH_MANGA, URL_SEARCH_CHARACTERS } from 'services/endpoints'
import { IQuerySearchAnime, IQuerySearchManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import InputSearch from './inputSearch'
import { isStringParam, validateTypeSearch } from 'utils/validators'

const searchTypesURL = {
  character: ({ querys }: {querys: { page?: number, limit?: number, q?: string, order_by?: 'mal_id' | 'name' | 'favorites', sort?: 'desc' | 'asc', letter?: string }}): string => URL_SEARCH_CHARACTERS({ querys: { order_by: 'favorites', sort: 'desc', ...querys } }),
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { order_by: 'favorites', sort: 'desc', ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { order_by: 'favorites', sort: 'desc', ...querys } })
}

const SearchPage = () => {
  const router = useRouter()
  const page = Number(new URLSearchParams(globalThis?.window?.location?.search).get('page'))
  const q = isStringParam(router.query.name)
  const type = validateTypeSearch(router.query.type)
  const { data, isLoading } = useFetch(searchTypesURL[type]({ querys: { q, page } }))

  return (
    <Layout title={q}>
      <>
        <InputSearch valueSearched={q} />
        <RenderCards type={type} data={data?.data || []} sizeCard={'medium'} pagination={data?.pagination} isLoading={isLoading} />
      </>
    </Layout>
  )
}

export default SearchPage
