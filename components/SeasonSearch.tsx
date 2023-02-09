import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useFetch } from 'utils/useFetch'
import Button from 'components/Button'
import Card from './Card'

interface IResponse {
    data: {
        data:
        {
            year: number,
            seasons:
            string[]

        }[]

    }
}
const seasons = [
  'winter',
  'spring',
  'summer',
  'fall'
]

const SeasonSearch = ({ year, season }: {
    season?: string
    year?: number
}) => {
  const router = useRouter()
  const refSeason = useRef<HTMLSelectElement>(null)
  const refYear = useRef<HTMLSelectElement>(null)

  const { data: allSeasons }: IResponse = useFetch('https://api.jikan.moe/v4/seasons')

  const handlerAplyFilters = () => {
    if (refSeason.current && refYear.current) {
      router.push(`/anime/season/${refSeason.current?.value}/${refYear.current.value}`)
    }
  }
  return (
        <Card className='flex items-center gap-6 w-fit'>
            <>
                <div>

                    <select ref={refYear} name="year" defaultValue={year || new Date().getFullYear()} className='focus:outline-none rounded-tl-md rounded-bl-md bg-secondary p-2'>
                        {
                            allSeasons?.data?.map(season => (<option key={season?.year} value={season?.year}>{season?.year}</option>))
                        }

                    </select>
                    <select ref={refSeason} name="season" defaultValue={season || ''} className='focus:outline-none rounded-tr-md rounded-br-md bg-secondary p-2'>
                        {
                            seasons?.map(seasonValue => (<option key={seasonValue} value={seasonValue}>{seasonValue}</option>))
                        }

                    </select>
                </div>
                <Button props={{ onClick: () => handlerAplyFilters() }}>Go</Button>
            </>
        </Card>
  )
}

export default SeasonSearch
