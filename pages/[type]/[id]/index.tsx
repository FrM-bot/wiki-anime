import { ButtonLink, LinkExternal } from 'components/Button'
import Card from 'components/Card'
import { IAnimeManga } from 'interfaces/Global'
// import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_DETAILS } from 'services/GET_DETAILS'
import { useFetch } from 'utils/useFetch'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

interface IProps {
  details: IAnimeManga | any
}

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

const ExtraInfo = ({ title, description, children }: { title: string, description?: string, children?: ReactElement }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <h3 className='text-center bg-secondary grid place-content-center p-2'>{title}</h3>
      {description && <h4 className='bg-tertiary p-2 shadow-lg'>{description}</h4>}
      {children}
    </div>
  )
}

const Details = ({ details }: IProps) => {
  const router = useRouter()
  const { data: characters, isError, isLoading } = useFetch(`https://api.jikan.moe/v4/${router.query.type}/${details.mal_id}/characters`)

  console.log(characters?.data)

  console.log({ details, isError, isLoading })
  return (
    <Layout>
      <>
        <div className='flex flex-wrap gap-2 mb-4'>
          <Card className='w-fit'>
            <h1 className='text-xl'>{details.title}</h1>
          </Card>
          {details?.title_english &&
            <Card className='w-fit grid place-content-center'>
              <h2 className='text-md'>{details.title_english}</h2>
            </Card>
          }
        </div>
        <div className='grid lg:grid-cols-[minmax(100px,400px)_1fr] gap-4'>
          <div className='flex flex-col gap-4'>
            <div className='rounded-md overflow-hidden shadow-xl shadow-black/50 hover:shadow duration-300 min-h-[10rem] p-2'>
              <img className='rounded w-full' src={details.images.webp.large_image_url} />
            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='p-2 border-b-[2px] border-b-secondary'>Alternative Titles</h3>

              {details?.title_synonyms?.length > 0 &&
                <ExtraInfo title='Synonyms'>
                  {
                    details?.title_synonyms.map((synonym: string) => (<span className='bg-tertiary p-2 shadow-lg' key={synonym}>{synonym}</span>))
                  }
                </ExtraInfo>
              }
              {details?.title_japanese && <ExtraInfo title='Japanese' description={details?.title_japanese} />}
              {details?.title_english && <ExtraInfo title='English' description={details?.title_english} />}

            </div>
            <div className='flex flex-col gap-2'>
              <h3 className='p-2 border-b-[2px] border-b-secondary'>Information</h3>
              <ExtraInfo title='Type'><ButtonLink href={`/${router.query.type}/top/${details?.type.toLowerCase().replace(' ', '')}`}>{details?.type}</ButtonLink></ExtraInfo>
              {details?.episodes && <ExtraInfo title='Episodes' description={details?.episodes} />}
              {details?.duration && <ExtraInfo title='Duration' description={details?.duration} />}

              <ExtraInfo title='Status' description={details?.status} />
              {details?.aired && <ExtraInfo title='Aired' description={details?.aired?.string} />}

              {details?.published && <ExtraInfo title='Published' description={details?.published?.string} />}

              {details?.season &&
                <ExtraInfo title='Season'>
                  <ButtonLink href={`/anime/season/${details?.season}/${details?.year}`}>{`${details?.season} ${details?.year}`}</ButtonLink>
                </ExtraInfo>
              }
              {details?.genres?.length > 0 &&
                <ExtraInfo title='Genres'>
                  {
                    details?.genres.map((genre: any) => (<ButtonLink href={`/${genre?.type.toLowerCase()}/genres/${genre?.mal_id}`} key={genre.mal_id}>{genre.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }

              {details?.source && <ExtraInfo title='Source' description={details?.source} />}

              {details?.broadcast?.string && <ExtraInfo title='Broadcast' description={details?.broadcast?.string} />}

              {details?.rating && <ExtraInfo title='Rating' description={details?.rating} />}
              {details?.themes?.length > 0 &&
                <ExtraInfo title='Themes'>
                  {
                    details?.themes?.map((theme: any) => (<ButtonLink href={`/${theme?.type.toLowerCase()}/genres/${theme?.mal_id}`} key={theme.mal_id}>{theme.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }
              {
                details?.authors &&
                <ExtraInfo title='Authors'>
                  {
                    details?.authors?.map((author: any) => (<ButtonLink href={`/${author?.type.toLowerCase()}/${author?.mal_id}`} key={author.mal_id}>{author.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }
              {details?.studios &&
                <ExtraInfo title='Studios'>
                  {
                    details?.studios?.map((studio: any) => (<ButtonLink href={`/${studio?.type.toLowerCase()}/producer/${studio?.mal_id}`} key={studio.mal_id}>{studio.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }
              {
                details?.demographics &&
                <ExtraInfo title='Demographics'>
                  {
                    details?.demographics?.map((demographic: any) => (<ButtonLink href={`/${demographic?.type.toLowerCase()}/genres/${demographic?.mal_id}`} key={demographic.mal_id}>{demographic.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }
              {
                details?.licensors &&
                <ExtraInfo title='Licensors'>
                  {
                    details?.licensors?.map((licensor: any) => (<ButtonLink href={`/${licensor?.type.toLowerCase()}/producer/${licensor?.mal_id}`} key={licensor.mal_id}>{licensor.name}</ButtonLink>))
                  }
                </ExtraInfo>
              }
            </div>
            <div className='flex flex-col gap-2'>
            <h3 className='p-2 border-b-[2px] border-b-secondary'>Statistics</h3>
              <ExtraInfo title='Rank' description={details?.rank} />
              <ExtraInfo title='Score' description={details?.score} />
              <ExtraInfo title='Scored by' description={details?.scored_by} />
              <ExtraInfo title='Popularity' description={details?.popularity} />
              <ExtraInfo title='Members' description={details?.members} />
              <ExtraInfo title='Favorites' description={details?.favorites} />
            </div>
            <div className='flex flex-col gap-2'>
            <h3 className='p-2 border-b-[2px] border-b-secondary'>External Links</h3>
              {
                details?.external &&
                details?.external?.map((link: any) => (
                  <LinkExternal href={link?.url} key={link?.name}>
                  {link?.name}
                  </LinkExternal>
                ))
              }
              <ExtraInfo title='TMO'>
                <LinkExternal href={`https://lectortmo.com/library?_pg=1&title=${details?.title}`}>{details?.title}</LinkExternal>
              </ExtraInfo>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div>
              <h3>Synopsis</h3>
              <p className=''>{details.synopsis}</p>
            </div>
            <div>
              <h4>Background</h4>
              <p>{details.background}</p>
            </div>
            <div>
              <div className='flex justify-between items-center my-4'>
                <h4 className='bg-tertiary p-2 shadow-lg'>Characters</h4>
                <ButtonLink href={`/${router?.query?.type}/${details?.mal_id}/characters`}>More characters</ButtonLink>
              </div>
              <div className='flex gap-2 flex-wrap'>
                {
                  characters?.data?.slice(0, 10)?.map(({ character, role }: ICharacter) => (
                    <div key={character.mal_id} className='flex flex-col gap-2 w-28'>
                      <ButtonLink href={`/character/${character?.mal_id}`}>
                        <img src={character.images.webp.image_url} alt={character.name} className='w-32' />
                      </ButtonLink>
                      <div className='flex gap-2 flex-col'>
                        <ButtonLink href={`/character/${character?.mal_id}`} className='w-full whitespace-normal'>{character.name}</ButtonLink>
                        <span className='bg-tertiary p-2 shadow-lg text-center'>{role}</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='p-2 border-b-[2px] border-b-secondary'>Related</h3>
                {
                  details?.relations?.map((relation: any) => (
                    <ExtraInfo title={relation?.relation} key={relation?.relation}>
                      {
                        relation?.entry.map(({ mal_id, name, type }: any) => (<ButtonLink href={`/${type}/${mal_id}`} key={mal_id}>{name}</ButtonLink>))
                      }
                    </ExtraInfo>
                  ))
                }
              </div>
            </div>
            {
              details?.trailer &&
              <div>
                <h4>Trailer:</h4>
                <iframe loading='lazy' className='aspect-video w-full' src={details.trailer.embed_url} frameBorder="0" allowFullScreen></iframe>
              </div>
            }
          </div>

        </div>
      </>
    </Layout>
  )
}

export const getServerSideProps = async (context: { query: { type: string; id: number } }) => {
  //   console.log(params)
  const { type, id } = context.query
  try {
    const details = await GET_DETAILS({ id, type })
    return {
      props: {
        details: details.data
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default Details
