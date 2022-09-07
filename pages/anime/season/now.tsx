import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
import { IAnime } from 'interfaces/Anime'
import { IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import React from 'react'
import { GET_ANIME_SEASON_NOW } from 'services/GET_ANIME_SEASON_NOW'

interface IProps {
    data: IAnime[]
    pagination: IPagination
}

const SeasonNow = ({ data, pagination }: IProps) => {
  console.log(data, pagination)
  return (
        <Layout>
            <div className='flex flex-col gap-4'>
                <Card>
                    <h1>Seasonal Anime</h1>
                </Card>
                <RenderCards type='anime' sizeCard='small' data={data} pagination={pagination} />
            </div>
        </Layout>
  )
}

interface IContext {
    query: {
      page?: number
     }
  }

export const getServerSideProps = async (context: IContext) => {
  console.log(context.query.page, 'page')
  try {
    const page = Number(context?.query?.page)
    const animesSeasonNow = await GET_ANIME_SEASON_NOW({ page })
    // const topAnime = await GET_ANIME_TOP({ page: 1, type: params.type })

    // console.log(animesSeasonNow)
    return {
      props: {
        data: animesSeasonNow?.data,
        pagination: animesSeasonNow?.pagination
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default SeasonNow
