import { Button } from 'components/Button'
import RenderCards from 'components/RenderCards'
import { IResponse } from 'interfaces/Anime'
import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { useRouter } from 'next/router'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
// import { useEffect, useState } from 'react'
import { useState, useEffect } from 'react'

interface IProps {
  data: IAnimeManga[]
    pagination: {
      last_visible_page: number,
      has_next_page: boolean,
      current_page: number,
      items: { count: number, total: number, per_page: number }
    }
  }
const TopPage = ({ data, pagination }: IProps) => {
  const router = useRouter()
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
        <>
        <div className='my-4'>
            <Button onClick={() => router.back()}>
                Back
            </Button>
        </div>
            <RenderCards data={data} typeCard='small' pagination={pagination} />
        </>
    </Layout>
  )
}

interface IPropsServerSide {
    query: { type: string }
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
  console.log(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page'))
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  try {
    const top: IResponse = await GET_ANIME_MANGA_TOP({ page, type: context.query.type })
    // const animesSeasonNow: IResponse = await GET_ANIME_SEASON_NOW({ page: 1 })
    // const animesSeasonUpcoming: IResponse = await GET_ANIME_SEASON_UPCOMING({ page: 1 })
    // const topAnime = await GET_ANIME_TOP({ page: 1, type: params.type })
    // console.log(animesSeasonNow)
    console.log(top.pagination)
    return {
      props: {
        data: top?.data || [],
        pagination: top.pagination
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
