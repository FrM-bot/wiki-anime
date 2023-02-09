import Button from 'components/Button'
import { IPagination } from 'interfaces/Global'
import { useState } from 'react'
import { CardText } from 'components/Cards'
import ValidateAndRender from 'components/ValidateAndRender'
import { useFetch } from 'utils/useFetch'
import LoadingComponent from 'components/LoadingComponent'
import Card from 'components/Card'
import { IEpisode } from '../pages/[type]/[id]'

export const EpisodesAnime = ({ mal_id }: { mal_id: number; }) => {
  const [pageEpisode, setPageEpisode] = useState(1)
  const { data: episodes, isError, isLoading }: { data: { data: IEpisode[]; pagination: IPagination; }; isError: any; isLoading: boolean; } = useFetch(`https://api.jikan.moe/v4/anime/${mal_id}/videos/episodes?page=${pageEpisode}`)
  const handlerNextPage = () => {
    episodes?.pagination?.has_next_page && setPageEpisode(prev => prev + 1)
  }
  const handlerPreviousPage = () => {
    pageEpisode > 1 && setPageEpisode(prev => prev - 1)
  }
  return (
    <LoadingComponent isError={isError} isLoading={isLoading}>
      <>
        <div className='grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2'>
          {episodes?.data?.map(episode => (
            <Card key={episode?.mal_id} className='hover:shadow duration-300'>

              <a href={episode?.url} target="blank" className='w-full'>
                <div className='flex gap-2 flex-col justify-start'>
                  <ValidateAndRender dataToValidate={[episode?.images?.jpg?.image_url]}>
                    <img src={episode?.images?.jpg?.image_url} alt={episode?.title} />
                  </ValidateAndRender>
                  <div className='flex flex-col gap-2'>
                    <CardText>
                      <h4>{episode?.episode}</h4>
                    </CardText>
                    <p className='[display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]'>{episode?.title}</p>
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </div>
        <div className='flex gap-2 justify-center'>
          {pageEpisode > 1 &&
            <Button props={{ onClick: () => handlerPreviousPage() }}>Next</Button>}
          {episodes?.pagination?.has_next_page &&
            <Button props={{ onClick: () => handlerNextPage() }}>Previous</Button>}
        </div>
      </>
    </LoadingComponent>
  )
}
