import { Button } from 'components/Button'
import { CardLink, CardText } from 'components/Cards'
import ImageComponent from 'components/Image'
import SectionInfo from 'components/SectionInfo'
import { SubtitleCard } from 'components/Text'
import ValidateAndRender from 'components/ValidateAndRender'
import { IPeople } from 'interfaces/People'
import LayoutDetails from 'Layouts/LayoutDetails'
import { useState } from 'react'
import { setFormat } from 'utils/useDateFormat'
interface IProps {
  people: IPeople
}
const People = ({ people }: IProps) => {
  const [isShowAllCharacters, setIsShowAllCharacters] = useState(false)
  const handlerShowAllCharacters = () => {
    setIsShowAllCharacters(prevValue => !prevValue)
  }
  return (
    <LayoutDetails h1={people?.name} h2={people?.given_name}>
      <>
        <div className='flex flex-col gap-4'>
          <ImageComponent src={people?.images?.jpg?.image_url} alt={people?.name} />
          <ValidateAndRender dataToValidate={[people?.alternate_names?.length]}>
            <SectionInfo title='Alternate names'>
              <div className='flex gap-1 flex-wrap'>
                {
                  people?.alternate_names?.map(name => <CardText key={name}><span>{name}</span></CardText>)
                }
              </div>
            </SectionInfo>
          </ValidateAndRender>
          <ValidateAndRender title='Name' data={people?.name} />
          <ValidateAndRender title='Family name' data={people?.family_name} />
          <ValidateAndRender title='Given name' data={people?.given_name} />
          <ValidateAndRender title='Birthday' dataToValidate={[people?.birthday?.length]} data={setFormat(people?.birthday)} />
          <SectionInfo title='Anime'>
            <div className='grid grid-cols-2 gap-2'>

              {
                people?.anime?.map(({ anime, position }) => (
                  <CardLink key={anime.mal_id} href={`/anime/${anime?.mal_id}`} imageSrc={anime.images.webp.image_url} title={anime.title} subtitle={position} />
                ))
              }
            </div>
          </SectionInfo>
          <SectionInfo title='Manga'>
            <div className='grid grid-cols-2 gap-2'>

              {
                people?.manga?.map(({ manga, position }) => (
                  <CardLink key={manga.mal_id} href={`/manga/${manga?.mal_id}`} imageSrc={manga.images.webp.image_url} title={manga.title} subtitle={position} />
                ))
              }
            </div>
          </SectionInfo>
        </div>

        <div className='flex flex-col gap-2'>
          <SectionInfo title='About'>
            <p>{people?.about}</p>
          </SectionInfo>
          <ValidateAndRender dataToValidate={[people?.voices?.length]}>
            <>

              <SubtitleCard>
                <div className='flex justify-between items-center'>
                  <h3>Voice Acting Roles</h3>
                  <Button props={{ onClick: () => handlerShowAllCharacters() }}><> {isShowAllCharacters ? 'Show less' : `All animes(${people?.voices?.length})`}</></Button>
                </div>
              </SubtitleCard>

              <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {
                  people?.voices?.slice(0, isShowAllCharacters ? people?.voices?.length : 10)?.map(({ anime, role }) => (
                    <CardLink key={anime?.mal_id} href={`/anime/${anime?.mal_id}`} imageSrc={anime.images.webp.image_url} title={anime?.title} subtitle={role} />
                  ))
                }
              </div>
            </>
          </ValidateAndRender>
        </div>
      </>
    </LayoutDetails>
  )
}

interface IResponseFetch {
  data: IPeople
}
export const getServerSideProps = async (context: any) => {
  const { peopleID } = context.query
  try {
    const response = await fetch(`https://api.jikan.moe/v4/people/${peopleID}/full`)
    const people: IResponseFetch = await response?.json()
    if (!people?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        people: people?.data
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default People
