import RenderCards from 'components/RenderCards'
import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { useState, useEffect } from 'react'

interface IProps {
  data: IAnimeManga[]
    pagination: {
      last_visible_page: number,
      has_next_page: boolean,
      current_page: number,
      items: { count: number, total: number, per_page: number }
    },
    type: 'anime' | 'manga'
  }
const TopPage = ({ data, pagination, type }: IProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && (
    <Layout title={`Top ${type}`}>

      <RenderCards data={data} sizeCard='small' pagination={pagination} />

    </Layout>
  )
}

interface IPropsServerSide {
    query: { type: 'anime' | 'manga', filter: 'upcoming' | 'bypopularity' | 'favorite'
  }
    resolvedUrl: string
  }

export const getServerSideProps = async (context: IPropsServerSide) => {
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = context.query.type
  const filter = context?.query?.filter
  try {
    const topAnime = await GET_ANIME_MANGA_TOP({ type, querys: { page, filter } })
    if (!topAnime?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        data: topAnime?.data || [],
        pagination: topAnime?.pagination,
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
