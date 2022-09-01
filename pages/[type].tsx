import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import { IAnime } from 'interfaces/Anime'
import { IResponse } from 'interfaces/Global'
import { FC } from 'react'
import Carrousel from 'components/Carrousel'
// import News from 'components/News'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { GET_ANIME_SEASON_NOW } from 'services/GET_ANIME_SEASON_NOW'
import { GET_ANIME_UPCOMING } from 'services/GET_ANIME_UPCOMING'
import { ButtonLink } from 'components/Button'

interface Props {
  seasonNow: IAnime[]
  seasonUpcoming: IAnime[]
  topAnime: IAnime[]
}

const Home: FC<NextPage & Props> = ({ seasonNow, seasonUpcoming, topAnime }: Props) => {
  const router = useRouter()
  // console.log(router.query.type)
  return (
      <Layout>
        <main className='px-4 my-4 min-h-[80vh]'>
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
        </main>

      </Layout>
  )
}

interface IPropsStatic {
  params: { type: string }
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { type: 'anime' } }, { params: { type: 'manga' } }],
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps = async ({ params }: IPropsStatic) => {
  try {
    const [seasonNow, seasonUpcoming, topAnime]: IResponse[] = await Promise.all([GET_ANIME_SEASON_NOW({ page: 1 }), GET_ANIME_UPCOMING({ page: 1 }), GET_ANIME_MANGA_TOP({ page: 1, type: params.type })])
    // const animesSeasonNow: IResponse = await GET_ANIME_SEASON_NOW({ page: 1 })
    // const animesSeasonUpcoming: IResponse = await GET_ANIME_SEASON_UPCOMING({ page: 1 })
    // const topAnime = await GET_ANIME_TOP({ page: 1, type: params.type })

    // console.log(animesSeasonNow)
    return {
      props: {
        seasonNow: seasonNow.data?.slice(0, 9) || [],
        seasonUpcoming: seasonUpcoming.data?.slice(0, 9) || [],
        topAnime: topAnime.data?.slice(0, 9) || []
      },
      revalidate: 60 * 60 * 12 // se genera la pagina cada 12 horas,
    }
  } catch (error) {
    console.error(error)
  }
}

export default Home
