import { URLs } from '$lib/services/urls.js'
import type { CharacterDetails } from '$lib/types/character'
import { error } from '@sveltejs/kit'
import type { PageLoadEvent } from './$types'
import type { PeopleDetails } from '$lib/types/people'

export const load = async ({ params, fetch }: PageLoadEvent) => {
  const id = Number(params.id)
  const responsePeopleDetails = await fetch(URLs.people.details({ id }))
  if (!responsePeopleDetails.ok) {
    throw error(404, 'Error')
  }

  const peopleDetails: PeopleDetails = await responsePeopleDetails.json()

  return {
    person: peopleDetails?.data
  }
}
