import { GetStaticProps } from 'next'
import NavFilters from 'components/NavFilters'
import Layout from 'Layouts/Layout'
import { getGenresFile } from 'lib/files'
import RandomData from 'components/RamdomData'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import Carousel from '@/components/Carousel'
import Link from 'components/Link'
import { useRouter } from 'next/router'
import CardDynamic from '@/components/CardDynamic'

interface IGenre {
  mal_id: number,
  name: string,
  url: string,
  count: number
}

interface IProps {
  mangaGenres: IGenre[]
  animeGenres: IGenre[]
  topAnime: IAnime[]
  topManga: IManga[]
  error?: string
}

const Index = ({ mangaGenres, animeGenres, topAnime, topManga, error }: IProps) => {
  const { query } = useRouter()

  if (error) {
    return (
      <Layout title='Wiki Anime'>
        <div className='grid place-content-center'>
          <p>
            {error}
          </p>
        </div>
      </Layout>
    )
  }
  return (
    <Layout title='Wiki Anime'>
      <>
        <div className='flex justify-center my-4'>
          <div className='bg-secondary mx-auto rounded-full p-2 w-fit flex gap-4 shadow-lg'>
            <Link props={{ style: { backgroundColor: query.type === 'anime' ? 'white' : '', color: query.type === 'anime' ? 'black' : '' } }} className='px-6 py-1 rounded-full grid place-content-center hover:bg-primary duration-300'
              href={'/anime'}>
              Anime
            </Link>
            <Link props={{ style: { backgroundColor: query.type === 'anime' ? 'white' : '', color: query.type === 'anime' ? 'black' : '' } }} className='px-6 py-1 rounded-full grid place-content-center hover:bg-primary duration-300'
              href={'/manga'}>
              Manga
            </Link>
          </div>
        </div>
        <CardDynamic variant='v1' type='div' className='flex justify-between items-center'>
          <h2>Top anime</h2>
          <Link href='/anime/top'>See top anime</Link>
        </CardDynamic>
        <Carousel type='anime' data={topAnime?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
        <CardDynamic variant='v1' type='div' className='flex justify-between items-center'>
          <h2>Top manga</h2>
          <Link href='/manga/top'>See top manga</Link>
        </CardDynamic>
        <Carousel type='manga' data={topManga?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />

        <div className='w-full flex justify-center'>
          <NavFilters animeGenres={animeGenres} mangaGenres={mangaGenres} />
        </div>
        <div className='w-full flex justify-center'>
          <RandomData />
        </div>
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { animeGenresFileJSON, mangaGenresFileJSON } = await getGenresFile('./data')
    const topAnime = await GET_ANIME_MANGA_TOP({ type: 'anime', querys: { limit: 10 } })
    const topManga = await GET_ANIME_MANGA_TOP({ type: 'manga', querys: { limit: 10 } })

    // if (error) {
    //   const { animeGenres, mangaGenres } = await getGenres()
    //   await writeFile(animeGenres, './data/animeGenres.json')
    //   await writeFile(mangaGenres, './data/mangaGenres.json')

    //   return {
    //     props: {
    //       mangaGenres,
    //       animeGenres,
    //       topAnime: topAnime?.data,
    //       topManga: topManga?.data
    //     }
    //   }
    // }
    if (!topAnime?.data && !topManga?.data) {
      return { props: { error: 'Error to get data' } }
    }

    console.log(topAnime)

    return {
      props: {
        mangaGenres: animeGenresFileJSON ?? [],
        animeGenres: mangaGenresFileJSON ?? [],
        topAnime: topAnime?.data ?? [],
        topManga: topManga?.data ?? []
      }
    }
  } catch (error: any) {
    console.error(error.message)
    return { props: { error: error?.message } }
  }
}

export default Index
