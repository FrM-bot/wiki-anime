import { ReactElement } from 'react'
import Card from './Card'
// import NextLink from ''
import NextLink from 'next/link'
// import { SubtitleCard } from './Text'
import { classNamesJoin } from 'lib/classNamesJoin'
// import CardDynamic from './CardDynamic'

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
                <div className='rounded overflow-hidden relative border-[3px] border-primary h-fit'>
                    {score &&
                        <div className='absolute top-0 h-fit right-2 z-10'>
                            <span className='text-lg bg-tertiary/50 p-1 rounded'>{score}</span>
                        </div>
                    }
                    <NextLink href={`/${mainType}/${mal_id}`}>
                        <picture className='overflow-hidden rounded-sm h-fit'>
                            <img loading='lazy' className='hover:scale-105 duration-300 object-cover h-[290px] w-full' height={290} src={image_url} alt={title} />
                        </picture>
                    </NextLink>
                </div>
                <div className='max-w-[225px] flex flex-col gap-2 py-2'>
                    <NextLink href={`/${mainType}/${mal_id}`}>
                        <div className='bg-primary p-1 shadow-md rounded'>
                            <span>
                                {title}
                            </span>
                        </div>
                    </NextLink>
                    <div className='mt-4'>
                        <span className='bg-primary shadow-xl rounded-md bordeer-[1px] border-secondary px-2 py-1 my-4'>{type} {episodes || volumes}</span>
                    </div>
                    <div className='flex flex-wrap gap-2 my-2 h-fit'>
                        {
                            genres?.map(genere => (<NextLink className='bg-primary text-xl shadow-lg rounded-md bordeer-[1px] border-secondary px-2 py-1 hover:shadow-none duration-300' href={`/${mainType}/genres/${genere.mal_id}`} key={genere?.mal_id}>{genere?.name}</NextLink>))
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
// className={classNamesJoin(className ?? '', 'rounded-md bg-primary shadow-lg hover:shadow-black/20 py-[0.4rem] px-[0.8rem] border-tertiary border-[2px] duration-300')}

// interface ICardLink {
//     href: string
//     imageSrc: string
//     title: string
//     subtitle: string
// }
// export const CardLink = ({ href, imageSrc, title, subtitle }: ICardLink) => {
//   return (
//                 <Link className='mx-auto' href={href}>
//                     <div className='flex flex-col gap-2 h-full'>
//                         <picture>
//                             <img loading='lazy' className='w-full' src={imageSrc} alt={title} />
//                         </picture>
//                         <div className='flex flex-col gap-1'>
//                             <CardText maxLines={3}>
//                                 <h4 className='[line-break:anywhere]'>
//                                     {title}
//                                 </h4>
//                             </CardText>
//                             <CardText>
//                                 <span>{subtitle}</span>
//                             </CardText>
//                         </div>
//                     </div>
//                 </Link>
//   )
// }
interface ICardLink {
    href: string
    imageSrc: string
    title: string
    subtitle: string
    className?: string
}

export const CardLink = ({ href, children, className }: { href: string, children: ReactElement, className?: string }) => {
  return (
          <NextLink className={classNamesJoin(className ?? '', 'rounded-md bg-primary shadow-md hover:shadow-black/30 hover:shadow-lg p-[0.4rem] border-tertiary border-[2px] duration-300')} href={href}>
              {children}
          </NextLink>
  )
}

export const CardCharacter = ({ href, imageSrc, title, subtitle, className }: ICardLink) => {
  return (
        <CardLink className='h-fit' href={href}>
            <div className='flex flex-col gap-2 h-full'>
                <picture>
                    <img loading='lazy' className='w-full' src={imageSrc} alt={title} />
                </picture>
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
        </CardLink>
  )
}
