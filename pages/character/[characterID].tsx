import { CardLink } from 'components/Cards'
import Loader from 'components/Loader'
import { useModal } from 'components/Modal'
import { ICharacter } from 'interfaces/Character'
import { useState, Suspense, lazy } from 'react'
import { GET_CHARACTER } from 'services/GET_CHARACTER'
import ValidateAndRender from 'components/ValidateAndRender'
import { useFetch } from 'utils/useFetch'
import SectionInfo from 'components/SectionInfo'
import { URL_CHARACTER_PICTURES } from 'services/endpoints'
import LayoutDetails from 'Layouts/LayoutDetails'
interface IPicture {
  jpg: {
    image_url: string
  }
}

interface IProps {
  data: ICharacter
  characterPictures: IPicture[]
}

interface IResponsePictures {
  data: IPicture[]
}

const ImageComponent = lazy(() => import('components/Image'))

const Character = ({ data }: IProps) => {
  const { Modal, handlerShowModal } = useModal()
  const { data: characterPictures }: { data: IResponsePictures } = useFetch(URL_CHARACTER_PICTURES(data?.mal_id))
  const [imageToShow, setimageToShow] = useState({ src: '', alt: '' })

  const showModalImage = ({ src, alt }: { src: string, alt: string }) => {
    setimageToShow({ src, alt })
    handlerShowModal()
  }
  return (
    <LayoutDetails h1={data?.name} h2={data?.name_kanji}>
      <>
          {/* Left Section */}
          <div className='flex flex-col gap-4'>
            <ImageComponent src={data?.images?.webp?.image_url} alt={data?.name} props={{ onClick: () => showModalImage({ alt: data?.name, src: data?.images?.webp?.image_url }) }} />
            <ValidateAndRender dataToValidate={[data?.nicknames?.length]}>
              <SectionInfo title='Nicknames'>
                <div className='flex gap-1 flex-wrap'>
                  {
                    data?.nicknames?.map(name => (<span className='bg-tertiary p-2 shadow-lg' key={name}>{name}</span>))
                  }
                </div>
              </SectionInfo>
            </ValidateAndRender>
            <ValidateAndRender dataToValidate={[data?.manga?.length]}>
              <SectionInfo title='Manga'>
                <div className='grid grid-cols-2 gap-2'>
                  {
                    data?.manga?.map(({ manga, role }) => (
                      <CardLink key={manga.mal_id} href={`/manga/${manga?.mal_id}`} imageSrc={manga?.images?.webp?.image_url} title={manga?.title} subtitle={role} />
                    ))
                  }
                </div>
              </SectionInfo>
            </ValidateAndRender>
            <ValidateAndRender dataToValidate={[data?.anime?.length]}>
              <SectionInfo title='Anime'>
                <div className='grid grid-cols-2 gap-2'>

                  {
                    data?.anime?.map(({ anime, role }) => (
                      <CardLink key={anime.mal_id} href={`/anime/${anime?.mal_id}`} imageSrc={anime.images.webp.image_url} title={anime.title} subtitle={role} />
                    ))
                  }
                </div>
              </SectionInfo>
            </ValidateAndRender>
          </div>
          {/* Right section */}
          <div className='flex flex-col gap-4'>
            <ValidateAndRender dataToValidate={[data?.about]}>
              <SectionInfo title='About'>
                <p>{data?.about}</p>
              </SectionInfo>
            </ValidateAndRender>
            <ValidateAndRender dataToValidate={[characterPictures?.data?.length]}>
              <SectionInfo title='Pictures'>
                <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
                  {characterPictures?.data?.map(({ jpg }) => (
                    <Suspense fallback={<Loader />} key={jpg?.image_url}>
                      <ImageComponent src={jpg?.image_url} alt={data?.name} props={{ onClick: () => showModalImage({ src: jpg?.image_url, alt: data?.name }) }} />
                    </Suspense>
                  ))}
                </div>
              </SectionInfo>
            </ValidateAndRender>
            <ValidateAndRender dataToValidate={[data?.voices?.length]}>
              <SectionInfo title='Voice Actors'>
                <div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-2'>
                  {
                    data?.voices?.map(({ person, language }) =>
                      (<CardLink key={person.mal_id} href={`/people/${person.mal_id}`} imageSrc={person.images.jpg.image_url} title={person.name} subtitle={language} />))
                  }
                </div>
              </SectionInfo>
            </ValidateAndRender>
          </div>
          <Modal>
            <ImageComponent src={imageToShow?.src} alt={imageToShow?.alt} />
          </Modal>
      </>
    </LayoutDetails>
  )
}
interface IResponse {
  data: ICharacter
}
export const getServerSideProps = async (context: any) => {
  const characterID = context.query.characterID
  try {
    const character: IResponse = await GET_CHARACTER(characterID)
    // const characterPictures: IResponsePictures = await GET_CHARACTER_PICTURES(characterID)
    if (!character?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        data: character?.data
      }
    }
  } catch (error) {
    console.error(error)
  }
}
export default Character
