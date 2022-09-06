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
import MainAnimePage from 'components/MainAnime.page'
import MainMangaPage from 'components/MainManga.page'
// import { GET_ANIME_SEASON_NOW } from 'services/GET_ANIME_SEASON_NOW'
// import { GET_ANIME_UPCOMING } from 'services/GET_ANIME_UPCOMING'
// import { ButtonLink } from 'components/Button'

interface Props {
  topAnime: IAnime[]
  type: 'anime' | 'manga'
}

const Home: FC<NextPage & Props> = ({ topAnime, type }: Props) => {
  // const router = useRouter()
  // console.log(router.query.type)
  // console.log(topAnime)
  return (
      <Layout>
        <>
            <Card className='w-fit mb-4'>
                <h1>{type?.toUpperCase()}</h1>
            </Card>
            <div className='flex flex-col gap-4'>
                <Card className='flex justify-between items-center'>
                    <>
                        <h2>Top {type}</h2>
                        <ButtonLink href={`/${type}/top`}><>See all {type}</></ButtonLink>
                    </>
                </Card>
                <Carrousel data={topAnime?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
                {type === 'anime' && <MainAnimePage />}
                {type === 'manga' && <MainMangaPage />}

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
    const type = context.params.type
    const topAnime = await GET_ANIME_MANGA_TOP({ type, querys: { limit: 10 } })
    return {
      props: {
        topAnime: topAnime?.data,
        type
      },
      revalidate: 60 * 60 * 24 // se genera la pagina cada 12 horas,
    }
  } catch (error) {
    console.error(error)
  }
}

export default Home
