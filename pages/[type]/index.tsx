import type { GetServerSideProps, NextPage } from 'next'
import Card from 'components/Card'
import { IAnime } from 'interfaces/Anime'
import type { FC } from 'react'
import Carousel from 'components/Carousel'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import Link from 'components/Link'
import MainAnimePage from 'components/MainAnime.page'
import MainMangaPage from 'components/MainManga.page'
import { validateTypeAnimeManga } from 'utils/validators'
import { IManga } from 'interfaces/Manga'

interface Props {
  topAnimeManga: IAnime[] | IManga[]
  type: 'anime' | 'manga'
}

const Home: FC<NextPage & Props> = ({ topAnimeManga, type }: Props) => {
  return (
    <Layout title={type}>
      <>
        <Card className='w-full text-center mb-4'>
          <h1>{type?.toUpperCase()}</h1>
        </Card>
        <div className='flex flex-col gap-4'>
          <Card className='flex justify-between items-center'>
            <>
              <h2>Top {type}</h2>
              <Link href={`/${type}/top`}>
                <>
                  See all {type}
                </>
              </Link>
            </>
          </Card>
        <Carousel data={topAnimeManga?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />

          {type === 'anime' && <MainAnimePage />}
          {type === 'manga' && <MainMangaPage />}

        </div>
      </>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const type = validateTypeAnimeManga(query?.type)
    const topAnimeManga = await GET_ANIME_MANGA_TOP({ type, querys: { limit: 10 } })
    if (!topAnimeManga?.data) {
      return {
        notFound: true
      }
    }
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    return {
      props: {
        topAnimeManga: topAnimeManga?.data,
        type
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Home
