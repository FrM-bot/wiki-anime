import Layout from 'Layouts/Layout'
import { GET_DETAILS } from 'services/GET_DETAILS'

interface IDetails {
    approved: boolean
    //     authors: [{…}]
    background: string
    //     chapters: 19
    //     demographics: [{…}]
    //     explicit_genres: []
    //     external: (2) [{…}, {…}]
    //     favorites: 34
    //     genres: (3) [{…}, {…}, {…}]
    images: {
        webp: {
            image_url: string
            large_image_url: string
            small_image_url: string
        }
        mal_id: number
        //     members: 2163
        //     popularity: 6980
        //     published: {from: '2008-07-01T00:00:00+00:00', to: '2010-01-01T00:00:00+00:00', prop: {…}, string: 'Jul 2008 to Jan 2010'}
        //     publishing: false
        //     rank: 6637
        //     relations: []
        score: number
        //     scored: 7.1
        //     scored_by: 451
        //     serializations: [{…}]
        status: string
        //     synopsis: "Milton, who lives in downtown Chicago, is a hardcore otaku. He admires Japan for producing his favorite manga. Gill spent his time in prison, and now he is a comic shop owner with an attitude in the town. Morimoto, a young yakuza called \"Rockstar,\" is a rising star of the yakuza world in Japan. He is addicted to American TV dramas. One day, Milton wins a chance to go to his dreamland Japan."
        //     themes: [{…}]
        title: string
        //     title_english: "Peepo Choo"
        //     title_japanese: "PEEPO CHOO ピポチュー"
        //     title_synonyms: (2) ['Pee Po Choo', 'Peepochoo']
        //     titles: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
        //     type: "Manga"
        //     url: string
        //     volumes: number
    }
}

interface IProps {
    details: IDetails
}

const Details = ({ details }: IProps) => {
  console.log({ details })
  return (
        <Layout>
            <>
                <img src={details.images.webp.large_image_url} />
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
