import { IResponse } from 'interfaces/Global'

export const GET_ANIME_SEASON_NOW = async ({ page = 1 }: { page?: number }): Promise<IResponse> => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${page}`)
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
