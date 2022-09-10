
import NavFilters from 'components/NavFilters'
import Layout from 'Layouts/Layout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
interface IGenre {
  mal_id: number,
  name: string,
  url: string,
  count: number
}

interface IProps {
  mangaGenres: { data: IGenre[] }
  animeGenres: { data: IGenre[] }
}

const Index = ({ mangaGenres, animeGenres }: IProps) => {
  return (
    <Layout>
      <>
        <div className='flex justify-center'>
          <div className='flex w-fit text-xl'>
            <Link href='/anime'>
              <a className='rounded-tl-2xl rounded-bl-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Anime</a>
            </Link>
            <Link href='/manga'>
              <a className='rounded-tr-2xl rounded-br-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Manga</a>
            </Link>

          </div>
        </div>
        <div className='w-full flex justify-center'>
         <NavFilters mangaGenres={mangaGenres} animeGenres={animeGenres} />
        </div>
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [responseMangaGenres, responseAnimeGenres] = await Promise.all([fetch('https://api.jikan.moe/v4/genres/manga'), fetch('https://api.jikan.moe/v4/genres/anime')])
    const mangaGenres = await responseMangaGenres.json()
    const animeGenres = await responseAnimeGenres.json()

    return {
      props: {
        mangaGenres,
        animeGenres
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Index
