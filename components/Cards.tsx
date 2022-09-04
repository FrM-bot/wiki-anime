import React, { ReactElement } from 'react'
import Card from './Card'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'

interface IProps {
    mal_id: number
    image_url: string
    title: string
    score: number
    type: string
    genres: {
        mal_id: number
        name: string
    }[]
    episodes: number
    volumes: number
}

export const CardMedium = ({ mal_id, image_url, title, score, type, genres, episodes, volumes }: IProps) => {
  const router = useRouter()

  return (
        <Card key={mal_id} className='inline-block m-2 hover:shadow duration-300'>
            <div className='flex flex-col'>
                <ButtonLink href={`/${router.query.type}/${mal_id}`}>
                    <div className='rounded-lg grid place-content-center overflow-hidden relative'>
                        {score &&
                            <div className='absolute top-2 right-2 bg-tertiary/50 rounded-lg p-2'>
                                <span className='text-sm'>{score}</span>
                            </div>
                        }
                        <img loading='lazy' className='hover:scale-110 duration-300 w-full' src={image_url} alt={title} />
                    </div>
                </ButtonLink>
                <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                    <ButtonLink href={`/${router.query.type}/${mal_id}`}>
                        <>
                            {title}
                        </>
                    </ButtonLink>
                    <div className='mt-4'>
                        <span className='bg-primary shadow-xl shadow-black/30 rounded bordeer-[1px] border-secondary px-4 py-2 my-4'>{type} {episodes || volumes}</span>
                    </div>
                    <div className='flex flex-wrap gap-2 my-2 h-fit'>
                        {
                            genres.map(genere => (<span className='bg-primary shadow-xl shadow-black/30 rounded bordeer-[1px] border-secondary px-4 py-2' key={genere.mal_id}>{genere.name}</span>))
                        }
                    </div>
                </div>
            </div>
        </Card>
  )
}

export const CardText = ({ children, maxLines }: { children: ReactElement, maxLines?: number }) => {
  return (
        <div className={`bg-secondary rounded p-1 [display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:${maxLines || 1}]`}>
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
        <div className='flex justify-center'>
            <div>

            <ButtonLink href={href}>
                <div className='flex flex-col gap-2 h-full'>
                    <div className='max-h-62'>
                        <img loading='lazy' className='w-full' src={imageSrc} alt={title} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <CardText maxLines={3}>
                            <h4>
                                {title}
                            </h4>
                        </CardText>
                        <CardText>
                            <span>{subtitle}</span>
                        </CardText>
                    </div>
                </div>
            </ButtonLink>
            </div>
        </div>
  )
}
