import RenderCards from 'components/RenderCards'
import { IAnimeManga, IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { SERACH } from 'services/SEARCH'

interface IProps {
  data: IAnimeManga[]
  pagination: IPagination
  type: 'anime' | 'manga'
}

const Genere = ({ data, pagination, type }: IProps) => {
  return (
    <Layout title={`Genre ${type}`}>
      <RenderCards data={data || []} pagination={pagination} />
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = context?.query?.type
  const genres = context?.query?.genreID
  try {
    const genreAnime = await SERACH({ type, querys: { page, genres, type } })
    if (!genreAnime?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        data: genreAnime?.data || [],
        pagination: genreAnime?.pagination,
        type
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Genere
