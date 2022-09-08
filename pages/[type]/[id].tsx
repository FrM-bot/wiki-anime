import { Button, ButtonLink, LinkExternal } from 'components/Button'
// import Card from 'components/Card'
import { IAnimeManga } from 'interfaces/Global'
// import { IAnimeManga } from 'interfaces/Global'
// import Layout from 'Layouts/Layout'
import { GET_DETAILS } from 'services/GET_DETAILS'
// import { useFetch } from 'utils/useFetch'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CardLink } from 'components/Cards'
import { SubtitleCard, TitleAndDescription } from 'components/Text'
import ImageComponent from 'components/Image'
// import { GET_CHARACTERS } from 'services/GET_CHARACTERS'
import ValidateAndRender from 'components/ValidateAndRender'
import SectionInfo from 'components/SectionInfo'
import { useFetch } from 'utils/useFetch'
import { URL_CHARACTERS } from 'services/endpoints'
import LayoutDetails from 'Layouts/LayoutDetails'
import type { GetServerSideProps } from 'next'
// import LoadingComponent from 'components/LoadingComponent'
// import { type } from 'os'
// import { setFormat } from 'utils/useDateFormat'

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

// interface IResponseDetails {
//   data: { data: IAnimeManga }
//   isLoading: boolean
//   isError: any
// }

const Details = ({ details, type }: IProps) => {
  const router = useRouter()
  const { data: characters }: IResponseCharacters = useFetch(URL_CHARACTERS(type, details?.mal_id))
  const [isShowAllCharacters, setIsShowAllCharacters] = useState(false)
  const handlerShowAllCharacters = () => {
    setIsShowAllCharacters(prevValue => !prevValue)
  }
  return (
    <LayoutDetails h1={details?.title} h2={details?.title_english}>
      <>
        {/* Left part */}
        <div className='flex flex-col gap-4'>
          <ImageComponent src={details?.images?.webp?.large_image_url} alt={details?.title} />
          <SectionInfo title='Alternative Titles'>
            <>
              <ValidateAndRender title='Synonyms' dataToValidate={[details?.title_synonyms?.length]}>
                <>{details?.title_synonyms?.map((synonym) => (<span className='bg-tertiary p-2 shadow-lg' key={synonym}>{synonym}</span>))}</>
              </ValidateAndRender>

              <ValidateAndRender title='Japanese' data={details?.title_japanese} />

              <ValidateAndRender title='English' data={details?.title_english} />
            </>
          </SectionInfo>
          <SectionInfo title='Information'>
            <>
              <TitleAndDescription title='Type'><ButtonLink href={`/${router.query.type}/top/${details?.type?.toLowerCase().replace(' ', '')}`}>{details?.type}</ButtonLink></TitleAndDescription>
              <ValidateAndRender title='Episodes' data={details?.episodes} />
              <ValidateAndRender title='Duration' data={details?.duration} />
              <ValidateAndRender title='Status' data={details?.status} />
              <ValidateAndRender title='Aired' data={details?.aired?.string} />
              <ValidateAndRender title='Published' data={details?.published?.string} />
              <ValidateAndRender title='Season' dataToValidate={[details?.season, details?.year]}>
                <ButtonLink href={`/anime/season/${details?.season}/${details?.year}`}>{`${details?.season} ${details?.year}`}</ButtonLink>
              </ValidateAndRender>
              <ValidateAndRender title='Genres' dataToValidate={[details?.genres?.length]}>
                <>{details?.genres?.map((genre) => (<ButtonLink href={`/${genre?.type?.toLowerCase()}/genres/${genre?.mal_id}`} key={genre?.mal_id}>{genre?.name}</ButtonLink>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Source' data={details?.source} />
              <ValidateAndRender title='Broadcast' data={details?.broadcast?.string} />
              <ValidateAndRender title='Rating' data={details?.rating} />
              <ValidateAndRender title='Themes' dataToValidate={[details?.themes?.length]}>
                <>{details?.themes?.map((theme) => (<ButtonLink href={`/${theme?.type?.toLowerCase()}/genres/${theme?.mal_id}`} key={theme?.mal_id}>{theme?.name}</ButtonLink>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Authors' dataToValidate={[details?.authors]}>
                <>{details?.authors?.map((author) => (<ButtonLink href={`/${author?.type?.toLowerCase()}/${author?.mal_id}`} key={author?.mal_id}>{author?.name}</ButtonLink>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Studios' dataToValidate={[details?.studios?.length]}>
                <>{details?.studios?.map((studio) => (<ButtonLink href={`/${studio?.type?.toLowerCase()}/producer/${studio?.mal_id}`} key={studio?.mal_id}>{studio?.name}</ButtonLink>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Demographics' dataToValidate={[details?.demographics?.length]}>
                <>{details?.demographics?.map((demographic) => (<ButtonLink href={`/${demographic?.type.toLowerCase()}/genres/${demographic?.mal_id}`} key={demographic?.mal_id}>{demographic?.name}</ButtonLink>))}</>
              </ValidateAndRender>
              <ValidateAndRender title='Licensors' dataToValidate={[details?.licensors?.length]}>
                <>{details?.licensors?.map((licensor) => (<ButtonLink href={`/${licensor?.type?.toLowerCase()}/producer/${licensor?.mal_id}`} key={licensor?.mal_id}>{licensor?.name}</ButtonLink>))}</>
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
                <>{details?.external?.map((link) => (<LinkExternal href={link?.url} key={link?.name}>{link?.name || link?.url}</LinkExternal>))}</>
              </ValidateAndRender>

              <TitleAndDescription title='TMO'>
                <LinkExternal href={`https://lectortmo.com/library?_pg=1&title=${details?.title}`}>{details?.title}</LinkExternal>
              </TitleAndDescription>
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
            <SubtitleCard>
              <div className='flex justify-between items-center'>
                <h3>Characters</h3>
                <Button props={{ onClick: () => handlerShowAllCharacters() }}><> {isShowAllCharacters ? 'Show less' : `All characters(${characters?.data?.length})`}</></Button>
              </div>
            </SubtitleCard>

            <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 my-4'>
              {
                characters?.data?.slice(0, isShowAllCharacters ? characters?.data?.length : 10)?.map(({ character, role }: ICharacter) => (
                  <CardLink key={character.mal_id} href={`/character/${character?.mal_id}`} imageSrc={character.images.webp.image_url} title={character.name} subtitle={role} />
                ))
              }
            </div>
            <ValidateAndRender dataToValidate={[details?.relations?.length]}>
              <SectionInfo title='Related'>
                <>
                  {
                    details?.relations?.map((relation) => (
                      <TitleAndDescription title={relation?.relation} key={relation?.relation}>
                        <>
                          {
                            relation?.entry.map(({ mal_id, name, type }: any) => (<ButtonLink href={`/${type}/${mal_id}`} key={mal_id}>{name}</ButtonLink>))
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
              <iframe loading='lazy' className='aspect-video w-full' src={details?.trailer?.embed_url} allowFullScreen />
            </SectionInfo>
          </ValidateAndRender>
        </div>
      </>
    </LayoutDetails >
  )
}

export const validateTypeAnimeManga = (str: string | string[] | undefined): 'anime' | 'manga' => {
  if (typeof str === 'string') {
    if (str === 'anime') {
      return str
    }
    if (str === 'manga') {
      return str
    }
  }
  return 'anime'
}

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
  try {
    const { type, id } = query
    const details = await GET_DETAILS({ id: Number(id) ?? 9, type: validateTypeAnimeManga(type) })
    // console.log({type}, query)
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
