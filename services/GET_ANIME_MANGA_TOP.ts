import { URL_TOP_ANIME_MANGA } from './endpoints'
import { IResponse } from 'interfaces/Anime'

export const GET_ANIME_MANGA_TOP = async ({ page = 1, type }: { page?: number, type: string }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_TOP_ANIME_MANGA({ page, type }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
