import { URL_CHARACTERS_TOP } from './endpoints'

export const GET_CHARACTERS_TOP = async ({ querys }: { querys: { page?: number, limit?: number }}) => {
  try {
    const response = await fetch(URL_CHARACTERS_TOP({ querys }))
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
