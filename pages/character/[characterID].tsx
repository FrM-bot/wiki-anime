import Card from 'components/Card'
import { CardLink } from 'components/Cards'
import Loader from 'components/Loader'
// import { ImageComponent } from 'components/Image'
import { useModal } from 'components/Modal'
import { SubtitleCard } from 'components/Text'
import { ICharacter } from 'interfaces/Character'
import Layout from 'Layouts/Layout'
import { useState, lazy, Suspense } from 'react'
import { GET_CHARACTER } from 'services/GET_CHARACTER'
import { useFetch } from 'utils/useFetch'
// import { useState, useEffect } from 'react'

interface IProps {
  data: ICharacter
}

interface IPicture {
  jpg: {
    image_url: string
  }
}

interface IResponsePictures {
  data: IPicture[]
}

const ImageComponent = lazy(() => import('components/Image'))

const Character = ({ data }: IProps) => {
  const { Modal, handlerShowModal } = useModal()
  const { data: characterPictures, isError }: { data: IResponsePictures, isError: any, isLoading: boolean } = useFetch(`https://api.jikan.moe/v4/characters/${data.mal_id}/pictures`)
  const [imageToShow, setimageToShow] = useState({ src: '', alt: '' })

  const showModalImage = ({ src, alt }: { src: string, alt: string }) => {
    setimageToShow({ src, alt })
    handlerShowModal()
  }

  return (
    <Layout>

      <div className='grid sm:grid-cols-[minmax(80px,300px)_1fr] gap-2'>
        <div>
          <ImageComponent src={data?.images?.webp?.image_url} alt={data?.name} props={{ onClick: () => showModalImage({ alt: data?.name, src: data?.images?.webp?.image_url }) }} />

          <div className='my-4 flex flex-col gap-2'>
            <SubtitleCard><h3>Nicknames</h3></SubtitleCard>

            <div className='flex gap-1 flex-wrap'>

              {
                data?.nicknames?.map(name => (<span className='bg-tertiary p-2 shadow-lg' key={name}>{name}</span>))
              }
            </div>
          </div>
          {data?.manga?.length > 0 &&
            <div className='my-4 flex flex-col gap-2'>
              <SubtitleCard><h3>Manga</h3></SubtitleCard>
              <div className='grid grid-cols-2 gap-2'>

                {
                  data?.manga?.map(({ manga, role }) => (
                    <CardLink key={manga.mal_id} href={`/manga/${manga?.mal_id}`} imageSrc={manga.images.webp.image_url} title={manga.title} subtitle={role} />
                  ))
                }
              </div>
            </div>
          }
          {data?.anime?.length > 0 &&
            <div className='my-4 flex flex-col gap-2'>
              <SubtitleCard><h3>Anime</h3></SubtitleCard>

              <div className='grid grid-cols-2 gap-2'>

                {
                  data?.anime?.map(({ anime, role }) => (
                    <CardLink key={anime.mal_id} href={`/anime/${anime?.mal_id}`} imageSrc={anime.images.webp.image_url} title={anime.title} subtitle={role} />
                  ))
                }
              </div>
            </div>
          }
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-wrap gap-2 my-2'>
            <Card className='w-fit'>
              <h1>{data.name}</h1>
            </Card>
            <Card className='w-fit'>
              <h2>{data?.name_kanji}</h2>
            </Card>
            <p>{data.about}</p>
          </div>
          {data?.voices.length > 0 &&
            <div>
              <SubtitleCard><h3>Voice Actors</h3></SubtitleCard>
              <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2'>
                {
                  data?.voices?.map(({ person, language }) =>
                    (<CardLink key={person.mal_id} href={`/people/${person.mal_id}`} imageSrc={person.images.jpg.image_url} title={person.name} subtitle={language} />))
                }
              </div>
            </div>
          }
          { characterPictures?.data &&
            <div>
              <SubtitleCard><h3>Pictures</h3></SubtitleCard>
              <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                {characterPictures?.data?.map(({ jpg }) => (
                  <Suspense fallback={<Loader />} key={jpg?.image_url}>
                      <ImageComponent src={jpg?.image_url} alt={data?.name} props={{ onClick: () => showModalImage({ src: jpg?.image_url, alt: data?.name }) }} />
                  </Suspense>
                ))}
              </div>
            </div>
          }
          {
            isError && <div>Error</div>
          }
        </div>

          <Modal>
            <ImageComponent src={imageToShow?.src} alt={imageToShow?.alt} />
          </Modal>
      </div>
    </Layout>
  )
}
interface IResponse {
  data: ICharacter
}
export const getServerSideProps = async (context: any) => {
  console.log(context.query)
  const characterID = context.query.characterID
  try {
    const character: IResponse = await GET_CHARACTER(characterID)
    if (!character?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        data: character?.data || []
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        data: {}
      }
    }
  }
}
export default Character
