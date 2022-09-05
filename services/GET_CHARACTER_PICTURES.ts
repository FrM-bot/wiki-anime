import { URL_CHARACTER_PICTURES } from './endpoints'

export const GET_CHARACTER_PICTURES = async (id: number) => {
  try {
    const response = await fetch(URL_CHARACTER_PICTURES(id))
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
