import { ButtonLink } from 'components/Button'
import Card from 'components/Card'
import { IAnimeManga } from 'interfaces/Global'
// import { IAnimeManga } from 'interfaces/Global'
import Layout from 'Layouts/Layout'
import { GET_DETAILS } from 'services/GET_DETAILS'
import { useFetch } from 'utils/useFetch'
import { useRouter } from 'next/router'

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

const Details = ({ details }: IProps) => {
  const router = useRouter()
  const { data: characters, isError, isLoading } = useFetch(`https://api.jikan.moe/v4/${router.query.type}/${details.mal_id}/characters`)

  console.log(characters?.data)

  console.log({ details, isError, isLoading })
  return (
    <Layout>
      <>
        <div className='flex gap-2 mb-4'>
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
          <div>
            <img className='rounded-md shadow-xl shadow-black/50 w-full hover:shadow duration-300' src={details.images.webp.large_image_url} />
            <div className='my-4'>
              <div className='flex flex-col gap-2'>
                <h3 className='p-2 border-b-[2px] border-b-secondary'>Alternative Titles</h3>
                <div className='flex flex-wrap gap-2'>
                  <h3 className='text-center bg-secondary grid place-content-center p-2'>Synonyms</h3>
                  {
                    details?.title_synonyms.map((synonym: string) => (<span className='bg-tertiary p-2 shadow-lg' key={synonym}>{synonym}</span>))
                  }
                </div>
                <div className='flex flex-wrap gap-2'>
                  <h3 className='text-center bg-secondary grid place-content-center p-2'>Japanese</h3>
                  <h4 className='bg-tertiary p-2 shadow-lg'>{details?.title_japanese}</h4>
                </div>
                <div className='flex flex-wrap gap-2'>
                  <h3 className='text-center bg-secondary grid place-content-center p-2'>English</h3>
                  <h4 className='bg-tertiary p-2 shadow-lg'>{details?.title_english || 'none'}</h4>
                </div>
              </div>
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
                <ButtonLink href=''>More characters</ButtonLink>
              </div>
              <div className='flex gap-2 flex-wrap'>
                {
                  characters?.data?.slice(0, 10)?.map(({ character, role }: ICharacter) => (
                  <div key={character.mal_id} className='gap-2 w-28'>
                    <ButtonLink href=''>
                      <img src={character.images.webp.image_url} alt={character.name} className='w-32' />
                    </ButtonLink>
                    <div className='flex gap-2 flex-col'>
                      <ButtonLink href='' className='w-full whitespace-normal'>{character.name}</ButtonLink>
                      <span className='bg-tertiary p-2 shadow-lg text-center'>{role}</span>
                    </div>
                  </div>
                  ))
                }
              </div>
            </div>
            {
              details?.trailer &&
              <div>
                <h4>Trailer:</h4>
                <iframe className='aspect-video w-full' src={details.trailer.embed_url} frameBorder="0" allowFullScreen></iframe>
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
