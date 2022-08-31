import { URL_DETAILS } from './endpoints'
import { IResponse } from 'interfaces/Anime'

export const GET_DETAILS = async ({ id, type }: { id: number, type: string }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_DETAILS({ id, type }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
