import { ReactElement } from 'react'
import Card from './Card'
import Link from './Link'
import NextLink from 'next/link'
import { SubtitleCard } from './Text'

interface IProps {
    mal_id: number
    image_url: string
    title: string
    score: number
    type: string
    mainType: 'anime' | 'manga'
    genres: {
        mal_id: number
        name: string
    }[]
    episodes: number
    volumes: number
}

export const CardMedium = ({ mainType, image_url, title, score, type, genres, episodes, volumes, mal_id }: IProps) => {
  return (
        <Card className='w-fit mx-auto'>
            <div className='flex flex-col'>
                <div className='rounded grid place-content-center overflow-hidden relative'>
                    {score &&
                        <div className='absolute top-2 right-2 bg-tertiary/50 rounded-lg p-1'>
                            <span className='text-xs'>{score}</span>
                        </div>
                    }
                    <NextLink href={`/${mainType}/${mal_id}`}>
                        <img loading='lazy' className='hover:scale-110 duration-300 w-full' src={image_url} alt={title} />
                    </NextLink>
                </div>
                <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                    <NextLink href={`/${mainType}/${mal_id}`}>
                        <SubtitleCard>
                            <span>
                                {title}
                            </span>
                        </SubtitleCard>
                    </NextLink>
                    <div className='mt-4'>
                        <span className='bg-primary shadow-xl rounded-md bordeer-[1px] border-secondary px-2 py-1 my-4'>{type} {episodes || volumes}</span>
                    </div>
                    <div className='flex flex-wrap gap-2 my-2 h-fit'>
                        {
                            genres?.map(genere => (<NextLink className='bg-primary shadow-lg rounded-md bordeer-[1px] border-secondary px-2 py-1 text-sm hover:shadow-none duration-300' href={`/${mainType}/genres/${genere.mal_id}`} key={genere?.mal_id}>{genere?.name}</NextLink>))
                        }
                    </div>
                </div>
            </div>
        </Card>
  )
}

export const CardText = ({ children, maxLines }: { children: ReactElement | string, maxLines?: number }) => {
  return (
        <div className={`bg-secondary/50 rounded-md border-tertiary border-[2px] px-4 py-2 [display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:${maxLines || 1}]`}>
            {children}
        </div>
  )
}
interface ICardLink {
    href: string
    imageSrc: string
    title: string
    subtitle: string
}
export const CardLink = ({ href, imageSrc, title, subtitle }: ICardLink) => {
  return (
                <Link className='mx-auto' href={href}>
                    <div className='flex flex-col gap-2 h-full'>
                        {/* <div > */}
                            <img loading='lazy' className='w-full' src={imageSrc} alt={title} />
                        {/* </div> */}
                        <div className='flex flex-col gap-1'>
                            <CardText maxLines={3}>
                                <h4 className='[line-break:anywhere]'>
                                    {title}
                                </h4>
                            </CardText>
                            <CardText>
                                <span>{subtitle}</span>
                            </CardText>
                        </div>
                    </div>
                </Link>
  )
}
