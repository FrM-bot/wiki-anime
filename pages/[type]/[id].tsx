import Button from 'components/Button'
import Link from 'components/Link'
// import Card from 'components/Card'
import { IAnimeManga } from 'interfaces/Global'
import { GET_DETAILS } from 'services/GET_DETAILS'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CardLink } from 'components/Cards'
import { TitleAndDescription } from 'components/Text'
import ImageComponent from 'components/Image'
import ValidateAndRender from 'components/ValidateAndRender'
import SectionInfo from 'components/SectionInfo'
import { useFetch } from 'utils/useFetch'
import { URL_CHARACTERS } from 'services/endpoints'
import LayoutDetails from 'Layouts/LayoutDetails'
import type { GetServerSideProps } from 'next'
import LoadingComponent from 'components/LoadingComponent'
import { validateTypeAnimeManga } from 'utils/validators'
import { EpisodesAnime } from '../../components/EpisodesAnime'
import Grid from '@/components/Grid'
import AddToMyList from '@/components/AddToMyList'
import { MainParamsType } from 'pages/profile/[type]/[status]'

interface ICharacter {
  character: {
    mal_id: number,
    url: string,
    images: {
      jpg: {
        image_url: string,
        small_image_url: string
      },
      webp: {
        image_url: string,
        small_image_url: string
      }
    },
    name: string
  },
  role: string
}
interface IResponseCharacters {
  data: { data: ICharacter[] }
  isLoading: boolean
  isError: any
}

interface IProps {
  details: IAnimeManga
  characters: ICharacter[]
  type: string
}

export interface IEpisode {
  mal_id: number,
  title: string,
  episode: string,
  url: string,
  images: {
    jpg: {
      image_url: string
    }
  }
}

const Details = ({ details, type }: IProps) => {
  const router = useRouter()
  const [showEpisodes, setShowEpisodes] = useState(false)
  const { data: characters, isError, isLoading }: IResponseCharacters = useFetch(URL_CHARACTERS(type, details?.mal_id))

  const [isShowAllCharacters, setIsShowAllCharacters] = useState(false)
  const handlerShowAllCharacters = () => {
    setIsShowAllCharacters(prevValue => !prevValue)
  }
  const handlerShowEpisodes = () => {
    setShowEpisodes(true)
  }
  console.log(details)
  return (
    <LayoutDetails h1={details?.title} h2={details?.title_english}>
      <>
        {/* Left part */}
        <div className='flex flex-col gap-4'>
          <ImageComponent src={details?.images?.webp?.large_image_url} alt={details?.title} />
          <SectionInfo title='Alternative Titles'>
            <>
              <ValidateAndRender title='Synonyms' dataToValidate={[details?.title_synonyms?.length]}>
                <>{details?.title_synonyms?.map((synonym) => (<span className='bg-tertiary rounded-md p-2 shadow-lg' key={synonym}>{synonym}</span>))}</>
              </ValidateAndRender>

              <ValidateAndRender title='Japanese' data={details?.title_japanese} />

              <ValidateAndRender title='English' data={details?.title_english} />
            </>
          </SectionInfo>
          <SectionInfo title='Information'>
            <>
              <TitleAndDescription title='Type'><Link variant='button' href={`/${router.query.type}/top/${details?.type?.toLowerCase().replace(' ', '')}`}>{details?.type}</Link></TitleAndDescription>
              <ValidateAndRender title='Episodes' data={details?.episodes} />
              <ValidateAndRender title='Duration' data={details?.duration} />
              <ValidateAndRender title='Status' data={details?.status} />
              <ValidateAndRender title='Aired' data={details?.aired?.string} />
              <ValidateAndRender title='Published' data={details?.published?.string} />
              <ValidateAndRender title='Season' dataToValidate={[details?.season, details?.year]}>
                <Link variant='button' href={`/anime/season/${details?.season}/${details?.year}`}>{`${details?.season} ${details?.year}`}</Link>
              </ValidateAndRender>
              <ValidateAndRender title='Genres' dataToValidate={[details?.genres?.length]}>
                <>{details?.genres?.map((genre) => (<Link variant='button' href={`/${genre?.type?.toLowerCase()}/genres/${genre?.mal_id}`} key={genre?.mal_id}>{genre?.name}</Link>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Source' data={details?.source} />
              <ValidateAndRender title='Broadcast' data={details?.broadcast?.string} />
              <ValidateAndRender title='Rating' data={details?.rating} />
              <ValidateAndRender title='Themes' dataToValidate={[details?.themes?.length]}>
                <>{details?.themes?.map((theme) => (<Link variant='button' href={`/${theme?.type?.toLowerCase()}/genres/${theme?.mal_id}`} key={theme?.mal_id}>{theme?.name}</Link>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Authors' dataToValidate={[details?.authors]}>
                <>{details?.authors?.map((author) => (<Link variant='button' href={`/${author?.type?.toLowerCase()}/${author?.mal_id}`} key={author?.mal_id}>{author?.name}</Link>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Studios' dataToValidate={[details?.studios?.length]}>
                <>{details?.studios?.map((studio) => (<Link variant='button' href={`/${studio?.type?.toLowerCase()}/producer/${studio?.mal_id}`} key={studio?.mal_id}>{studio?.name}</Link>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Demographics' dataToValidate={[details?.demographics?.length]}>
                <>{details?.demographics?.map((demographic) => (<Link variant='button' href={`/${demographic?.type.toLowerCase()}/genres/${demographic?.mal_id}`} key={demographic?.mal_id}>{demographic?.name}</Link>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Licensors' dataToValidate={[details?.licensors?.length]}>
                <>{details?.licensors?.map((licensor) => (<Link variant='button' href={`/${licensor?.type?.toLowerCase()}/producer/${licensor?.mal_id}`} key={licensor?.mal_id}>{licensor?.name}</Link>))}</>
              </ValidateAndRender>
            </>
          </SectionInfo>
          <SectionInfo title='Statistics'>
            <>
              <ValidateAndRender title='Rank' data={details?.rank} />
              <ValidateAndRender title='Score' data={details?.score} />
              <ValidateAndRender title='Scored by' data={details?.scored_by} />
              <ValidateAndRender title='Popularity' data={details?.popularity} />
              <ValidateAndRender title='Members' data={details?.members} />
              <ValidateAndRender title='Favorites' data={details?.favorites} />
            </>
          </SectionInfo>
          <SectionInfo title='External Links'>
            <>
              <ValidateAndRender dataToValidate={[details?.external]}>
                <>{details?.external?.map((link) => (<Link type='external' props={{ target: '_blank' }} href={link?.url} key={link?.name}>{link?.name || link?.url}</Link>))}</>
              </ValidateAndRender>

              <TitleAndDescription title='TMO'>
                <Link type='external' props={{ target: '_blank' }} href={`https://lectortmo.com/library?_pg=1&title=${details?.title}`}>{details?.title}</Link>
              </TitleAndDescription>
              <Link type='external' props={{ target: '_blank' }} href={details?.url}>MyAnimeList</Link>
            </>
          </SectionInfo>
        </div>
        {/* Right part */}
        <div className='flex flex-col gap-6'>
          <ValidateAndRender dataToValidate={[details?.synopsis]}>
            <SectionInfo title='Synopsis'>
              <p className=''>{details?.synopsis}</p>
            </SectionInfo>
          </ValidateAndRender>
          <ValidateAndRender dataToValidate={[details?.background]}>
            <SectionInfo title='Background'>
              <p>{details?.background}</p>
            </SectionInfo>
          </ValidateAndRender>
          <div>
            <div className='flex justify-between items-center '>
              <h3>Characters</h3>
              <Button props={{ onClick: () => handlerShowAllCharacters() }}><> {isShowAllCharacters ? 'Show less' : `All characters(${characters?.data?.length || '0'})`}</></Button>
            </div>

            <LoadingComponent isError={isError} isLoading={isLoading}>
              <Grid>
                <>
                  {
                    characters?.data?.slice(0, isShowAllCharacters ? characters?.data?.length : 10)?.map(({ character, role }: ICharacter) => (
                      <CardLink key={character.mal_id} href={`/character/${character?.mal_id}`} imageSrc={character.images.webp.image_url} title={character.name} subtitle={role} />
                    ))
                  }
                </>
              </Grid>
            </LoadingComponent>
            <ValidateAndRender dataToValidate={[details?.relations?.length]}>
              <SectionInfo title='Related'>
                <>
                  {
                    details?.relations?.map((relation) => (
                      <TitleAndDescription title={relation?.relation} key={relation?.relation}>
                        <>
                          {
                            relation?.entry.map(({ mal_id, name, type }: any) => (<Link variant='button' href={`/${type}/${mal_id}`} key={mal_id}>{name}</Link>))
                          }
                        </>
                      </TitleAndDescription>
                    ))
                  }
                </>
              </SectionInfo>
            </ValidateAndRender>
          </div>
          <ValidateAndRender dataToValidate={[details?.trailer?.embed_url]}>
            <SectionInfo title='Trailer'>
              <iframe loading='lazy' title="trailer" className='aspect-video w-full' src={details?.trailer?.embed_url} allowFullScreen />
            </SectionInfo>
          </ValidateAndRender>
          {
            type === 'anime' &&
            < SectionInfo title='Episodes'>
              {
                showEpisodes
                  ? <EpisodesAnime mal_id={details?.mal_id} />
                  : <div className='grid place-content-center'><Button props={{ onClick: () => handlerShowEpisodes() }}>Get episodes</Button></div>
              }
            </SectionInfo>
          }
        </div>
        <AddToMyList type={type as MainParamsType} malId={details.mal_id} imageUrl={details.images.webp.image_url} title={details.title} maxProgress={details?.episodes} maxVolumes={details?.volumes} maxChapters={details?.chapters} />
      </>
    </LayoutDetails >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const { type, id } = query
    const details = await GET_DETAILS({ id: Number(id) ?? 9, type: validateTypeAnimeManga(type) })
    if (!details?.data) {
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
        details: details?.data,
        type
      }
    }
  } catch (error: Error | any) {
    console.error(error)
    return { props: { errors: error?.message } }
  }
}

export default Details
