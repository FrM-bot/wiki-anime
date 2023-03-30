import StartIcon from 'icons/StartIcon'
import UsersIcon from 'icons/UsersIcon'
import { IAnime } from 'interfaces/Anime'
import { IGeneres, IImage } from 'interfaces/Global'
import { IManga } from 'interfaces/Manga'
import { FC, useState } from 'react'
import Button from './Button'
import Link from './Link'
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

interface IProps {
    type: 'anime' | 'manga'
    mal_id: number
    title: string
    images: IImage
    score: number
    favorites: number
    genres: IGeneres[]
}

const CardRamdomData: FC<IProps> = ({ type, mal_id, title, images, score, favorites, genres }) => {
  return (
        <Link href={`/${type}/${mal_id}`}>
        <div className='flex flex-col gap-3'>
            <img className='rounded w-auto' src={images?.webp?.large_image_url || ''} alt={title || ''} />
            <CardText>
                <h2>{title}</h2>
            </CardText>
            <div className='flex gap-2'>
                <CardText>
                    <span>{type}</span>
                </CardText>
                <CardText>
                    <span className='flex gap-1'><StartIcon /> {score || 'N/A'}</span>
                </CardText>
                <CardText>
                    <span className='flex gap-1'><UsersIcon /> {favorites || 0}</span>
                </CardText>

            </div>
            <div className='flex flex-wrap gap-2'>
                {
                    genres?.map(genre => (<CardText key={genre?.mal_id}><span>{genre?.name}</span></CardText>))
                }
            </div>
        </div>
    </Link>
  )
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
  return (
        <div className='grid grid-cols-[minmax(80px,300px)_minmax(80px,300px)] xs:grid-cols-1 gap-4'>
            <div className='flex flex-col gap-4 justify-start items-center'>

                <div>

                    <Button props={{ onClick: () => getRandomAnime() }}>
                        Random anime
                    </Button>
                </div>
                {
                    anime &&
                   <CardRamdomData {...anime} type='anime' />
                }
            </div>
            <div className='flex flex-col gap-4 justify-start items-center'>
                <div>
                    <Button props={{ onClick: () => getRandomManga() }}>
                        Random manga
                    </Button>
                </div>
                {
                    manga &&
                 <CardRamdomData {...manga} type='manga' />
                }
            </div>
        </div>
  )
}

export default RamdomData
