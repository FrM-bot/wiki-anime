import { URL_DETAILS } from './endpoints'
import { IResponse } from 'interfaces/Global'

export const GET_DETAILS = async ({ id, type }: { id: number, type: 'anime' | 'manga' }): Promise<IResponse | undefined> => {
  try {
    const responseDetails = await fetch(URL_DETAILS({ id, type }))
    const deatils = await responseDetails.json()
    return deatils
  } catch (error: Error | any) {
    console.log(error)
  }
}
