import { URL_TOP_ANIME_MANGA } from './endpoints'
import { IResponse, ITopAnimeQuery, ITopMangaQuery } from 'interfaces/Global'

export const GET_ANIME_MANGA_TOP = async ({ type, querys }: { type: 'anime' | 'manga', querys: ITopAnimeQuery & ITopMangaQuery}): Promise<IResponse | undefined> => {
  try {
    // const newFilter = filterType || type
    // console.log({ newFilter })
    const response = await fetch(URL_TOP_ANIME_MANGA({ type, querys }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
  }
}
