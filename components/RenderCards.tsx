import { useState, useEffect } from 'react'
import { CardMedium } from './Cards'
import { IPagination } from 'interfaces/Global'
import Pagination from './Pagination'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'
import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import Loader from './Loader'
import { TypesSearch } from 'utils/types'
import { ICharacter } from 'interfaces/Character'
import ValidateAndRender from './ValidateAndRender'
import Card from './Card'
import StartIcon from 'icons/StartIcon'
import UsersIcon from 'icons/UsersIcon'

interface IProps {
  data: any[]
  sizeCard?: 'small' | 'medium'
  pagination: IPagination
  isLoading?: boolean
  type?: TypesSearch
}
// Arreglar el error con los tipos de episodes y volumen

const initialStatePagination = { current_page: 1, has_next_page: false, last_visible_page: 1, items: { count: 0, per_page: 0, total: 0 } }

const RenderCards = ({ data, sizeCard, pagination, isLoading, type }: IProps) => {
  const router = useRouter()
  const [newData, setNewData] = useState<any[]>()
  useEffect(() => setNewData(data), [data])

  if (isLoading) {
    return <div className='min-h-[60vw] w-full grid place-content-center'><Loader /></div>
  }

  if (sizeCard === 'small') {
    return (
      <>
        <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
          {
            newData?.map((animeManga: IAnime | IManga) => (
              <div key={animeManga.mal_id} className='grid place-content-center'>
                <ButtonLink href={`/${type ?? router?.query?.type}/${animeManga?.mal_id}`} className='sm:p-1 p-0'>
                  <div className='relative lg:w-48'>
                    {
                      animeManga?.rank &&
                      <div className='absolute top-0 w-full flex justify-end p-1'>
                        <span className='bg-tertiary/60 p-1 h-fit rounded'>{animeManga?.rank}</span>
                      </div>
                    }
                    <img loading='lazy' src={animeManga?.images.webp.image_url} alt={animeManga?.title} className='aspect-[5/8] min-w-[180px]' />
                    <div className='absolute left-0 bottom-0 w-full bg-tertiary/80 p-[0.15rem]'>
                      <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold'>{animeManga.title}</h2>
                      <div className='text-[0.68rem] font-light flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                        <span>{animeManga?.type}{animeManga?.episodes && (`(${animeManga?.episodes})`)}{animeManga?.volumes && (`(${animeManga?.volumes})`)}</span>
                        <span className='flex gap-[2px] items-center'><StartIcon props={{ style: { width: 14, height: 14 } }} /> {animeManga?.score || 'N/A'}</span>
                        <span className='flex gap-[2px] items-center'><UsersIcon props={{ style: { width: 14, height: 14 } }}/> {animeManga?.members || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </ButtonLink>
              </div>
            ))
          }
        </div>
        <Pagination currentPage={pagination?.current_page || initialStatePagination?.current_page} lastPage={pagination?.last_visible_page || initialStatePagination?.last_visible_page} />
      </>
    )
  }

  // console.log(pagination)

  return (
    <>
      {
       (type === 'anime' || type === 'manga' || !type) && (

          <div className='w-full xl:columns-4 lg:columns-3 sm:columns-3 columns-2 gap-4 py-4 min-h-[60vw]'>
            <>
              {
                newData?.map((animeManga) => (
                  <CardMedium episodes={animeManga?.episodes} genres={animeManga?.genres} image_url={animeManga?.images?.webp?.image_url} mal_id={animeManga?.mal_id} score={animeManga?.score} title={animeManga?.title} type={animeManga?.type} volumes={animeManga?.volumes} key={animeManga?.mal_id} />
                ))
              }
            </>
          </div>
       )
      }
      {
        type === 'character' && (<div className='w-full xl:columns-4 lg:columns-3 sm:columns-3 columns-2 gap-4 py-4 min-h-[60vw]'>
          {
            newData?.map((character: ICharacter) => (
              <Card key={character?.mal_id} className='inline-block m-2 hover:shadow duration-300 sm:p-1'>
                <div className='flex flex-col'>
                  <ButtonLink href={`/character/${character?.mal_id}`}>
                    <div className='rounded-lg grid place-content-center overflow-hidden relative'>
                      <img loading='lazy' className='hover:scale-110 duration-300 w-full' src={character?.images?.webp?.image_url} alt={character?.name} />
                    </div>
                  </ButtonLink>
                  <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                    <ButtonLink href={`/character/${character?.name}`}>
                      <>
                        {character?.name}
                      </>
                    </ButtonLink>
                    <ValidateAndRender title='favorites' data={character?.favorites} />
                  </div>
                </div>
              </Card>
            ))
          }
        </div>)
      }
      <Pagination currentPage={pagination?.current_page || initialStatePagination?.current_page} lastPage={pagination?.last_visible_page || initialStatePagination?.last_visible_page} />
    </>
  )
}

export default RenderCards
