import { IAnime } from 'interfaces/Anime'
import { URL_SEASON_NOW, URL_SEASON_UPCOMING } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import { ButtonLink } from './Button'
import Card from './Card'
import Carrousel from './Carrousel'
import ValidateAndRender from './ValidateAndRender'

interface IResponse {
  data: { data: IAnime[] }
}

const MainAnimePage = () => {
  const { data: animesSeasonNow }: IResponse = useFetch(URL_SEASON_NOW())
  const { data: animesUpcoming }: IResponse = useFetch(URL_SEASON_UPCOMING())

  return (
    <>
      <ValidateAndRender dataToValidate={[animesSeasonNow?.data?.length]}>
        <>
          <Card className='flex justify-between items-center'>
            <>
              <h2>Top this season</h2>
              <ButtonLink href={'/anime/season/now'}>See season</ButtonLink>
            </>
          </Card>
          <Carrousel data={animesSeasonNow?.data?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
        </>
      </ValidateAndRender>

      {animesUpcoming &&
        <>
          <Card className='flex justify-between items-center'>
            <>
              <h2>Top animes upcoming</h2>
              <ButtonLink href='/anime/season/upcoming'>See upcoming</ButtonLink>
            </>
          </Card>
          <Carrousel data={animesUpcoming?.data?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
        </>
      }
    </>
  )
}

export default MainAnimePage
