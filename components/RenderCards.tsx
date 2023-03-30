import { useState, useEffect } from 'react'
import { CardMedium, CardText } from './Cards'
import { IPagination } from 'interfaces/Global'
import Pagination from './Pagination'
import Link from './Link'
import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import Loader from './Loader'
import { TypesSearch } from 'utils/types'
import { ICharacter } from 'interfaces/Character'
import ValidateAndRender from './ValidateAndRender'
// import Card from './Card'
import StartIcon from '../icons/StartIcon'
import UsersIcon from '../icons/UsersIcon'
import { useRouter } from 'next/router'
import { setNumberFormat } from '@/utils/useNumberFormat'
import Grid from './Grid'
// import NextLink from 'next/link'

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
    return <div className='min-h-[60vh] w-full grid place-content-center'><Loader /></div>
  }

  if (sizeCard === 'small') {
    return (
      <>
        <Grid>
          <>
            {
              newData?.map((animeManga: IAnime | IManga) => (
                <div key={animeManga.mal_id} className='flex items-start justify-center h-fit'>
                  <Link className='mx-auto h-full' href={`/${type ?? router?.query?.type}/${animeManga?.mal_id}`} key={animeManga.mal_id}>
                    <div className='relative'>
                      <ValidateAndRender dataToValidate={[animeManga?.rank]}>
                        <div className='absolute top-0 w-full flex justify-end p-1'>
                          <span className='bg-tertiary/60 p-1 h-fit rounded'>{animeManga?.rank}</span>
                        </div>
                      </ValidateAndRender>
                      <img loading='lazy' src={animeManga?.images.webp.image_url} alt={animeManga?.title} className='h-full' />
                      <div className='absolute left-0 bottom-0 w-full bg-tertiary/80 p-[0.15rem]'>
                        <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-lg font-semibold'>{animeManga.title}</h2>
                        <div className='text-[0.68rem] text-lg font-light flex gap-1 whitespace-nowrap overflow-hidden text-ellipsis'>
                          <span className='flex gap-[2px] items-center'>{animeManga?.type}{animeManga?.episodes && (`(${animeManga?.episodes})`)}{animeManga?.volumes && (`(${animeManga?.volumes})`)}</span>
                          <span className='flex gap-[2px] items-center'><StartIcon props={{ style: { width: 14, height: 14 } }} /> {animeManga?.score ?? 'N/A'}</span>
                          <span className='flex gap-[2px] items-center'><UsersIcon props={{ style: { width: 14, height: 14 } }} /> {setNumberFormat({ value: animeManga?.members ?? 0 }) ?? 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </>
        </Grid>
        <Pagination currentPage={pagination?.current_page || initialStatePagination?.current_page} lastPage={pagination?.last_visible_page || initialStatePagination?.last_visible_page} />
      </>
    )
  }

  console.log(type)

  return (
    <>
      {
        (type === 'anime' || type === 'manga') && (
          <Grid>

            <>
              {
                newData?.map((animeManga) => (
                  // <NextLink key={animeManga.mal_id} href={`/${type}/${animeManga.mal_id}`}>
                    <CardMedium mainType={type} episodes={animeManga?.episodes} genres={animeManga?.genres} image_url={animeManga?.images?.webp?.image_url} mal_id={animeManga?.mal_id} score={animeManga?.score} title={animeManga?.title} type={animeManga?.type} volumes={animeManga?.volumes} key={animeManga?.mal_id} />
                  // </NextLink>
                ))
              }
            </>
          </Grid>
        )
      }
      {
        type === 'character' && (
          <Grid>
            <>
              {
                newData?.map((character: ICharacter) => (
                  // <div className='inline-block m-2' key={character.mal_id}>
                  <Link href={`/character/${character?.mal_id}`} key={character.mal_id}>
                    <div className='flex flex-col'>
                      <div className='rounded grid place-content-center overflow-hidden relative'>
                        <img loading='lazy' className='hover:scale-110 duration-300 w-full' src={character?.images?.webp?.image_url} alt={character?.name} />
                      </div>
                      <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                        <CardText>
                          {character?.name}
                        </CardText>
                        <ValidateAndRender title='favorites' data={character?.favorites} />
                      </div>
                    </div>
                  </Link>
                  // </div>
                ))
              }
            </>
          </Grid>)
      }
      <Pagination currentPage={pagination?.current_page || initialStatePagination?.current_page} lastPage={pagination?.last_visible_page || initialStatePagination?.last_visible_page} />
    </>
  )
}

export default RenderCards
