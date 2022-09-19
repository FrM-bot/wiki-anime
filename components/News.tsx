import { useEffect, useState } from 'react'
import { setFormat } from 'utils/useDateFormat'
import Card from './Card'

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

const GET_ANIME_NEWS = async ({ id = 1 }: { id: number }): Promise<IResponseNews | any> => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/news`)
    const responseJSON: IResponseNews = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}

const News = () => {
  const [animeNews, setanimeNews] = useState<INews[]>()
  useEffect(() => {
    GET_ANIME_NEWS({ id: 48417 }).then((res) => setanimeNews(res?.data)).catch(console.error)
  }, [])
  return (
        <div>
            <Card className='my-4'>
                <h2 className=''>Anime & Manga News</h2>
            </Card>
            {
                animeNews?.map(anime => (
                    <div key={anime.mal_id} className="flex gap-4">
                        <div>
                            <img src={anime.images.jpg.image_url} alt="" />
                        </div>
                        <div>
                            <div>
                                <span>{anime.title}</span>
                            </div>
                            <p>
                                {anime.excerpt} <a href={anime.url} target="blank">Readm mode.</a>
                            </p>
                            <p>{setFormat(anime.date)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
  )
}

export default News
