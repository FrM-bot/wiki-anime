import { useSession } from 'next-auth/react'
import { MainParamsType } from 'pages/profile/[type]/[status]'
import { FormEvent } from 'react'
import { URLs } from 'services/endpoints'
import Button from './Button'
import Card from './Card'
import { useModal } from './Modal'
export const StatusMyList = {
  anime: [{
    name: 'All',
    value: 'all'
  },
  {
    name: 'Plan to Watch',
    value: 'plan_to_watch'
  },
  {
    name: 'Watching',
    value: 'watching'
  },
  {
    name: 'On Hold',
    value: 'on_hold'
  },
  {
    name: 'Dropped',
    value: 'dropped'
  },
  {
    name: 'Completed',
    value: 'completed'
  }],
  manga: [{
    name: 'All',
    value: 'all'
  },
  {
    name: 'Plan to Read',
    value: 'plan_to_read'
  },
  {
    name: 'Reading',
    value: 'reading'
  },
  {
    name: 'On Hold',
    value: 'on_hold'
  },
  {
    name: 'Dropped',
    value: 'dropped'
  },
  {
    name: 'Completed',
    value: 'completed'
  }]
}

interface MyAnimeList {
  id: string
  imageUrl: string
  title: string
  score : number
  status: string
  progress: number
}

interface MyMangaList {
  id: string
  imageUrl: string
  title: string
  score : number
  status: string
  volumes: number
  chapters: number
}

const ADD_ANIME_TO_MY_LIST = async ({ imageUrl, score, status, title, token, malId, progress }: Omit<MyAnimeList, 'id'> & { token: string, malId: number }) => {
  try {
    const response = await fetch(URLs.anime.post, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ imageUrl, score, status, title, malId, progress })
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}

const ADD_MANGA_TO_MY_LIST = async ({ imageUrl, score, status, title, token, malId, chapters, volumes }: Omit<MyMangaList, 'id'> & { token: string, malId: number }) => {
  try {
    const response = await fetch(URLs.manga.post, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ imageUrl, score, status, title, malId, chapters, volumes })
    })
    const data = await response.json()
    return data
  } catch (error: any) {
    return {
      error: error.message
    }
  }
}

function AddToMyList ({ maxProgress, imageUrl, title, malId, type, maxVolumes, maxChapters }: { maxProgress: number, maxVolumes?: number, maxChapters?: number, type: MainParamsType } & Pick<MyAnimeList, 'imageUrl' | 'title'> & { malId: number }) {
  const { status: statusSession, data } = useSession()
  const { Modal, handlerShowModal } = useModal()
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { status, score, progress, chapters, volumes } = Object.fromEntries(new FormData(event.currentTarget))
    // console.log({ ...data })
    type === 'anime' && ADD_ANIME_TO_MY_LIST({
      malId,
      imageUrl,
      score: Number(score) ?? 1,
      title,
      progress: status === 'completed' ? maxProgress : Number(progress) ?? 0,
      status: String(status),
      token: data?.accessToken ?? ''
    }).then(console.log).catch(console.error)

    type === 'manga' && ADD_MANGA_TO_MY_LIST({
      malId,
      imageUrl,
      score: Number(score),
      title,
      chapters: status === 'completed' ? maxChapters ?? 0 : Number(chapters),
      volumes: status === 'completed' ? maxVolumes ?? 0 : Number(volumes),
      status: String(status),
      token: data?.accessToken ?? ''
    }).then(console.log).catch(console.error)
  }

  return (
    <>
      <Button className='fixed bottom-4 right-4 z-20' props={{ onClick: () => handlerShowModal() }}>+</Button>
      <Modal>
        <div className='px-2'>
          {
            statusSession === 'authenticated'
              ? <>
                <div className='flex justify-end'>
                  <Button>Remove</Button>
                </div>
                <form className='w-full mt-2' onSubmit={onSubmit}>
                  <Card className='shadow-lg flex flex-col gap-2'>
                    <>

                      <select className='bg-primary px-4 py-2 text-center' name="status">
                        {
                          StatusMyList[type]?.map(({ name, value }) => (
                            <option key={value} value={value}>{name}</option>
                          ))
                        }
                      </select>

                      <input className='bg-primary px-4 py-2 outline-none' type="number" placeholder='score' name="score" min={1} max={10} />
                      {
                        type === 'anime' &&
                        <input className='bg-primary px-4 py-2 outline-none' type="number" placeholder={`progress(max: ${maxProgress ?? 'N/A'})`} name="progress" max={maxProgress} />
                      }
                      {
                        type === 'manga' &&
                        <>
                          <input className='bg-primary px-4 py-2 outline-none' type="number" placeholder={`chapters(max: ${maxChapters ?? 'N/A'})`} name="chapters" max={maxChapters} />
                          <input className='bg-primary px-4 py-2 outline-none' type="number" placeholder={`columes(max: ${maxVolumes ?? 'N/A'})`} name="volumes" max={maxVolumes} />
                        </>
                      }
                    </>
                  </Card>
                  <Button className='w-full mt-4'>Save</Button>
                </form>
              </>
              : <div>Log</div>
          }
        </div>
      </Modal>
    </>
  )
}

export default AddToMyList
