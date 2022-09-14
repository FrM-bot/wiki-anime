import { ICharacter } from 'interfaces/Character'
import { URL_CHARACTERS_TOP } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import { ButtonLink } from './Button'
import Card from './Card'
import Carrousel from './Carrousel'
interface IResponse {
  data: { data: ICharacter[] }
}

const MainMangaPage = () => {
  const { data }: IResponse = useFetch(URL_CHARACTERS_TOP({ querys: { page: 1 } }))
  console.log({ data })
  return (
    <div>
      <Card className='flex justify-between items-center'>
            <>
              <h2>Top characters</h2>
              <ButtonLink href='/character/top'>See all characters</ButtonLink>
            </>
          </Card>
      <Carrousel type='character' data={data?.data?.map(({ images, name, mal_id, favorites }) => ({ images, title: name, mal_id, topRightgDataCard: favorites }))} />
    </div>
  )
}

export default MainMangaPage
