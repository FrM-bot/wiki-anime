import { URL_SEARCH } from './endpoints'
import { IResponse } from 'interfaces/Anime'

export const SERACH = async ({ name, type, page }: { name: string, type: string, page: number }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_SEARCH({ name, type, page }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
