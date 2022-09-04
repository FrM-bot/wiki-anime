import { URL_SEARCH } from './endpoints'
import { IResponse } from 'interfaces/Global'

export const SERACH = async ({ type, querys }: { type: 'anime' | 'manga', querys: any }): Promise<IResponse> => {
  try {
    const response = await fetch(URL_SEARCH({ type, querys }))
    const responseJSON = await response.json()
    return responseJSON
  } catch (error: Error | any) {
    console.log(error)
    throw new Error(error)
  }
}
