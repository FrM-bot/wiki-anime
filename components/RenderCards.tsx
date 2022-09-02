// import { IAnime } from 'interfaces/Anime'
// import Card from './Card'
// import { ButtonLink } from './Button'
import { useState, useEffect, ReactElement } from 'react'
import { CardMedium } from 'components/Cards'
import { IAnimeManga, IPagination } from 'interfaces/Global'
import Pagination from './Pagination'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'
// import { setFormat } from 'utils/useDateFormat'
// import Card from './Card'

interface IProps {
  data: IAnimeManga[]
  typeCard?: 'small' | 'medium'
  pagination: IPagination
  isLoading?: boolean
}

const ContainerRender = ({ children }: { children: ReactElement }) => {
  return (
    <div className='w-full xl:columns-4 lg:columns-3 sm:columns-3 columns-2 gap-4 py-4'>
      {
        children
      }
    </div>
  )
}

const RenderCards = ({ data, typeCard, pagination, isLoading }: IProps) => {
  const router = useRouter()
  const [newData, setNewData] = useState<IAnimeManga[]>()
  useEffect(() => setNewData(data), [data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  console.log(newData)

  if (typeCard === 'small') {
    return (
      <>
        <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2'>
          {
            newData?.map((animeManga) => (
              <div key={animeManga.mal_id} className='flex flex-col items-center overflow-hidden '>
                 {/* <ButtonLink href={`/${router.query.type}/${animeManga.mal_id}`} className="overflow-hidden text-ellipsis">
                      <>
                      </>
                    </ButtonLink> */}
                {/* <div className='grid place-content-center'> */}
                  <ButtonLink href={`/${router.query.type}/${animeManga.mal_id}`}>
                    <div className='relative'>
                      {
                        animeManga.rank &&
                        <div className='absolute top-0 w-full flex justify-end p-1'>
                          <span className='bg-tertiary/60 p-1 h-fit rounded backdrop-blur-[1px]'>{animeManga.rank}</span>
                        </div>
                      }
                      <img src={animeManga.images.webp.image_url} alt={animeManga.title} className='lg:h-72 h-56 bg-cover' />
                      <div className='absolute bottom-0 w-full bg-tertiary/80 p-1'>
                        <h2 className='whitespace-nowrap overflow-hidden text-ellipsis text-sm'>{animeManga.title}</h2>
                        <p className='text-xs flex gap-1'>
                          <span>{animeManga?.type}</span>
                          { animeManga.episodes && <span>({animeManga.episodes})</span> }
                          { animeManga.volumes && <span>({animeManga.volumes})</span> }
                          <span>{animeManga?.score || 'N/A'}</span>
                          <span>{animeManga?.members || 'N/A'}</span>
                        </p>
                      </div>
                    </div>
                  </ButtonLink>
                {/* </div> */}
                {/* <div className='h-full flex items-start flex-col gap-2'>
                  <div className='md:m-0 m-auto'>

                  </div>
                  <p className='flex flex-col gap-2'>
                    <span>{animeManga.type} {animeManga.episodes && `(${animeManga.episodes} eps)`}  {animeManga.volumes && `(${animeManga.volumes} vol)`}</span>
                    {
                      animeManga?.published && <span>{animeManga?.published?.from && setFormat(animeManga.published.from)} {animeManga?.published?.to && `- ${setFormat(animeManga.published.to)}`}</span>
                    }
                    {
                      animeManga?.aired && <span>{animeManga?.aired?.from && setFormat(animeManga.aired.from)} {animeManga?.aired?.to && `- ${setFormat(animeManga.aired.to)}`}</span>
                    }
                    <span>{animeManga.members} members</span>
                  </p>
                </div>
                <Card className=''>
                  <span>{animeManga.rank}</span>
                </Card>
                {
                  animeManga?.score &&
                  <div className=''>
                      <span>{animeManga.score}</span>
                  </div>
                } */}
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
