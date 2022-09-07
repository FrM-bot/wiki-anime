import RenderCards from 'components/RenderCards'
import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
// import { useEffect, useState } from 'react'
import { useState, useEffect } from 'react'
import Card from 'components/Card'

interface IProps {
  data: IAnimeManga[]
  pagination: {
    last_visible_page: number,
    has_next_page: boolean,
    current_page: number,
    items: { count: number, total: number, per_page: number }
  }
  type: 'anime' | 'manga'
}
const TopPage = ({ data, pagination, type }: IProps) => {
  // const [data, setData] = useState()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // useEffect(() => {
  //   GET_ANIME_MANGA_TOP({ page: 1, type: router.query.type || 'anime' }).then(res => setData(res.data))
  //   const status = new URLSearchParams(window.location.search).get(
  //     'page'
  //   )
  //   console.log({ status })
  // }, [router.query.type])

  return mounted && (
    <Layout>
      <div className='flex flex-col gap-4'>
        <Card>
          <h1>Top {type}</h1>
        </Card>
        <RenderCards data={data || []} sizeCard='small' pagination={pagination} />
      </div>
    </Layout>
  )
}

interface IPropsServerSide {
  query: { type: 'anime' | 'manga', filterType: string }
  resolvedUrl: string
}

// export async function getStaticPaths () {
//   return {
//     paths: [{ params: { type: 'anime' } }, { params: { type: 'manga' } }],
//     fallback: false // can also be true or 'blocking'
//   }
// }

export const getServerSideProps = async (context: IPropsServerSide) => {
  // console.log(context.params.type)
  // console.log(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page'), context.query.type.replace(' ', ''))
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = context.query.type
  const filterType = context?.query?.filterType
  console.log({ filterType, page }, context?.query?.filterType)
  try {
    const top = await GET_ANIME_MANGA_TOP({ type, querys: { page } })
    // const animesSeasonNow: IResponse = await GET_ANIME_SEASON_NOW({ page: 1 })
    // const animesSeasonUpcoming: IResponse = await GET_ANIME_SEASON_UPCOMING({ page: 1 })
    // const topAnime = await GET_ANIME_TOP({ page: 1, type: params.type })
    // console.log(animesSeasonNow)
    // console.log(top.data)
    return {
      props: {
        data: top?.data || [],
        pagination: top?.pagination,
        type
      }
      // revalidate: 60 * 60 * 12 // se genera la pagina cada 12 horas,
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: []
      },
      revalidate: 60 * 60 * 12 // se genera la pagina cada 12 horas,
    }
  }
}

export default TopPage
