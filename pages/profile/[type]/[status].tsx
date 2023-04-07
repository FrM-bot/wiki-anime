import { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { URLs } from 'services/endpoints'
import Link from 'next/link'
import LayoutProfile, { useAuth } from 'Layouts/LayoutProfile'
import { StatusMyList } from '@/components/AddToMyList'
import { AnimeStatus } from 'pages/api/my_list/anime/get/[status]'
import { MangaList, MangaStatus } from 'pages/api/my_list/manga/get/[status]'
import { MainDataContext } from 'context/MainData.provider'

export type MainParamsType = 'anime' | 'manga'

export enum StatusMyListAvilebles {
  'plan_to_watch' = 'plan_to_watch',
  'watching' = 'watching',
  'on_hold' = 'on_hold',
  'dropped' = 'dropped',
  'completed' = 'completed'
}

const colorStatus = {
  plan_to_watch: '#a1a1aa',
  plan_to_read: '#a1a1aa',
  reading: '#2dd4bf',
  watching: '#2dd4bf',
  on_hold: '#818cf8',
  dropped: '#f87171',
  completed: '#2563eb'
}

export const GET_ANIME_LIST = async ({ token, status }: { token?: string | null, status: string }) => {
  try {
    const response = await fetch(URLs.anime.getByStatus(status), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error(error)
    return {
      error: error.message
    }
  }
}

export const GET_MANGA_LIST = async ({ token, status }: { token?: string | null, status: string }) => {
  try {
    const response = await fetch(URLs.manga.getByStatus(status), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    console.error(error)
    return {
      error: error.message
    }
  }
}

// export const CardText = ({ children, maxLines }: { children: ReactElement | string, maxLines?: number }) => {
//   return (
//         <div className={`bg-secondary/50 rounded-md border-tertiary border-[2px] px-4 py-2 [display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:${maxLines || 1}]`}>
//             {children}
//         </div>
//   )
// }

import { ClassAttributes, createElement, InputHTMLAttributes, type ReactNode, type ElementType } from 'react'

function CardText ({ type, maxLines, children }: { type: ElementType, maxLines?: number, children: ReactNode[] | ReactNode }) {
  return createElement(type, { className: `[display:-webkit-box] [overflow:hidden] [-webkit-box-orient:vertical] [-webkit-line-clamp:${maxLines || 1}]` }, children)
}


function Profile() {
  const { query, push } = useRouter()
  const { animes, mangas } = useContext(MainDataContext)

  const { type, status } = query as unknown as { type: MainParamsType, status: AnimeStatus }

  const handlerChangeSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    push(`/profile/${type}/${e.target.value}`)
  }

  return (
    <LayoutProfile>
      <section className='my-2 flex flex-col gap-4'>
        <div className='bg-secondary w-fit rounded-full w-70 p-2 flex mx-auto gap-4 shadow-lg'>
          <select className='bg-primary appearance-none px-6 py-1 rounded-full outline-none text-center' onChange={handlerChangeSelectStatus}>
            {
              StatusMyList[type as MainParamsType]?.map(({ name, value }) => (
                <option key={value} value={value} selected={status === value}>{name}</option>
              ))
            }
          </select>
        </div>
        {
          type === 'anime' && animes[status as AnimeStatus]?.map(({ status, progress, imageUrl, malId, title, score, listId }) => (
            <Link href={`/${type}/${malId}`} key={listId}>
              <article style={{ borderColor: colorStatus[status] }} className={`grid grid-cols-[80px_1fr] gap-2 border-l-2 pl-1 hover:bg-secondary duration-300 rounded`}>
                <picture>
                  <img className='h-full object-cover min-h-[70px]' width={100} src={imageUrl} alt={title} />
                </picture>
                <div className='text-xl'>
                  <CardText maxLines={2} type='h2'>{title}</CardText>
                  <span>{status}</span>
                  <div className='flex flex-col'>
                    <span>{progress}</span>
                    <span>{score}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        }
        {
          type === 'manga' && mangas[status as MangaStatus]?.map(({ title, status, volumes, chapters, imageUrl, listId, malId, score }) => (
            <Link href={`/${type}/${malId}`} key={listId}>
              <article  style={{ borderColor: colorStatus[status] }} className='grid grid-cols-[80px_1fr] gap-2 border-l-2 pl-1 hover:bg-secondary duration-300 rounded'>
                <picture>
                  <img className='h-full object-cover min-h-[70px]' width={100} src={imageUrl} alt={title} />
                </picture>
                <div className='text-lg'>
                  <CardText maxLines={2} type='h2'>{title}</CardText>
                  <span>{status}</span>
                  <div className='flex flex-col'>
                    <span>{chapters}</span>
                    <span>{volumes}</span>
                    <span>{score}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))
        }
      </section>
    </LayoutProfile>
  )
}

export default Profile
