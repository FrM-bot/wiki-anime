import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
import { IAnime } from 'interfaces/Anime'
import { IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_ANIME_UPCOMING } from 'services/GET_ANIME_UPCOMING'
interface IProps {
  data: IAnime[]
  pagination: IPagination
}
const SeasonUpcoming = ({ data, pagination }: IProps) => {
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
    const animesSeasonUpcoming = await GET_ANIME_UPCOMING({ page })
    return {
      props: {
        data: animesSeasonUpcoming?.data,
        pagination: animesSeasonUpcoming?.pagination
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default SeasonUpcoming
