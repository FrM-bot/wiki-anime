import { ICharacter } from 'interfaces/Character'
import { URL_CHARACTERS_TOP } from 'services/endpoints'
import { useFetch } from 'utils/useFetch'
import Link from './Link'
import Card from './Card'
import Carousel from './Carousel'
interface IResponse {
  data: { data: ICharacter[] }
}

const MainMangaPage = () => {
  const { data }: IResponse = useFetch(URL_CHARACTERS_TOP({ querys: { page: 1 } }))
  return (
    <div>
      <Card className='flex justify-between items-center'>
            <>
              <h2>Top characters</h2>
              <Link href='/character/top'>See all characters</Link>
            </>
          </Card>
      <Carousel type='character' data={data?.data?.map(({ images, name, mal_id, favorites }) => ({ images, title: name, mal_id, topRightgDataCard: favorites }))} />
    </div>
  )
}

export default MainMangaPage
