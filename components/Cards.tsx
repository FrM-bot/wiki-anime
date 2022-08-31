import React from 'react'
import Card from './Card'
import { ButtonLink } from './Button'
import { useRouter } from 'next/router'

interface IProps { mal_id: number, image_url: string, title: string, score: number, type: string, genres: { mal_id: number, name: string }[], episodes: number, volumes: number }
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
                        <img className='hover:scale-110 duration-300 w-full' src={image_url} alt={title} />
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
