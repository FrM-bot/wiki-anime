import { ICharacter } from 'interfaces/Character'
import React from 'react'
import { URL_CHARACTERS_TOP } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import { ButtonLink } from './Button'
import Card from './Card'
import Carrousel from './Carrousel'
// import { GET_CHARACTERS_TOP } from 'services/GET_CHARACTERS_TOP'

interface IResponse {
  data: { data: ICharacter[] }
  // animesUpcoming: IAnime[]
}

const MainMangaPage = () => {
  const { data }: IResponse = useFetch(URL_CHARACTERS_TOP({ querys: { page: 1 } }))
  console.log({ data })
  return (
    <div>
      {/* {
        data?.data?.map(character => (<img className='max-h-40' src={character?.images?.webp?.image_url} />))
      } */}
      <Card className='flex justify-between items-center'>
            <>
              <h2>Top characters</h2>
              <ButtonLink href='/anime/season/upcoming'>See all characters</ButtonLink>
            </>
          </Card>
      <Carrousel type='character' data={data?.data?.map(({ images, name, mal_id, favorites }) => ({ images, title: name, mal_id, topRightgDataCard: favorites }))} />
    </div>
  )
}

// export const getStaticProps = async () => {
//   try {
//     // const type = context.params.type
//     const topCharactersTop = await GET_CHARACTERS_TOP({ querys: { limit: 10 } })
//     // const animesSeasonNow = await GET_ANIME_SEASON_NOW({ page: 1 })
//     // const animesUpcoming = await GET_ANIME_UPCOMING({ page: 1 })
//     return {
//       props: {
//         topCharactersTop
//       },
//       revalidate: 60 * 60 * 24 // se genera la pagina cada 12 horas,
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

export default MainMangaPage
