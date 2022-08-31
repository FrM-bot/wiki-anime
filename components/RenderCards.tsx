// import { IAnime } from 'interfaces/Anime'
// import Card from './Card'
// import { ButtonLink } from './Button'
import { useState, useEffect, ReactElement } from 'react'
import { CardMedium } from 'components/Cards'
import { IAnimeManga } from 'interfaces/Global'
import Pagination from './Pagination'
import { IPagination } from 'interfaces/Anime'

interface IProps {
  data: IAnimeManga[]
  typeCard?: 'small' | 'medium'
  pagination: IPagination
}

const ContainerRender = ({ children }: { children: ReactElement }) => {
  return (
    <div className='w-full columns-4 lg:columns-3 md:columns-2 sm:columns-2 gap-4'>
      {
        children
      }
    </div>
  )
}

const RenderCards = ({ data, typeCard, pagination }: IProps) => {
  const [newData, setNewData] = useState<IAnimeManga[]>()
  useEffect(() => setNewData(data), [data])

  if (typeCard === 'small') {
    return (
      <>
      <div className='flex flex-col'>
        {
          newData?.map((animeManga) => (
            <div key={animeManga.mal_id}>
              <img src={animeManga.images.webp.image_url} alt={animeManga.title} className='h-44' />
            </div>
          ))
        }
      </div>
      <Pagination currentPage={pagination.current_page} lastPage={pagination.last_visible_page} />
      </>
    )
  }

  console.log(pagination)

  return (
    <>
      <ContainerRender>
        <>
          {
            newData?.map((animeManga) => (
              <CardMedium episodes={animeManga.episodes} genres={animeManga.genres} image_url={animeManga.images.webp.image_url} mal_id={animeManga.mal_id} score={animeManga.score} title={animeManga.title} type={animeManga.type} volumes={animeManga.volumes} key={animeManga.mal_id} />
            ))
          }
        </>
      </ContainerRender>
      <Pagination currentPage={pagination.current_page} lastPage={pagination.last_visible_page} />
    </>
  )
}

export default RenderCards
