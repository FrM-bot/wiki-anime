import { Button } from 'components/Button'
import { CardText } from 'components/Cards'
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

interface IGenre {
    mal_id: number,
    name: string,
    url: string,
    count: number
  }

interface IProps {
    mangaGenres?: { data: IGenre[] }
    animeGenres?: { data: IGenre[] }
  }

const subTypesAnime = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
const subTypesManga = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua']
const orderBy = ['members', 'favorites', 'score', 'rank', 'popularity', 'title']

const NavFilters = ({ mangaGenres, animeGenres }: IProps) => {
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
    <form ref={refForm} onSubmit={handlerApplyFilters} className='flex items-center flex-wrap gap-4 my-4'>
          <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Type</span>
              </CardText>
            <select name='type' defaultValue='anime' className='bg-secondary outline-none p-2 text-center rounded' onChange={handlerTypeSearch}>
              <option value="anime">anime</option>
              <option value="manga">manga</option>
            </select>
            </label>
            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Genre</span>
              </CardText>
            <select name="genre" id="genres" className='bg-secondary outline-none p-2 text-center rounded'>
              <option value="">All</option>
              {
                genresToRender[selectedType]?.data?.map(genre => (<option key={genre?.mal_id} value={genre?.mal_id}>{genre?.name}</option>))
              }
            </select>
            </label>
            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Sub type</span>
              </CardText>
            <select name="subType" id="subType" className='bg-secondary outline-none p-2 text-center rounded'>
              {
                subTypesToRender?.map(subType => <option key={subType} value={subType}>{subType}</option>)
              }
            </select>
            </label>

            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Order by</span>
              </CardText>
            <select name="order_by" id="order_by" defaultValue='score' className='bg-secondary outline-none p-2 text-center rounded'>
              {
                orderBy?.map(subType => <option key={subType} value={subType}>{subType}</option>)
              }
            </select>
            </label>

            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Sort</span>
              </CardText>
            <select name="sort" id="sort" defaultValue='score' className='bg-secondary outline-none p-2 text-center rounded'>
              <option value='asc'>Ascendant</option>
              <option value='desc'>Descendant</option>
            </select>
            </label>

            <label className='flex flex-col gap-2' htmlFor='max_score'>
              <CardText>
                <span>Max score</span>
              </CardText>
              <input name='max_score' type="number" step='0.1' min={0} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
            </label>
            <label className='flex flex-col gap-2' htmlFor='min_score'>
              <CardText>
                <span>Min score</span>
              </CardText>
              <input name='min_score' type="number" step='0.1' max={10} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
            </label>
            <label className='flex flex-col gap-2' htmlFor='min_score'>
              <CardText>
                <span>Letter</span>
              </CardText>
              <input name='letter' type="text" className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80' />
            </label>
            <div className='flex w-full justify-center'>
              <Button props={{ type: 'submit' }}>Apply filters</Button>
            </div>
          </form>
  )
}

export default NavFilters