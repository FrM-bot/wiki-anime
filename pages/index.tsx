import { Button } from 'components/Button'
import Layout from 'Layouts/Layout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SyntheticEvent, useRef, useState } from 'react'

const fromObjectToString = (object: any, baseString = '') => {
  Object.entries(object)?.forEach(([key, value], index) => {
    if (value) {
      baseString =
        index === 0
          ? baseString.concat(`?${key}=${value}`)
          : baseString.concat(`&${key}=${value}`)
    }
  })
  return baseString
}

const subTypesAnime = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
const subTypesManga = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua']

interface IGenre {
  mal_id: number,
  name: string,
  url: string,
  count: number
}

interface IProps {
  mangaGenres: { data: IGenre[] }
  animeGenres: { data: IGenre[] }
}

const Index = ({ mangaGenres, animeGenres }: IProps) => {
  const refForm = useRef<HTMLFormElement | null>(null)
  const [selectedType, setSelectedType] = useState<'anime'| 'manga'>('anime')
  const [genresToRender] = useState({ anime: animeGenres, manga: mangaGenres })
  const [subTypesToRender, setSubTypesToRender] = useState(subTypesAnime)

  const router = useRouter()
  const handlerTypeSearch = (e: any) => {
    setSelectedType(e.target.value)
    if (e.target.value === 'manga') {
      setSubTypesToRender(subTypesManga)
    }
    if (e.target.value === 'anime') {
      setSubTypesToRender(subTypesAnime)
    }
  }
  const handlerApplyFilters = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
    const form = refForm.current
    if (!form) return
    const data = Object.fromEntries(new FormData(form))
    console.log(data)
    const { type, ...rest } = data
    router.push({
      pathname: `/${type}/filter`,
      search: fromObjectToString(rest)
    })
  }
  return (
    <Layout>
      <>
        <div className='flex justify-center'>
          <div className='flex w-fit text-xl'>
            <Link href='/anime'>
              <a className='rounded-tl-2xl rounded-bl-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Anime</a>
            </Link>
            <Link href='/manga'>
              <a className='rounded-tr-2xl rounded-br-2xl bg-primary hover:shadow-xl hover:shadow-black/40 py-2 px-4 border-[#202020] border-[2px] duration-300'>Manga</a>
            </Link>

          </div>
        </div>
        <div className='w-full flex justify-center gap-6'>
          <div>
          </div>
          <form ref={refForm} onSubmit={handlerApplyFilters} className='flex flex-col gap-4'>
            <select name='type' defaultValue='anime' className='bg-secondary outline-none p-2 text-center rounded' onChange={handlerTypeSearch}>
              <option value="anime">anime</option>
              <option value="manga">manga</option>
            </select>
            <h2 className='text-center'>{selectedType} genres</h2>
            <select name="genre" id="genres" className='bg-secondary outline-none p-2 text-center rounded'>
              <option value="">All</option>
              {
                genresToRender[selectedType]?.data?.map(genre => (<option key={genre?.mal_id} value={genre?.mal_id}>{genre?.name}</option>))
              }
            </select>
            <select name="subType" id="subType" className='bg-secondary outline-none p-2 text-center rounded'>
              {
                subTypesToRender?.map(subType => <option key={subType} value={subType}>{subType}</option>)
              }
            </select>
            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <span>Max score</span>
              <input name='max_score' type="number" step='0.1' min={0} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80' />
            </label>
            <label className='flex flex-col gap-2' htmlFor='min_score'>
              <span>Min score</span>
              <input name='min_score' type="number" step='0.1' max={10} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80' />
            </label>
            <div className='flex justify-center mt-4'>
              <Button props={{ type: 'submit' }}>Apply filters</Button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [responseMangaGenres, responseAnimeGenres] = await Promise.all([fetch('https://api.jikan.moe/v4/genres/manga'), fetch('https://api.jikan.moe/v4/genres/anime')])
    const mangaGenres = await responseMangaGenres.json()
    const animeGenres = await responseAnimeGenres.json()

    return {
      props: {
        mangaGenres,
        animeGenres
      }
    }
  } catch (error: any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Index
