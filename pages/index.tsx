import NavFilters from 'components/NavFilters'
// import { GenresContext } from 'context/Genres.context'
import Layout from 'Layouts/Layout'
import { getGenres, getGenresFile, writeFile } from 'lib/files'
import { GetStaticProps } from 'next'
// import { GetStaticProps } from 'next'
import Link from 'next/link'
import RandomData from 'components/RamdomData'
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

const Index = ({ mangaGenres, animeGenres }: IProps) => {
  // const handlerShowNotification = () => {
  //   Notification.requestPermission().then(perm => {
  //     if (perm === 'granted') {
  //       const notification = new Notification('Example', {
  //         body: 'Test',
  //         data: { hello: 'wordl' }
  //       })
  //       notification.addEventListener('error', e => {
  //         alert('eroor')
  //       })
  //     }
  //   })
  // }
  // console.log(mangaGenres, animeGenres)
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
    console.log('files')
    if (error) {
      const { animeGenres, mangaGenres } = await getGenres()
      await writeFile(animeGenres, './data/animeGenres.json')
      await writeFile(mangaGenres, './data/mangaGenres.json')
      console.log('no files')

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

export default Index
