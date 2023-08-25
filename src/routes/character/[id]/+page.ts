import { URLs } from '$lib/services/urls.js'
import type { CharacterDetails } from '$lib/types/character'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'

export const load = async ({ params, fetch }: PageLoadEvent) => {
  const id = Number(params.id)
  const responseCharacterDetails = await fetch(URLs.character.details({ id }))
  if (!responseCharacterDetails.ok) {
    throw error(404, 'Error')
  }

  const characterDetails = await responseCharacterDetails.json()

  return {
    character: characterDetails?.data as CharacterDetails
  }
}
