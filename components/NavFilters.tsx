import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Button from './Button'
import { CardText } from './Cards'
import { fromObjectToStringQuery } from 'utils/fromObjectToStringQuery'
import { validateTypeAnime, validateTypeManga } from '../utils/validators'

interface IGenre {
  mal_id: number,
  name: string,
  url: string,
  count: number
}

type TypeSubTyapeAnime = 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music'

type TypeSubTyapeManga = 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua'

interface IProps {
  mangaGenres?: IGenre[]
  animeGenres?: IGenre[]
  defaultType?: 'anime' | 'manga'
  defaultGenre?: string
  defaultMinScore?: number
  defaultMaxScore?: number
  defaultSubType?: TypeSubTyapeAnime | TypeSubTyapeManga
  defaultLetter?: string
  defaultOrderBy?: string
  defaultSort?: string
}

const subTypesAnime = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
const subTypesManga = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua']
const orderBy = ['members', 'favorites', 'score', 'rank', 'popularity', 'title']

const NavFilters = ({ animeGenres, mangaGenres, defaultType, defaultGenre, defaultMinScore, defaultMaxScore, defaultSubType, defaultLetter, defaultOrderBy, defaultSort }: IProps) => {
  const refForm = useRef<HTMLFormElement | null>(null)
  const [selectedType, setSelectedType] = useState<'anime' | 'manga'>(defaultType ?? 'manga')
  const [genresToRender] = useState({ anime: animeGenres, manga: mangaGenres })
  const [subTypesToRender, setSubTypesToRender] = useState(subTypesAnime)
  const [defaultSubTypeState, setDefaultSubTypeState] = useState(defaultSubType)
  const router = useRouter()

  useEffect(() => {
    setSelectedType(defaultType ?? 'anime')
    if (defaultType === 'manga') {
      setSubTypesToRender(subTypesManga)
    }
    if (defaultType === 'anime') {
      setSubTypesToRender(subTypesAnime)
    }
  }, [defaultSubType, defaultType])

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
    const form = refForm.current
    if (!form) return
    const data = Object.fromEntries(new FormData(form))
    const { type, ...rest } = data
    router.push({
      pathname: `/${type}/filter`,
      search: fromObjectToStringQuery(rest)
    })
  }

  const handlerSubTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const defaultSubType = selectedType === 'anime' ? validateTypeAnime(e?.target?.value) : validateTypeManga(e?.target?.value)
    setDefaultSubTypeState(defaultSubType)
  }

  return (
    <form ref={refForm} onSubmit={handlerApplyFilters} className='flex items-center flex-wrap gap-4 my-4'>
      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Type</span>
        </CardText>
        <select name='type' id='type' defaultValue={defaultType} className='bg-secondary outline-none p-2 text-center rounded' onChange={handlerTypeSearch}>
          <option value="anime">anime</option>
          <option value="manga">manga</option>
        </select>
      </label>
      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Genres</span>
        </CardText>
        <select name="genres" id="genres" defaultValue={defaultGenre} className='bg-secondary outline-none p-2 text-center rounded'>
          <option value="">All</option>
          {
            genresToRender[selectedType]?.map(genre => (<option key={genre?.mal_id} value={genre?.mal_id}>{genre?.name}</option>))
          }
        </select>
      </label>
      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Sub type</span>
        </CardText>
        <select onChange={handlerSubTypeChange} name="subType" id="subType" value={defaultSubTypeState} className='bg-secondary outline-none p-2 text-center rounded'>
        <option value="">All</option>
          {
            subTypesToRender?.map(subType => <option key={subType} value={subType}>{subType}</option>)
          }
        </select>
      </label>

      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Order by</span>
        </CardText>
        <select name="order_by" id="order_by" defaultValue={defaultOrderBy} className='bg-secondary outline-none p-2 text-center rounded'>
          {
            orderBy?.map(subType => <option key={subType} value={subType}>{subType}</option>)
          }
        </select>
      </label>

      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Sort</span>
        </CardText>
        <select name="sort" id="sort" defaultValue={defaultSort} className='bg-secondary outline-none p-2 text-center rounded'>
          <option value='asc'>Ascendant</option>
          <option value='desc'>Descendant</option>
        </select>
      </label>

      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Max score</span>
        </CardText>
        <input name='max_score' placeholder='10' type="number" defaultValue={defaultMaxScore || undefined} step='0.1' min={0} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
      </label>
      <label className='flex flex-col gap-2' htmlFor='min_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Min score</span>
        </CardText>
        <input name='min_score' placeholder='7.5' defaultValue={defaultMinScore || undefined} type="number" step='0.1' max={10} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
      </label>
      <label className='flex flex-col gap-2' htmlFor='min_score'>
        <CardText>
          <span className='px-2 grid place-content-center'>Letter</span>
        </CardText>
        <input defaultValue={defaultLetter || ''} name='letter' placeholder='Berserk, Shingeki...' type="text" className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80' />
      </label>
      <div className='flex w-full justify-center'>
        <Button props={{ type: 'submit' }}>Apply filters</Button>
      </div>
    </form>
  )
}

export default NavFilters
