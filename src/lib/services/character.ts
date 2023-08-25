import type { MainContent } from '$lib/types'
import type { CharactersResponse, Images } from '$lib/types/character'
import { URLs } from './urls'

export const getCharacters = async ({ type, id }: { type: MainContent; id: number }) => {
  try {
    const response = await fetch(URLs.character.getAll({ type, id }))
    if (!response.ok) {
      throw Error('Request failed')
    }
    const data: CharactersResponse = await response.json()
    return data.data
  } catch (error: unknown) {
    console.log(error)
  }
}

export const getCharacterPictures = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(URLs.character.getPictures({ id }))
    if (!response.ok) {
      throw Error('Request failed')
    }
    const data = await response.json()
    return data.data as Images[]
  } catch (error: unknown) {
    console.log(error)
  }
}
