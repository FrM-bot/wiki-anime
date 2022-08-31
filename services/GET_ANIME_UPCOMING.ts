import { IResponse } from 'interfaces/Anime'

export const GET_ANIME_UPCOMING = async ({ page = 1 }: { page?: number }): Promise<IResponse> => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/seasons/upcoming?page=${page}`)
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
