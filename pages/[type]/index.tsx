import type { GetServerSideProps, NextPage } from 'next'
import Card from '../../components/Card'
import { IAnime } from 'interfaces/Anime'
import type { FC } from 'react'
import Carrousel from 'components/Carrousel'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { ButtonLink } from 'components/Button'
import MainAnimePage from 'components/MainAnime.page'
import MainMangaPage from 'components/MainManga.page'
import { validateTypeAnimeManga } from './[id]'

interface Props {
  topAnime: IAnime[]
  type: 'anime' | 'manga'
}

const Home: FC<NextPage & Props> = ({ topAnime, type }: Props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const type = validateTypeAnimeManga(context?.params?.type)
    const topAnime = await GET_ANIME_MANGA_TOP({ type, querys: { limit: 10 } })
    if (topAnime?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        topAnime: topAnime?.data,
        type
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Home
