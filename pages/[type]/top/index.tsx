import RenderCards from 'components/RenderCards'
import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_ANIME_MANGA_TOP } from 'services/GET_ANIME_MANGA_TOP'
import Card from 'components/Card'
import type { GetServerSideProps } from 'next'

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
  return (
    <Layout title={`Top ${type}`}>
      <div className='flex flex-col gap-4'>
        <Card>
          <h1>Top {type}</h1>
        </Card>
        <RenderCards type={type} data={data || []} sizeCard='small' pagination={pagination} />
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query, resolvedUrl }) => {
  const page = Number(new URLSearchParams(resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = query?.type === 'anime' ? 'anime' : 'manga'
  try {
    const top = await GET_ANIME_MANGA_TOP({ type, querys: { page } })
    if (!top?.data) {
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
        data: top?.data || [],
        pagination: top?.pagination,
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
