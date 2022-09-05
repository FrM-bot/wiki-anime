import { IResponse } from 'interfaces/Global'
import { URL_SEASON_UPCOMING } from './endpoints'

export const GET_ANIME_UPCOMING = async ({ page }: { page?: number }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_SEASON_UPCOMING(page))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
