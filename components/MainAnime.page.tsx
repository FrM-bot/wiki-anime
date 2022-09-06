import { IAnime } from 'interfaces/Anime'
import { URL_SEASON_NOW, URL_SEASON_UPCOMING } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
// import React from 'react'
// import { GET_ANIME_SEASON_NOW } from 'services/GET_ANIME_SEASON_NOW'
// import { GET_ANIME_UPCOMING } from 'services/GET_ANIME_UPCOMING'
import { ButtonLink } from './Button'
import Card from './Card'
import Carrousel from './Carrousel'
import ValidateAndRender from './ValidateAndRender'

interface IResponse {
  data: { data: IAnime[] }
  // animesUpcoming: IAnime[]
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
              <ButtonLink href={'/anime/season/now'}>See all</ButtonLink>
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
              <ButtonLink href='/anime/season/upcoming'>See all</ButtonLink>
            </>
          </Card>
          <Carrousel data={animesUpcoming?.data?.map(({ images, title, mal_id, score }) => ({ images, title, mal_id, topRightgDataCard: score }))} />
        </>
      }
    </>
  )
}

// export const getStaticProps = async () => {
//   try {
//     const animesSeasonNow = await GET_ANIME_SEASON_NOW({ page: 1 })
//     const animesUpcoming = await GET_ANIME_UPCOMING({ page: 1 })
//     return {
//       props: {
//         animesSeasonNow: animesSeasonNow?.data,
//         animesUpcoming: animesUpcoming?.data || []
//       },
//       revalidate: 60 * 60 * 24 // se genera la pagina cada 12 horas,
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

export default MainAnimePage
