import Card from 'components/Card'
import LoadingComponent from 'components/LoadingComponent'
import RenderCards from 'components/RenderCards'
import { isStringParam } from 'components/Search.page'
import { IQuerySearchAnime, IQuerySearchManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { getGenres, getGenresFile, writeFile } from 'lib/files'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { lazy, Suspense } from 'react'
import { URL_SEARCH_ANIME, URL_SEARCH_MANGA } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import { validateTypeAnimeManga } from './[id]'

const searchTypesURL = {
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { ...querys } })
}
// 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'
export const validateTypeManga = (str: string | string[] | undefined): 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua' => {
  if (typeof str === 'string') {
    if (str === 'manga') {
      return str
    }
    if (str === 'novel') {
      return str
    }
    if (str === 'lightnovel') {
      return str
    }
    if (str === 'oneshot') {
      return str
    }
    if (str === 'doujin') {
      return str
    }
    if (str === 'manhwa') {
      return str
    }
    if (str === 'manhua') {
      return str
    }
  }
  return 'manga'
}

export const validateTypeAnime = (str: string | string[] | undefined): 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music' => {
  if (typeof str === 'string') {
    if (str === 'tv') {
      return str
    }
    if (str === 'movie') {
      return str
    }
    if (str === 'ova') {
      return str
    }
    if (str === 'special') {
      return str
    }
    if (str === 'ona') {
      return str
    }
    if (str === 'music') {
      return str
    }
  }
  return 'tv'
}

const NavFilters = lazy(() => import('components/NavFilters'))

interface IGenre {
  mal_id: number,
  name: string,
  url: string,
  count: number
}

interface IProps {
  mangaGenres: IGenre[]
  animeGenres: IGenre[]
}

const Filter = ({ mangaGenres, animeGenres }: IProps) => {
  const router = useRouter()
  const { type, subType, ...rest } = router.query
  const { data, isLoading, isError } = useFetch(searchTypesURL[validateTypeAnimeManga(type)]({ querys: { type: type === 'anime' ? validateTypeAnime(subType) : validateTypeManga(subType), ...rest } }))
  console.log({ rest })
  return (
    <Layout title={`Search ${type}`}>
      <>
        <Card>
          <h1>Filter</h1>
        </Card>
        <LoadingComponent isLoading={isLoading} isError={isError}>
          <>
            <Suspense fallback={'loading'}>
              <NavFilters
                defaultOrderBy={isStringParam(rest?.order_by)}
                defaultLetter={isStringParam(rest?.letter)}
                animeGenres={animeGenres} mangaGenres={mangaGenres}
                defaultGenre={isStringParam(rest?.genres)}
                defaultType={validateTypeAnimeManga(type)}
                defaultMinScore={Number(rest?.min_score)}
                defaultMaxScore={Number(rest?.max_score)}
                defaultSubType={type === 'anime' ? validateTypeAnime(subType) : validateTypeManga(subType)}
                defaultSort={isStringParam(rest?.sort)} />
            </Suspense>
            <RenderCards sizeCard='small' data={data?.data} pagination={data?.pagination} />
          </>
        </LoadingComponent>
      </>
    </Layout>
  )
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { type: 'anime' } }, { params: { type: 'manga' } }],
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { animeGenresFileJSON, mangaGenresFileJSON, error } = await getGenresFile('./data')
    if (error) {
      const { animeGenres, mangaGenres } = await getGenres()
      await writeFile(animeGenres, './data/animeGenres.json')
      await writeFile(mangaGenres, './data/mangaGenres.json')
      return {
        props: {
          mangaGenres,
          animeGenres
        }
      }
    }

    return {
      props: {
        mangaGenres: animeGenresFileJSON,
        animeGenres: mangaGenresFileJSON
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Filter
