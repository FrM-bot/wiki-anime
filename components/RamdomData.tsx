import { IAnime } from 'interfaces/Anime'
import { IManga } from 'interfaces/Manga'
import { useState } from 'react'
import { Button, ButtonLink } from './Button'
import { CardText } from './Cards'
// import ImageComponent from './Image'

const GET_RANDOM = async ({ type }: { type: 'anime' | 'manga' }) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/random/${type}`)
    const randomData = await response.json()
    return randomData?.data
  } catch (error) {
    console.error(error)
  }
}

const RamdomData = () => {
  const [manga, setManga] = useState<IManga>()
  const [anime, setAnime] = useState<IAnime>()

  const getRandomAnime = () => {
    GET_RANDOM({ type: 'anime' }).then(setAnime)
  }
  const getRandomManga = () => {
    GET_RANDOM({ type: 'manga' }).then(setManga)
  }
  console.log(manga, anime)
  return (
        <div className='grid sm:grid-cols-[minmax(80px,300px)_minmax(80px,300px)] gap-4'>
            <div className='flex flex-col gap-4 justify-center items-center'>

                <div>

                    <Button props={{ onClick: () => getRandomAnime() }}>
                        Random anime
                    </Button>
                </div>
                {
                    anime &&
                    <ButtonLink href={`/anime/${anime?.mal_id}`}>
                        <div className='flex flex-col gap-3'>
                            <img className='rounded' src={anime?.images?.webp?.large_image_url || ''} alt={anime?.title || ''} />
                            <CardText>
                                <h2>{anime?.title}</h2>
                            </CardText>
                            <div className='flex gap-2'>
                                <CardText>
                                    <span>{anime?.type}</span>
                                </CardText>
                                <CardText>

                                    <span>{anime?.score}</span>
                                </CardText>
                                <CardText>
                                    <span>{anime?.favorites}</span>
                                </CardText>

                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    anime?.genres?.map(genre => (<CardText key={genre?.mal_id}><span>{genre?.name}</span></CardText>))
                                }
                            </div>
                        </div>
                    </ButtonLink>
                }
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <div>
                    <Button props={{ onClick: () => getRandomManga() }}>
                        Random manga
                    </Button>
                </div>
                {
                    manga &&
                    <ButtonLink href={`/manga/${manga?.mal_id}`}>
                        <div className='flex flex-col gap-3'>
                            <img className='rounded' src={manga?.images?.webp?.large_image_url || ''} alt={manga?.title || ''} />
                            <CardText>
                                <h2>{manga?.title}</h2>
                            </CardText>
                            <div className='flex gap-2'>
                                <CardText>
                                    <span>{manga?.type}</span>
                                </CardText>
                                <CardText>

                                    <span>{manga?.score}</span>
                                </CardText>
                                <CardText>
                                    <span>{manga?.favorites}</span>
                                </CardText>

                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    manga?.genres?.map(genre => (<CardText key={genre?.mal_id}><span>{genre?.name}</span></CardText>))
                                }
                            </div>
                        </div>
                    </ButtonLink>
                }
            </div>
        </div>
  )
}

export default RamdomData
