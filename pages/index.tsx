import { GetStaticProps } from 'next'
import Link from 'next/link'
import NavFilters from 'components/NavFilters'
import Layout from 'Layouts/Layout'
import { getGenres, getGenresFile, writeFile } from 'lib/files'
import RandomData from 'components/RamdomData'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import Carrousel from 'components/Carrousel'
import Card from 'components/Card'
import { ButtonLink } from 'components/Button'
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
}

const Index = ({ mangaGenres, animeGenres, topAnime, topManga }: IProps) => {
  return (
    <Layout title='Wiki Anime'>
      <>
        <div className='flex justify-center my-4'>
          <div className='flex w-fit text-xl'>
            <Link href='/anime'>
              <a className='rounded-tl-2xl rounded-bl-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Anime</a>
            </Link>
            <Link href='/manga'>
              <a className='rounded-tr-2xl rounded-br-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Manga</a>
            </Link>

          </div>
        </div>
        <Card className='flex justify-between items-center'>
          <>
            <h2>Top anime</h2>
            <ButtonLink href={'/anime/top'}><>See top anime</></ButtonLink>
          </>
        </Card>
        <Carrousel type='anime' data={topAnime?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
        <Card className='flex justify-between items-center'>
          <>
            <h2>Top manga</h2>
            <ButtonLink href={'/$manga/top'}><>See top manga</></ButtonLink>
          </>
        </Card>
        <Carrousel type='manga' data={topManga?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />

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
    const { animeGenresFileJSON, mangaGenresFileJSON, error } = await getGenresFile('./data')
    const topAnime = await GET_ANIME_MANGA_TOP({ type: 'anime', querys: { limit: 10 } })
    const topManga = await GET_ANIME_MANGA_TOP({ type: 'manga', querys: { limit: 10 } })

    if (error) {
      const { animeGenres, mangaGenres } = await getGenres()
      await writeFile(animeGenres, './data/animeGenres.json')
      await writeFile(mangaGenres, './data/mangaGenres.json')

      return {
        props: {
          mangaGenres,
          animeGenres,
          topAnime: topAnime?.data,
          topManga: topManga?.data
        }
      }
    }

    return {
      props: {
        mangaGenres: animeGenresFileJSON,
        animeGenres: mangaGenresFileJSON,
        topAnime: topAnime?.data,
        topManga: topManga?.data
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Index
