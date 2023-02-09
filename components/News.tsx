import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import { setDateFormat } from 'utils/useDateFormat'
import Card from './Card'
import { CardText } from './Cards'

interface INews {
    author_url: string
    author_username: string
    comments: number
    date: string
    excerpt: string
    forum_url: string
    images: {

        jpg: {
            image_url: string
        }
    }
    mal_id: number
    title: string
    url: string
}
interface IResponseNews {
    data: INews[]
}

const GET_ANIME_NEWS = async ({ id }: { id: number }): Promise<IResponseNews | any> => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`)
    const responseJSON: IResponseNews = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}

const News = ({ id }: { id: number }) => {
  const [animeNews, setanimeNews] = useState<INews[]>()
  useEffect(() => {
    GET_ANIME_NEWS({ id }).then((res) => setanimeNews(res?.data)).catch(console.error)
  }, [id])
  return (
        <div>
            <Card className='my-4'>
                <h2 className=''>Anime & Manga News</h2>
            </Card>
            <div className='flex gap-2 flex-wrap'>

            {
                animeNews?.map(anime => (
                    <Link type='External' href={anime.url} key={anime.mal_id} className="flex items-start gap-4">
                        <>
                        <div>
                            <img className='min-w-[80px]' src={anime.images.jpg.image_url} alt="" />
                        </div>
                        <div>
                            <div>
                                <CardText>{anime.title}</CardText>
                            </div>
                            <p>
                                {anime.excerpt} <a href={anime.url} target="blank">Readm mode.</a>
                            </p>
                            <p>{setDateFormat({ date: anime.date })}</p>
                        </div>
                        </>
                    </Link>
                ))
            }
                    </div>
        </div>
  )
}

export default News
