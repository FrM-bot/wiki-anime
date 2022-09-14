import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
import SeasonSearch from 'components/SeasonSearch'
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
  console.log()
  return (
        <Layout>
            <div className='flex flex-col gap-4'>
              <SeasonSearch />
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
  try {
    const page = Number(context?.query?.page)
    const animesSeasonNow = await GET_ANIME_SEASON_NOW({ page })

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
