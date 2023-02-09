import { ReactElement } from 'react'
import Card from './Card'
import Link from './Link'
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
        <div>

            <Link type='Card' href={`/${router?.query?.type}/${mal_id}`}>
                <div className='flex flex-col'>
                    <div className='rounded grid place-content-center overflow-hidden relative'>
                        {score &&
                            <div className='absolute top-2 right-2 bg-tertiary/50 rounded-lg p-1'>
                                <span className='text-xs'>{score}</span>
                            </div>
                        }
                        <img loading='lazy' className='hover:scale-110 duration-300 w-full' src={image_url} alt={title} />
                    </div>
                    <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                        <Card>
                            <span>
                                {title}
                            </span>
                        </Card>
                        <div className='mt-4'>
                            <span className='bg-primary shadow-xl shadow-black/30 rounded bordeer-[1px] border-secondary px-2 py-1 my-4'>{type} {episodes || volumes}</span>
                        </div>
                        <div className='flex flex-wrap gap-2 my-2 h-fit'>
                            {
                                genres?.map(genere => (<span className='bg-primary shadow-xl shadow-black/30 rounded bordeer-[1px] border-secondary px-2 py-1 text-sm' key={genere?.mal_id}>{genere?.name}</span>))
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </div>
  )
}

export const CardText = ({ children, maxLines }: { children: ReactElement | string, maxLines?: number }) => {
  return (
        <div className={`bg-secondary/50 border-tertiary border-[2px] p-1 [display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:${maxLines || 1}]`}>
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
                <Link type='Card' href={href}>
                    <div className='flex flex-col gap-2 h-full'>
                        <div className='max-h-62'>
                            <img loading='lazy' className='w-full' src={imageSrc} alt={title} />
                        </div>
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
            </div>
        </div>
  )
}
