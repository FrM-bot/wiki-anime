import type { NextPage } from 'next'
// import { useRouter } from 'next/router'
import Card from '../../components/Card'
import { IAnime } from 'interfaces/Anime'
// import { IResponse } from 'interfaces/Global'
import type { FC } from 'react'
import Carrousel from 'components/Carrousel'
// import News from 'components/News'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { ButtonLink } from 'components/Button'
import { GET_ANIME_SEASON_NOW } from 'services/GET_ANIME_SEASON_NOW'
import { GET_ANIME_UPCOMING } from 'services/GET_ANIME_UPCOMING'
// import { ButtonLink } from 'components/Button'

interface Props {
  animesSeasonNow: IAnime[]
  animesUpcoming: IAnime[]
  topAnime: IAnime[]
}

const Home: FC<NextPage & Props> = ({ topAnime, animesSeasonNow, animesUpcoming }: Props) => {
  // const router = useRouter()
  // console.log(router.query.type)
  // console.log(topAnime)
  return (
      <Layout>
        {/* <main className='px-4 my-4 min-h-[80vh]'>
          <Card>
            <div className='flex justify-between'>
              <h3>
                Top {router.query.type}
              </h3>
            <ButtonLink href={`/${router.query.type}/top`}>
                <>
                  View all {router.query.type}
                </>
            </ButtonLink>
            </div>
          </Card>
          <Carrousel animes={topAnime?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
          <Card>
            <div className='flex justify-between'>
            <h3 className='grid place-content-center'>
              This season
            </h3>
            <button className='shadow-lg px-4 py-2 border-[1px] border-[#11111184] rounded-lg shadow-black/50 duration-300'>
              More
            </button>
            </div>
          </Card>
          <Carrousel animes={seasonNow?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
          <Card>
          <div className='flex justify-between'>

          <h3 className='grid place-content-center'>

              Top upcoming
            </h3>
            <button className='shadow-lg px-4 py-2 border-[1px] border-[#11111184] rounded-lg shadow-black/50 duration-300'>
              More
            </button>
            </div>
          </Card>
          <Carrousel animes={seasonUpcoming?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
        </main> */}
        <>
            <Card className='w-fit mb-4'>
                <h1>Anime</h1>
            </Card>
            <div className='flex flex-col gap-4'>
                <Card className='flex justify-between items-center'>
                    <>
                        <h2>Top anime</h2>
                        <ButtonLink href='/anime/top'>See all</ButtonLink>
                    </>
                </Card>
                <Carrousel animes={topAnime?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
                <Card className='flex justify-between items-center'>
                    <>
                        <h2>Top this season</h2>
                        <ButtonLink href={'/anime/season/now'}>See all</ButtonLink>
                    </>
                </Card>
                <Carrousel animes={animesSeasonNow?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
                <Card className='flex justify-between items-center'>
                    <>
                        <h2>Top animes upcoming</h2>
                        <ButtonLink href='/anime/season/upcoming'>See all</ButtonLink>
                    </>
                </Card>
                <Carrousel animes={animesUpcoming?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, score }))} />
            </div>
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

interface IContext {
  params: {
    type: 'manga' | 'anime'
   }
}

export const getStaticProps = async (context: IContext) => {
  try {
    const topAnime = await GET_ANIME_MANGA_TOP({ type: context.params.type, querys: { limit: 10 } })
    const animesSeasonNow = await GET_ANIME_SEASON_NOW({ page: 1 })
    const animesUpcoming = await GET_ANIME_UPCOMING({ page: 1 })
    return {
      props: {
        animesSeasonNow: animesSeasonNow?.data,
        animesUpcoming: animesUpcoming.data?.slice(0, 10) || [],
        topAnime: topAnime?.data,
        pagination: topAnime?.pagination
      },
      revalidate: 60 * 60 * 24 // se genera la pagina cada 12 horas,
    }
  } catch (error) {
    console.error(error)
  }
}

export default Home
