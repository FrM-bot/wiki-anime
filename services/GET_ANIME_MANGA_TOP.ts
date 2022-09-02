import { URL_TOP_ANIME_MANGA } from './endpoints'
import { IResponse } from 'interfaces/Global'

export const GET_ANIME_MANGA_TOP = async ({ page = 1, type, filterType }: { page?: number, type: 'anime' | 'manga', filterType?: string | null }): Promise<IResponse> => {
  try {
    // const newFilter = filterType || type
    // console.log({ newFilter })
    const response = await fetch(URL_TOP_ANIME_MANGA({ page, type, filterType }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
