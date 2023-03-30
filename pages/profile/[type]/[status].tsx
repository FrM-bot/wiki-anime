import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { URLs } from 'services/endpoints'
import Link from 'next/link'
import LayoutProfile, { useAuth } from 'Layouts/LayoutProfile'
import { StatusMyList } from '@/components/AddToMyList'
import { AnimeStatus } from 'pages/api/my_list/anime/[status]'
import { MangaList } from 'pages/api/my_list/manga/[status]'
import { AnimeContext } from 'context/Anime.provider'

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

const GET_MANGA_LIST = async ({ token, status }: { token: string, status: string }) => {
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

function Profile() {
  const { query, push } = useRouter()
  const { data } = useAuth({})
  const { animes } = useContext(AnimeContext)
  const [mangaList, setMangaList] = useState<MangaList[]>([])

  const { type, status } = query as unknown as { type: MainParamsType, status: AnimeStatus }

  useEffect(() => {
    type === 'manga' && GET_MANGA_LIST({ token: data?.accessToken ?? '', status: status?.toString() ?? '' })
      .then(response => {
        setMangaList(response.data)
      })
      .catch(console.error)
  }, [data?.accessToken, status, type])
  const handlerChangeSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    push(`/profile/${type}/${e.target.value}`)
  }

  console.log({ animes }, animes[status as AnimeStatus], StatusMyList, type, status, StatusMyListAvilebles[status as AnimeStatus], 'least', Object.values(animes).forEach(console.log))
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
              <article style={{ borderColor: colorStatus[status] }} className={`flex gap-2 border-l-2 pl-1 hover:bg-secondary duration-300 rounded`}>
                <picture>
                  <img width={100} src={imageUrl} alt={title} />
                </picture>
                <div>
                  <h2>{title}</h2>
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
          type === 'manga' && mangaList?.map(({ title, status, volumes, chapters, imageUrl, listId, malId, score }) => (
            <Link href={`/${type}/${malId}`} key={listId}>
              <article  style={{ borderColor: colorStatus[status] }} className='flex gap-2 border-l-2 pl-1 hover:bg-secondary duration-300 rounded'>
                <picture>
                  <img width={100} src={imageUrl} alt={title} />
                </picture>
                <div>
                  <h2>{title}</h2>
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
