import Card from 'components/Card'
import LoadingComponent from 'components/LoadingComponent'
import RenderCards from 'components/RenderCards'
import { IQuerySearchAnime, IQuerySearchManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { getGenres, getGenresFile, writeFile } from 'lib/files'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { lazy, Suspense } from 'react'
import { URL_SEARCH_ANIME, URL_SEARCH_MANGA } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import { validateTypeAnime, validateTypeAnimeManga, validateTypeManga } from 'utils/validators'

const searchTypesURL = {
  anime: ({ querys }: { querys: IQuerySearchAnime }) => URL_SEARCH_ANIME({ querys: { ...querys } }),
  manga: ({ querys }: { querys: IQuerySearchManga }) => URL_SEARCH_MANGA({ querys: { ...querys } })
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
                defaultOrderBy={String(rest?.order_by)}
                defaultLetter={String(rest?.letter)}
                animeGenres={animeGenres} mangaGenres={mangaGenres}
                defaultGenre={String(rest?.genres)}
                defaultType={validateTypeAnimeManga(type)}
                defaultMinScore={Number(rest?.min_score)}
                defaultMaxScore={Number(rest?.max_score)}
                defaultSubType={type === 'anime' ? validateTypeAnime(subType) : validateTypeManga(subType)}
                defaultSort={String(rest?.sort)} />
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
