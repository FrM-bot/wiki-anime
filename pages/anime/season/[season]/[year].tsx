// import { Button } from 'components/Button'
import { Button } from 'components/Button'
import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
import { IAnime } from 'interfaces/Anime'
import { IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useFetch } from 'utils/useFetch'

interface IProps {
  seasonAnimes: IAnime[]
  pagination: IPagination
  season: string
  year: number
}

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

const Season = ({ seasonAnimes, pagination, season, year }: IProps) => {
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
    <Layout>
      <>
        <div className='flex flex-col gap-4 mb-4'>
          <Card className='flex items-center gap-6 w-fit'>
            <>
            <div>

              <select ref={refYear} name="year" defaultValue={year} className='focus:outline-none rounded-tl-md rounded-bl-md bg-secondary p-2'>
                {
                  allSeasons?.data?.map(season => (<option key={season?.year} value={season?.year}>{season?.year}</option>))
                }

              </select>
              <select ref={refSeason} name="season" defaultValue={season} className='focus:outline-none rounded-tr-md rounded-br-md bg-secondary p-2'>
                {
                  seasons?.map(seasonValue => (<option key={seasonValue} value={seasonValue}>{seasonValue}</option>))
                }

              </select>
                </div>
              <Button props={{ onClick: () => handlerAplyFilters() }}>Go</Button>
            </>
          </Card>
          <Card className='w-fit'>
            <>
              Season {season} {year}
            </>
          </Card>
        </div>
        <RenderCards type='anime' sizeCard='small' data={seasonAnimes} pagination={pagination} />
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const { season, year, page } = query
    const response = await fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page || 1}`)
    const seasonAnimes = await response.json()
    if (!seasonAnimes?.data) {
      return {
        notFound: true
      }
    }
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    return {
      props: {
        seasonAnimes: seasonAnimes?.data,
        pagination: seasonAnimes?.pagination,
        season,
        year
      }
    }
  } catch (error: Error | any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Season
