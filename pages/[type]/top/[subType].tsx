import RenderCards from 'components/RenderCards'
import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next/types'
import { validateTypeAnime, validateTypeAnimeManga, validateTypeManga } from 'utils/validators'

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

export const getServerSideProps: GetServerSideProps = async ({ res, query, resolvedUrl }) => {
  const page = Number(new URLSearchParams(resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = validateTypeAnimeManga(query.type)
  const subType = type === 'anime' ? validateTypeAnime(query?.subType) : validateTypeManga(query?.subType)
  try {
    const topAnime = await GET_ANIME_MANGA_TOP({ type, querys: { page, type: subType } })
    if (!topAnime?.data) {
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
        data: topAnime?.data || [],
        pagination: topAnime?.pagination,
        type
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: []
      }
    }
  }
}

export default TopPage
