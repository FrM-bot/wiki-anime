import { IResponse } from 'interfaces/Global'
import { URL_SEASON_NOW } from './endpoints'

export const GET_ANIME_SEASON_NOW = async ({ page }: { page?: number }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_SEASON_NOW(page))
    const responseJSON = await response.json()
    // if (response.status === 200) {
    // }
    return responseJSON
    // console.log(response, responseJSON)
    // return {
    //   error: response.status
    // }
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
