import { IResponse } from 'interfaces/Global'
import { URL_SEASON_NOW } from './endpoints'

export const GET_ANIME_SEASON_NOW = async ({ page }: { page?: number }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_SEASON_NOW(page))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
