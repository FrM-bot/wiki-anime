import { URL_CHARACTERS } from './endpoints'

export const GET_CHARACTERS = async (type: string, id: number) => {
  try {
    const response = await fetch(URL_CHARACTERS(type, id))
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
