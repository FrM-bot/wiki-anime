// import { IAnime } from 'interfaces/Anime'
// import Card from './Card'
// import { ButtonLink } from './Button'
import { useState, useEffect, ReactElement } from 'react'
import { CardMedium } from 'components/Cards'
import { IAnimeManga, IPagination } from 'interfaces/Global'
import Pagination from './Pagination'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'
import { setFormat } from 'utils/useDateFormat'
import Card from './Card'

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
        <div className='flex flex-col gap-2'>
          {
            newData?.map((animeManga) => (
              <div key={animeManga.mal_id} className='grid md:grid-cols-[minmax(40px,70px)_minmax(100px,200px)_1fr_60px] gap-2 py-2'>
                <Card className='grid place-content-center h-fit'>
                  <span>{animeManga.rank}</span>
                </Card>
                <div className='grid place-content-center'>
                  <ButtonLink href={`/${router.query.type}/${animeManga.mal_id}`}>
                    <img src={animeManga.images.webp.image_url} alt={animeManga.title} className='h-72 md:h-44 bg-cover' />
                  </ButtonLink>
                </div>
                <div className='h-full flex items-start flex-col gap-2'>
                  <ButtonLink href={`/${router.query.type}/${animeManga.mal_id}`}>
                    <>
                      <h2>{animeManga.title}</h2>
                    </>
                  </ButtonLink>
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
                {
                  animeManga?.score &&
                  <div>
                    <Card className='grid place-content-center'>
                      <span>{animeManga.score}</span>
                    </Card>
                  </div>
                }
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
