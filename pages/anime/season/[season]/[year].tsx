// import { Button } from 'components/Button'
import Card from 'components/Card'
import RenderCards from 'components/RenderCards'
import SeasonSearch from 'components/SeasonSearch'
import { IAnime } from 'interfaces/Anime'
import { IPagination } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import type { GetServerSideProps } from 'next'

interface IProps {
  seasonAnimes: IAnime[]
  pagination: IPagination
  season: string
  year: number
}

const Season = ({ seasonAnimes, pagination, season, year }: IProps) => {
  return (
    <Layout title={`Season ${season} of ${year}`}>
      <>
        <div className='flex flex-col gap-4 mb-4'>
          <SeasonSearch season={season} year={year} />
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
