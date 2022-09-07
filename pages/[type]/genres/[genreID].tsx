import RenderCards from 'components/RenderCards'
import { IAnimeManga, IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { SERACH } from 'services/SEARCH'

interface IProps {
  data: IAnimeManga[]
  pagination: IPagination
}

const Genere = ({ data, pagination }: IProps) => {
  return (
    <Layout>
      <RenderCards data={data || []} pagination={pagination} />
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = context.query.type
  const genres = context?.query.genreID
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
        pagination: genreAnime?.pagination
      }
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

export default Genere
