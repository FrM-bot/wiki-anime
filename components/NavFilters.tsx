import { Button } from 'components/Button'
import { CardText } from 'components/Cards'
import { useRouter } from 'next/router'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
// import { useFetch } from 'utils/useFetch'
// import animeGenres from 'data/animeGenres.json'
// import mangaGenres from 'data/mangaGenres.json'

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
  mangaGenres?: IGenre[]
  animeGenres?: IGenre[]
  defaultType?: 'anime' | 'manga'
  defaultGenre?: string
  defaultMinScore?: number
  defaultMaxScore?: number
  defaultSubType?: string
  defaultLetter?: string
}

const subTypesAnime = ['tv', 'movie', 'ova', 'special', 'ona', 'music']
const subTypesManga = ['manga', 'novel', 'lightnovel', 'oneshot', 'doujin', 'manhwa', 'manhua']
const orderBy = ['members', 'favorites', 'score', 'rank', 'popularity', 'title']

// const getGenreAnime = async (): Promise<{ animeGenres: IGenre[] }> => {
//   try {
//     const responseAnimeGenres = await fetch('https://api.jikan.moe/v4/genres/anime')
//     const animeGenres = await responseAnimeGenres.json()
//     return {
//       animeGenres: animeGenres?.data
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       animeGenres: []
//     }
//   }
// }

// const getGenreManga = async (): Promise<{ mangaGenres: IGenre[] }> => {
//   try {
//     const responseMangaGenres = await fetch('https://api.jikan.moe/v4/genres/manga')
//     const mangaGenres = await responseMangaGenres.json()
//     return {
//       mangaGenres: mangaGenres?.data
//     }
//   } catch (error) {
//     console.log(error)
//     return {
//       mangaGenres: []
//     }
//   }
// }

const NavFilters = ({ animeGenres, mangaGenres, defaultType, defaultGenre, defaultMinScore, defaultMaxScore, defaultSubType, defaultLetter }: IProps) => {
  // const { data: mangaGenres } = useFetch('https://api.jikan.moe/v4/genres/manga')
  // const { data: animeGenres } = useFetch('https://api.jikan.moe/v4/genres/anime')
  const refForm = useRef<HTMLFormElement | null>(null)
  const [selectedType, setSelectedType] = useState<'anime' | 'manga'>(defaultType ?? 'anime')
  const [genresToRender] = useState({ anime: animeGenres, manga: mangaGenres })
  const [subTypesToRender, setSubTypesToRender] = useState(subTypesAnime)

  useEffect(() => {
    setSelectedType(defaultType ?? 'anime')
    console.log(defaultType, 'effect')
    if (defaultType === 'manga') {
      setSubTypesToRender(subTypesManga)
    }
    if (defaultType === 'anime') {
      setSubTypesToRender(subTypesAnime)
    }
    // !genresToRender.anime?.length && getGenreAnime().then(({ animeGenres }) => setGenresToRender({ ...genresToRender, anime: animeGenres }))
    // !genresToRender.manga?.length && getGenreManga().then(({ mangaGenres }) => setGenresToRender({ ...genresToRender, manga: mangaGenres }))
  }, [])

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
  console.log({ defaultType, defaultGenre, defaultMinScore, defaultSubType })
  return (
    <form ref={refForm} onSubmit={handlerApplyFilters} className='flex items-center flex-wrap gap-4 my-4'>
      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span>Type</span>
        </CardText>
        <select name='type' id='type' defaultValue={defaultType} className='bg-secondary outline-none p-2 text-center rounded' onChange={handlerTypeSearch}>
          <option value="anime">anime</option>
          <option value="manga">manga</option>
        </select>
      </label>
      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span>Genres</span>
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
          <span>Sub type</span>
        </CardText>
        <select name="subType" id="subType" defaultValue={defaultSubType} className='bg-secondary outline-none p-2 text-center rounded'>
        <option value="">All</option>
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
        <select name="sort" id="sort" defaultValue='desc' className='bg-secondary outline-none p-2 text-center rounded'>
          <option value='asc'>Ascendant</option>
          <option value='desc'>Descendant</option>
        </select>
      </label>

      <label className='flex flex-col gap-2' htmlFor='max_score'>
        <CardText>
          <span>Max score</span>
        </CardText>
        <input name='max_score' type="number" defaultValue={defaultMaxScore} step='0.1' min={0} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
      </label>
      <label className='flex flex-col gap-2' htmlFor='min_score'>
        <CardText>
          <span>Min score</span>
        </CardText>
        <input name='min_score' defaultValue={defaultMinScore} type="number" step='0.1' max={10} className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80 max-w-[6rem]' />
      </label>
      <label className='flex flex-col gap-2' htmlFor='min_score'>
        <CardText>
          <span>Letter</span>
        </CardText>
        <input defaultValue={defaultLetter || ''} name='letter' type="text" className='bg-secondary px-2 py-1 outline-none rounded-md shadow-lg shadow-secondary/80' />
      </label>
      <div className='flex w-full justify-center'>
        <Button props={{ type: 'submit' }}>Apply filters</Button>
      </div>
    </form>
  )
}

export default NavFilters
