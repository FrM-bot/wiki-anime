import Link from 'components/Link'
import ImageComponent from 'components/Image'
import SectionInfo from 'components/SectionInfo'
import { SubtitleCard } from 'components/Text'
import ValidateAndRender from 'components/ValidateAndRender'
import { IProducer } from 'interfaces/Producers'
import LayoutDetails from 'Layouts/LayoutDetails'
import { setDateFormat } from 'utils/useDateFormat'

interface IResponse {
  producer: IProducer
}

const ProducerPage = ({ producer }: IResponse) => {
  return (
    <LayoutDetails>
        <>
          <div className='flex flex-col gap-4'>
            <ImageComponent src={producer?.images?.jpg?.image_url} alt={producer?.images?.jpg?.image_url} />
            <SectionInfo title='Titles'>
              <>
                {
                  producer?.titles?.map(title => <ValidateAndRender key={title?.type} title={title?.type} data={title?.title} />)
                }
              </>
            </SectionInfo>
            <SectionInfo title='Information'>
              <>
                <ValidateAndRender title='Favorites' data={producer?.favorites} />
                <ValidateAndRender title='Established' dataToValidate={[producer?.established]} data={setDateFormat({ date: producer?.established })} />
              </>
            </SectionInfo>
            <SectionInfo title='External'>
              <>
                {
                  producer?.external?.map(({ name, url }) => (
                    <Link key={url} href={url}>{name}</Link>
                  ))
                }
              </>
            </SectionInfo>
          </div>
          <div className='flex flex-col gap-4'>
            <SubtitleCard>
              <h3>About</h3>
            </SubtitleCard>
            <p>
              {producer?.about || 'N/A'}
            </p>
          </div>
        </>
    </LayoutDetails>
  )
}

interface IResponseFetch {
  data: IProducer
}
export const getServerSideProps = async (context: any) => {
  const { producerID } = context.query
  try {
    const response = await fetch(`https://api.jikan.moe/v4/producers/${producerID}/full`)
    const producer: IResponseFetch = await response?.json()
    if (!producer?.data) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        producer: producer?.data
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default ProducerPage
