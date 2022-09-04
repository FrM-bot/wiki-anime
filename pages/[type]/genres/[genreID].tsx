import RenderCards from 'components/RenderCards'
import { IAnimeManga, IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { SERACH } from 'services/SEARCH'

interface IProps {
  data: IAnimeManga[]
  pagination: IPagination
}

const Genere = ({ data, pagination }: IProps) => {
  console.log(data, pagination)
  return (
    <Layout>
      <RenderCards data={data || []} pagination={pagination} />
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  // console.log(context.params.type)
  // console.log(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page'), context.query.type.replace(' ', ''))
  const page = Number(new URLSearchParams(context.resolvedUrl.split('/').at(-1)?.split('?').at(-1)).get('page')) || 1
  const type = context.query.type
  const genres = context?.query.genreID
  try {
    const genreAnime = await SERACH({ type, querys: { page, genres } })
    // const animesSeasonNow: IResponse = await GET_ANIME_SEASON_NOW({ page: 1 })
    // const animesSeasonUpcoming: IResponse = await GET_ANIME_SEASON_UPCOMING({ page: 1 })
    // const topAnime = await GET_ANIME_TOP({ page: 1, type: params.type })
    // console.log(animesSeasonNow)
    // console.log(top.data)
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

export default Genere
