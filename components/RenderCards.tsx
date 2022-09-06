// import { IAnime } from 'interfaces/Anime'
// import Card from './Card'
// import { ButtonLink } from './Button'
import { useState, useEffect, ReactElement } from 'react'
import { CardMedium } from 'components/Cards'
import { IPagination } from 'interfaces/Global'
import Pagination from './Pagination'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'
import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import Loader from './Loader'
interface IProps {
  data: IAnime[] | IManga[]
  typeCard?: 'small' | 'medium'
  pagination: IPagination
  isLoading?: boolean
  type?: 'anime' | 'manga'
}
// Arreglar el error con los tipos de episodes y volumen
const ContainerRender = ({ children }: { children: ReactElement }) => {
  return (
    <div className='w-full xl:columns-4 lg:columns-3 sm:columns-3 columns-2 gap-4 py-4 min-h-[60vw]'>
      {
        children
      }
    </div>
  )
}

const RenderCards = ({ data, typeCard, pagination, isLoading, type }: IProps) => {
  const router = useRouter()
  const [newData, setNewData] = useState<(IAnime[] | IManga[])>()
  useEffect(() => setNewData(data), [data])

  if (isLoading) {
    return <div className='min-h-[60vw] w-full grid place-content-center'><Loader /></div>
  }

  if (typeCard === 'small') {
    return (
      <>
        <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
          {
            newData?.map((animeManga: IAnime | IManga) => (
              <div key={animeManga.mal_id} className='grid place-content-center'>
                  <ButtonLink href={`/${type ?? router?.query?.type}/${animeManga?.mal_id}`}>
                    <div className='relative lg:w-48 w-40'>
                      {
                        animeManga?.rank &&
                        <div className='absolute top-0 w-full flex justify-end p-1'>
                          <span className='bg-tertiary/60 p-1 h-fit rounded'>{animeManga?.rank}</span>
                        </div>
                      }
                      <img loading='lazy' src={animeManga.images.webp.image_url} alt={animeManga.title} className='aspect-[5/8]' />
                      <div className='absolute left-0 bottom-0 w-full bg-tertiary/80 p-[0.15rem]'>
                        <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{animeManga.title}</h2>
                        <p className='text-[0.7rem] flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                          <span>{animeManga?.type}</span>
                          { animeManga?.episodes && <span>({animeManga?.episodes})</span> }
                          { animeManga?.volumes && <span>({animeManga.volumes})</span> }
                          <span>{animeManga?.score || 'N/A'}</span>
                          <span>{animeManga?.members || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  </ButtonLink>
              </div>
            ))
          }
        </div>
        <Pagination currentPage={pagination?.current_page} lastPage={pagination?.last_visible_page} />
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
              <CardMedium episodes={animeManga.episodes} genres={animeManga.genres} image_url={animeManga.images.webp.image_url} mal_id={animeManga.mal_id} score={animeManga.score} title={animeManga.title} type={animeManga.type} volumes={animeManga?.volumes} key={animeManga.mal_id} />
            ))
          }
        </>
      </ContainerRender>
      <Pagination currentPage={pagination.current_page} lastPage={pagination.last_visible_page} />
    </>
  )
}

export default RenderCards
